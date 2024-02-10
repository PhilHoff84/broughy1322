/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !tiers $(eval tiers('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0/export?format=tsv&id=1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0&gid=2045938943)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/tiers.js);)
 * !editcom -ul=everyone -cd=5 !randomclass -a=!tiers random-class $(query)
 * !editcom -ul=everyone -cd=5 !randomtier -a=!tiers random-tier $(query)
 * !editcom -ul=everyone -cd=5 !randomcar -a=!tiers random-car $(query)
 * !editcom -ul=everyone -cd=5 !compacts -a=!tiers compacts $(query)
 * !editcom -ul=everyone -cd=5 !coupes -a=!tiers coupes $(query)
 * !editcom -ul=everyone -cd=5 !muscle -a=!tiers muscle $(query)
 * !editcom -ul=everyone -cd=5 !offroad -a=!tiers off-road $(query)
 * !editcom -ul=everyone -cd=5 !offroads -a=!tiers off-road $(query)
 * !editcom -ul=everyone -cd=5 !openwheel -a=!tiers open-wheel $(query)
 * !editcom -ul=everyone -cd=5 !sedans -a=!tiers sedans $(query)
 * !editcom -ul=everyone -cd=5 !sports -a=!tiers sports $(query)
 * !editcom -ul=everyone -cd=5 !classics -a=!tiers sports-classics $(query)
 * !editcom -ul=everyone -cd=5 !supers -a=!tiers supers $(query)
 * !editcom -ul=everyone -cd=5 !suvs -a=!tiers suvs $(query)
 * !editcom -ul=everyone -cd=5 !tuners -a=!tiers tuners $(query)
 * !editcom -ul=everyone -cd=5 !utility -a=!tiers utility $(query)
 * !editcom -ul=everyone -cd=5 !vans -a=!tiers vans $(query)
 */
function tiers(provider = '', query = '', data = '') {
    /* Sanitize the filter criteria specified in the query */
    query = normalize(query);
    const args = query.split(/\s+/);

    /* Parse vehicles */
    const vehicles = parse_vehicles(data);
    if (0 === vehicles.length) {
        return 'Could not parse vehicle data ¯\\_(ツ)_/¯';
    }

    /* Determine all classes and tiers */
    const all_classes_and_tiers = group_tiers_by_class(vehicles);

    /* Determine raceable classes and tiers */
    const raceable_classes_and_tiers = filter_raceable_tiers_by_class(all_classes_and_tiers);

    /* Random class */
    if (args[0] === 'random-class') {
        return truncate(random_class(args, all_classes_and_tiers, raceable_classes_and_tiers));
    }

    /* Random tier */
    if (args[0] === 'random-tier') {
        return truncate(random_tier(args, raceable_classes_and_tiers, vehicles));
    }

    /* Random car */
    if (args[0] === 'random-car') {
        return truncate(random_car(args, vehicles));
    }

    /* Filter vehicles in specified class */
    var clazz = args[0];
    const vehicles_by_class = vehicles.filter(function(vehicle) {
        return clazz === normalize(vehicle._clazz) && '-' !== normalize(vehicle._tier);
    });
    if (vehicles_by_class.length > 0) {
        clazz = vehicles_by_class[0]._clazz;

        /* Filter vehicles in specified tier */
        var tier = args.length >= 2 ? args[1] : '-';
        const vehicles_by_tier = vehicles_by_class.filter(function(vehicle) {
            return tier === normalize(vehicle._tier);
        });

        /* Print tiers for selected class (if an invalid tier was specified) */
        if (0 === vehicles_by_tier.length) {
            return truncate(clazz + ': ' + [...raceable_classes_and_tiers.get(clazz)].join(', '));
        }
        tier = vehicles_by_tier[0]._tier;
        return truncate(vehicles_with_class_and_tier(vehicles, clazz, tier));
    }



    const vehicles_by_name = vehicles.filter(function(vehicle) {
        return args.join(' ') === normalize(vehicle._name);
    });
    if (vehicles_by_name.length > 0) {
        const vehicle_by_name = vehicles_by_name[0];
        return truncate(vehicle_with_class_and_tier(vehicle_by_name));
    }

    return 'GTA 5 Vehicle Info Spreadsheet, Tier Lists & More: https://gtacars.net/gta5/tiers';
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

    /* Remove all chars that are not letters, numbers, '+' or '-' */
    text = text.replace(/[^a-z0-9 +\-]+/g, '');

    /* Substitute common aliases with the correct keywords */
    text = text.replace(/\b(?:help|info|option|instruction)\b/g, 'usage')
        .replace(/\b(?:open[\s\-]wheel|open|wheel|formula)\b/g, 'open-wheel')
        .replace(/\b(?:sports?[\s\-]classic|sportsclassic|sportclassic|classic)\b/g, 'sport-classics')
        .replace(/\b(?:utilitie|utiliti)\b/g, 'utility')
        .replace(/\b(?:off[\s]road|offroad)\b/g, 'off-road')
        .replace(/\b(?:random[\s\-]clase?)\b/g, 'random-class')
        .replace(/\b(?:random[\s]tier)\b/g, 'random-tier')
        .replace(/\b(?:random[\s]car)\b/g, 'random-car')
        .replace(/\b(?:all )(regular|raceable|transform|other)\b/g, '$1');

    return text.trim();
}

function parse_vehicles(data) {
    return data.split('<EOL>').map(function(row) {
        const cols = row.trim().split('\t');
        return new Vehicle(cols[0], cols[1], cols[2], cols[3]);
    });
}

function Vehicle(_clazz, _tier, _name, _availability) {
    this._clazz = _clazz;
    this._tier = _tier;
    this._name = _name;
    this._availability = _availability;

    this.toString = function() {
        return _name;
    };
}

function group_tiers_by_class(vehicles) {
    const result = vehicles.reduce(function(accumulator, vehicle) {
        if (!accumulator.has(vehicle._clazz)) {
            accumulator.set(vehicle._clazz, new Set());
        }
        accumulator.get(vehicle._clazz).add(vehicle._tier);
        return accumulator;
    }, new Map());

    /* Sort order: S+, S, A, B, C, ... */
    result.forEach(function(value, key, map) {
        value = [...value].sort(function(a, b) {
            const a_tier = a.replace(/^S\+/i, '0').replace(/^S/i, '1');
            const b_tier = b.replace(/^S\+/i, '0').replace(/^S/i, '1');
            return a_tier.localeCompare(b_tier);
        });
        map.set(key, new Set(value));
    });

    return result;
}

function filter_raceable_tiers_by_class(all_classes_and_tiers) {
    return Array.from(all_classes_and_tiers.entries())
        .reduce(function(accumulator, [clazz, all_tiers]) {
            const raceable_tiers = new Set(all_tiers);
            raceable_tiers.delete('-');
            raceable_tiers.delete('?');
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
            const classes = Array.from(raceable_classes_and_tiers.keys());
            const i = Math.floor(Math.random() * classes.length);
            const clazz = classes[i];
            return 'Random Class: ' + clazz;
        }

        /* !randomclass all */
        if (args[1] === 'all') {
            const classes = Array.from(all_classes_and_tiers.keys());
            const i = Math.floor(Math.random() * classes.length);
            const clazz = classes[i];
            return 'Random Class: ' + clazz;
        }
    }

    return 'Usage: !randomclass (race | all)';
}

function random_tier(args, raceable_classes_and_tiers, vehicles) {
    if (args.length >= 2) {
        /* !randomtier all */
        if (args[1] === 'all') {
            const classes_and_tiers = Array.from(raceable_classes_and_tiers.entries())
                .reduce(function(accumulator, [clazz, tiers]) {
                    tiers.forEach(function(tier) {
                        accumulator.push([clazz, tier]);
                    });
                    return accumulator;
                }, []);

            const i = Math.floor(Math.random() * classes_and_tiers.length);
            const [clazz, tier] = classes_and_tiers[i];

            /* Print selected tier */
            return 'Random Tier: ' + vehicles_with_class_and_tier(vehicles, clazz, tier);
        }

        /* !randomtier <class> */
        const class_and_tiers = Array.from(raceable_classes_and_tiers.entries()).filter(function([clazz, tiers]) {
            return args[1] === normalize(clazz);
        });
        if (class_and_tiers.length === 1) {
            var [clazz, tiers] = class_and_tiers[0];
            tiers = Array.from(tiers);
            const i = Math.floor(Math.random() * tiers.length);
            const tier = tiers[i];

            /* Print selected tier */
            return 'Random Tier: ' + vehicles_with_class_and_tier(vehicles, clazz, tier);
        }
    }
    return 'Usage: !randomtier (<class> | all)';
}

function random_car(args, vehicles) {
    if (args.length >= 2) {
        /* !randomcar <pseudo class> */
        const random_vehicles = vehicles.filter(function(vehicle) {
            const multi_class = vehicle._name.indexOf('[') !== -1;
            switch (args[1]) {
                case 'car':
                case 'race':
                    /* Random raceable land vehicle that's not in motorcycles or cycles class */
                    return !multi_class && vehicle._availability === 'regular' && (
                        vehicle._clazz !== 'Boats' &&
                        vehicle._clazz !== 'Helicopters' &&
                        vehicle._clazz !== 'Planes' &&
                        vehicle._clazz !== 'Cycles' &&
                        vehicle._clazz !== 'Motorcycles'
                    );
                case 'bike':
                    /* Random raceable motorcycle or cycle */
                    return !multi_class && vehicle._availability === 'regular' && (vehicle._clazz === 'Motorcycles' || vehicle._clazz === 'Cycles');
                case 'land':
                    /* Random car, bike or cycle (whether raceable or not) */
                    return !multi_class && vehicle._clazz !== 'Boats' && vehicle._clazz !== 'Helicopters' && vehicle._clazz !== 'Planes';
                case 'air':
                    /* Random helicopter or plane (whether raceable or not) */
                    return !multi_class && (vehicle._clazz === 'Helicopters' || vehicle._clazz === 'Planes');
                case 'sea':
                case 'water':
                    /* Random boat (whether raceable or not) */
                    return !multi_class && vehicle._clazz === 'Boats';

                case 'all':
                    /* Random vehicle from any class (whether raceable or not) */
                    return !multi_class;

                case 'regular':
                case 'raceable':
                    /* Random raceable vehicle from any class */
                    return !multi_class && vehicle._availability === 'regular';
                case 'transform':
                    /* Random vehicle that's only available in 'transform' races */
                    return !multi_class && vehicle._availability === 'transform';
                case 'other':
                    /* Random vehicle that's only available in 'other' races */
                    return !multi_class && vehicle._availability === 'other';

                case 'rally':
                    /* Random vehicle from the pseudo 'rally' class */
                    return !multi_class && [
                        'Kuruma',
                        'Kuruma (Armored)',
                        'Omnis',
                        'Stirling GT [Sports Classics]',
                        'Sultan',
                        'Tropos Rallye',
                        'Comet Safari',
                        'Retinue',
                        'Savestra',
                        'Sentinel Classic',
                        'GB200'
                    ].includes(vehicle._name);
                default:
                    /* Random raceable vehicle that's in the specified class */
                    return vehicle._availability === 'regular' && normalize(vehicle._clazz) === args[1];
            }
        });

        if (args.length >= 3 && args[2].length == 1) {
            /* !randomcar <pseudo class> <tier> */
            const random_vehicles = vehicles.filter(function(vehicle) {
                /* Random vehicle from the specified tier */
                return vehicle._tier === args[2];
            });
        }

        if (random_vehicles.length > 0) {
            const i = Math.floor(Math.random() * random_vehicles.length);
            const random_vehicle = random_vehicles[i];

            /* Print selected vehicle */
            return 'Random Vehicle: ' + vehicle_with_class_and_tier(random_vehicle);
        }
    }
    return 'Usage: !randomcar (<class> (<tier>) | car | bike | land | air | sea | all [regular | transform | other])';
}

function vehicles_with_class_and_tier(vehicles, clazz, tier) {
    return clazz + ' ' + tier + ' ▸ ' +
        vehicles.filter(function(vehicle) {
            return clazz == vehicle._clazz && tier == vehicle._tier;
        }).map(function(vehicle) {
            return vehicle._name;
        }).join(', ');
}

function vehicle_with_class_and_tier(vehicle) {
    const tier = vehicle._tier === '-' ? '' : ' ' + vehicle._tier;
    const availability = vehicle._availability === undefined ? ' [not raceable]' : vehicle._availability === 'regular' ? '' : ' [' + vehicle._availability + ' race only]';
    return vehicle._clazz + tier + ' ▸ ' + vehicle._name + availability;
}

function truncate(text) {
    if (text.length > 400) {
        return text.substring(0, 399) + '…';
    }
    return text;
}
