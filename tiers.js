/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=10 !tiers $(eval tiers('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/1toMIkZvH887nOiykWeyduOYREElZMDxnN9-Gusxay2k/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/tiers.js);)
 * !editcom -ul=everyone -cd=10 !randomclass -a=!tiers random-class $(query)
 * !editcom -ul=everyone -cd=10 !randomtier -a=!tiers random-tier $(query)
 * !editcom -ul=everyone -cd=10 !compacts -a=!tiers compacts $(query)
 * !editcom -ul=everyone -cd=10 !coupes -a=!tiers coupes $(query)
 * !editcom -ul=everyone -cd=10 !muscle -a=!tiers muscle $(query)
 * !editcom -ul=everyone -cd=10 !offroad -a=!tiers off-road $(query)
 * !editcom -ul=everyone -cd=10 !openwheel -a=!tiers open-wheel $(query)
 * !editcom -ul=everyone -cd=10 !sedans -a=!tiers sedans $(query)
 * !editcom -ul=everyone -cd=10 !sports -a=!tiers sports $(query)
 * !editcom -ul=everyone -cd=10 !classics -a=!tiers sports-classics $(query)
 * !editcom -ul=everyone -cd=10 !supers -a=!tiers supers $(query)
 * !editcom -ul=everyone -cd=10 !suvs -a=!tiers suvs $(query)
 * !editcom -ul=everyone -cd=10 !utility -a=!tiers utility $(query)
 * !editcom -ul=everyone -cd=10 !vans -a=!tiers vans $(query)
 */
function tiers(provider='', query = '', data = '') {
    /* Sanitize the filter criteria specified in the query */
    query = normalize(query);
    var args = query.split(/\s+/);

    /* Parse vehicles */
    var vehicles = parse_vehicles(data);
    if (0 === vehicles.length) {
        return 'Could not parse vehicle data ¯\\_(ツ)_/¯';
    }

    /* Determine all classes and tiers */
    var all_classes_and_tiers = group_tiers_by_class(vehicles);

    /* Determine raceable classes and tiers */
    var raceable_classes_and_tiers = filter_raceable_tiers_by_class(all_classes_and_tiers);

    /* Random class */
    if (args[0] === 'random-class') {
        return truncate(random_class(args, all_classes_and_tiers, raceable_classes_and_tiers));
    }

    /* Random tier */
    if (args[0] === 'random-tier') {
        return truncate(random_tier(args, raceable_classes_and_tiers, vehicles));
    }

    /* Filter vehicles in specified class */
    var clazz = args[0];
    var vehicles_by_class = vehicles.filter(function (vehicle) {
        return clazz === normalize(vehicle._clazz);
    });
    if (0 === vehicles_by_class.length) {
        return 'Could not find class: ' + clazz + ' ¯\\_(ツ)_/¯';
    }
    clazz = vehicles_by_class[0]._clazz;

    /* Filter vehicles in specified tier */
    if (args.length >= 2) {
        var tier = args[1];
        var vehicles_by_tier = vehicles_by_class.filter(function (vehicle) {
            return tier === normalize(vehicle._tier);
        });

        /* Print tiers for selected class (if an invalid tier was specified) */
        if (0 === vehicles_by_tier.length) {
            return clazz + ': ' + [...raceable_classes_and_tiers.get(clazz)].join(', ');
        }
        tier = vehicles_by_tier[0]._tier;
        return truncate(vehicles_with_class_and_tier(vehicles, clazz, tier));
    }

    return 'GTA 5 Vehicle Info Spreadsheet, Tier Lists & More: https://broughy.com/gta5cars';
}

function normalize(text) {
    if (!text) {
        text = '';
    }

    /* Convert to lowercase */
    text = text.toLowerCase();

    /* Remove plural */
    text = text.replace(/(\S)s\b/g, '$1');

    /* Remove accents */
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    /* Remove everything behind '@' */
    text = text.replace(/\s*@.*/, '');

    /* Convert whitespace to ' ' */
    text = text.replace(/\s+/g, ' ');

    /* Remove all chars that are not letters, '+' or '-' */
    text = text.replace(/[^a-z +\-]+/g, '');

    /* Substitute common aliases with the correct keywords */
    text = text.replace(/\b(?:help|info|option|instruction)\b/g, 'usage')
        .replace(/\b(?:open\swheel|open|wheel|formula)\b/g, 'open-wheel')
        .replace(/\b(?:sport\sclassic|sportsclassic|sportclassic|classic)\b/g, 'sport-classic')
        .replace(/\b(?:utilitie|utiliti)\b/g, 'utility')
        .replace(/\b(?:off\sroad|offroad)\b/g, 'off-road')
        .replace(/\b(?:random[\s\-]clase?)\b/g, 'random-class')
        .replace(/\b(?:random\stier)\b/g, 'random-tier');

    return text.trim();
}

function parse_vehicles(data) {
    return data.split('<EOL>').map(function (row) {
        var cols = row.split('\t');
        return new Vehicle(cols[0], cols[1], cols[2]);
    });
}

function Vehicle(_clazz, _tier, _name) {
    this._clazz = _clazz;
    this._tier = _tier;
    this._name = _name;

    this.toString = function () {
        return _name;
    };
}

function group_tiers_by_class(vehicles) {
    var result = vehicles.reduce(function (accumulator, vehicle) {
        if (!accumulator.has(vehicle._clazz)) {
            accumulator.set(vehicle._clazz, new Set());
        }
        accumulator.get(vehicle._clazz).add(vehicle._tier);
        return accumulator;
    }, new Map());

    /* Sort order: S+, S, A, B, C, ... */
    result.forEach(function (value, key, map) {
        value = [...value].sort(function (a, b) {
            var a_tier = a.replace(/^S\+/i, '0').replace(/^S/i, '1');
            var b_tier = b.replace(/^S\+/i, '0').replace(/^S/i, '1');
            return a_tier.localeCompare(b_tier);
        });
        map.set(key, new Set(value));
    });

    return result;
}

function filter_raceable_tiers_by_class(all_classes_and_tiers) {
    return Array.from(all_classes_and_tiers.entries())
        .reduce(function (accumulator, [clazz, all_tiers]) {
            var raceable_tiers = new Set(all_tiers);
            raceable_tiers.delete('-');
            if (raceable_tiers.size > 1) {
                accumulator.set(clazz, raceable_tiers);
            }
            return accumulator;
        }, new Map());
}

function random_class(args, all_classes_and_tiers, raceable_classes_and_tiers) {
    if (args.length >= 2) {
        /* !randomclass race */
        if (args[1] === 'race') {
            var classes = Array.from(raceable_classes_and_tiers.keys());
            var i = Math.floor(Math.random() * classes.length);
            var clazz = classes[i];
            return 'Random Class ' + (i + 1) + '/' + classes.length + ': ' + clazz;
        }

        /* !randomclass all */
        if (args[1] === 'all') {
            var classes = Array.from(all_classes_and_tiers.keys());
            var i = Math.floor(Math.random() * classes.length);
            var clazz = classes[i];
            return 'Random Class ' + (i + 1) + '/' + classes.length + ': ' + clazz;
        }
    }

    return 'Usage: !randomclass (race | all)';
}

function random_tier(args, raceable_classes_and_tiers, vehicles) {
    if (args.length >= 2) {
        /* !randomtier all */
        if (args[1] === 'all') {
            var classes_and_tiers = Array.from(raceable_classes_and_tiers.entries())
                .reduce(function(accumulator, [clazz, tiers]) {
                    tiers.forEach(function(tier){
                        accumulator.push([clazz, tier]);
                    });
                    return accumulator;
                }, []);

            var i = Math.floor(Math.random() * classes_and_tiers.length);
            var [clazz, tier] = classes_and_tiers[i];

            /* Print selected tier */
            return 'Random Tier ' + (i + 1) + '/' + classes_and_tiers.length + ': ' +
                vehicles_with_class_and_tier(vehicles, clazz, tier);
        }

        /* !randomtier <class> */
        var class_and_tiers = Array.from(raceable_classes_and_tiers.entries()).filter(function([clazz, tiers]) {
            return args[1] === normalize(clazz);
        });
        if (class_and_tiers.length === 1) {
            var [clazz, tiers] = class_and_tiers[0];
            tiers = Array.from(tiers);
            var i = Math.floor(Math.random() * tiers.length);
            var tier = tiers[i];

            /* Print selected tier */
            return 'Random Tier ' + (i + 1) + '/' + tiers.length + ': ' +
                vehicles_with_class_and_tier(vehicles, clazz, tier);
        }
    }
    return 'Usage: !randomtier (<class> | all)';
}

function vehicles_with_class_and_tier(vehicles, clazz, tier) {
    return clazz + ' ' + tier + ' ▸ ' +
        vehicles.filter(function (vehicle) {
            return clazz == vehicle._clazz && tier == vehicle._tier;
        }).map(function (vehicle) {
            return vehicle._name;
        }).join(', ');
}

function truncate(text) {
    if (text.length > 400) {
        return text.substring(0, 399) + '…';
    }
    return text;
}
