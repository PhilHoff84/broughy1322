/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=10 !tier $(eval tier('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/17NQWlnzrHHPDXbPhoHyevwdQjDqHQGdIWgK4goiwy5U/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/race-tier.js);)
 * !editcom -ul=everyone -cd=10 !randomclass -a=!tier random $(query)
 * !editcom -ul=everyone -cd=10 !compacts -a=!tier compacts $(query)
 * !editcom -ul=everyone -cd=10 !coupes -a=!tier coupes $(query)
 * !editcom -ul=everyone -cd=10 !muscle -a=!tier muscle $(query)
 * !editcom -ul=everyone -cd=10 !offroad -a=!tier off-road $(query)
 * !editcom -ul=everyone -cd=10 !openwheel -a=!tier open-wheel $(query)
 * !editcom -ul=everyone -cd=10 !sedans -a=!tier sedans $(query)
 * !editcom -ul=everyone -cd=10 !sports -a=!tier sports $(query)
 * !editcom -ul=everyone -cd=10 !classics -a=!tier sports-classics $(query)
 * !editcom -ul=everyone -cd=10 !supers -a=!tier supers $(query)
 * !editcom -ul=everyone -cd=10 !suvs -a=!tier suvs $(query)
 * !editcom -ul=everyone -cd=10 !utility -a=!tier utility $(query)
 * !editcom -ul=everyone -cd=10 !vans -a=!tier vans $(query)
 */
function tier(provider='', query = '', data = '') {
    /* Sanitize the filter criteria specified in the query */
    query = normalize(query);
    var args = query.split(/\s+/);

    /* Parse vehicles */
    var vehicles = data.split('<EOL>').map(function (row) {
        var cols = row.split('\t');
        return new Vehicle(cols[0], cols[1], cols[2]);
    });

    if (0 === vehicles.length) {
        return 'Could not parse GTA Car Tiers ¯\\_(ツ)_/¯';
    }

    /* Print all available tiers */
    if (args.length === 0 || /\busage\b/.test(query)) {
        return 'GTA Car Tiers: ' +
            unique(
                vehicles.map(function (vehicle) {
                    return vehicle._clazz;
                })
            ).join(', ');
    }

    /* Select random tier */
    var is_random = /\brandom\b/.test(query);
    if (is_random) {
        if (args.length >= 2) { /* Random select */
            args = [ args[1] ];
        } else { /* Random all */
            var i = Math.floor(Math.random() * vehicles.length);
            var vehicle = vehicles[i];
            args = [ normalize(vehicle._clazz), normalize(vehicle._tier) ];
        }
    }

    /* Filter vehicles by class */
    var clazz = args[0];
    var vehicles_by_class = vehicles.filter(function (vehicle) {
        return normalize(vehicle._clazz) == clazz;
    });
    if (0 === vehicles_by_class.length) {
        if (is_random) {
            return 'Could not find a Random GTA Car Tier for: ' + query + ' ¯\\_(ツ)_/¯';
        }
        return 'Could not find a GTA Car Tier for: ' + clazz + ' ¯\\_(ツ)_/¯';
    }
    clazz = vehicles_by_class[0]._clazz;

    /* Random select */
    if (is_random) {
        var i = Math.floor(Math.random() * vehicles_by_class.length);
        var vehicle = vehicles_by_class[i];
        args = [ normalize(vehicle._clazz), normalize(vehicle._tier) ];
    }

    /* Filter vehicles by tier */
    var tier = args[1];
    var vehicles_by_tier = vehicles_by_class.filter(function (vehicle) {
        return normalize(vehicle._tier) == tier;
    });
    /* Print tiers for selected class */
    if (0 === vehicles_by_tier.length) {
        return 'GTA Car Tiers for ' + vehicles_by_class[0]._clazz + ': ' +
            unique(
                vehicles_by_class.map(function (vehicle) {
                    return vehicle._tier;
                })
            ).sort(function (a ,b) {
                /* Sort order: S+, S, A, B, C, ... */
                var a_tier = a.replace(/^S\+/i, '0').replace(/^S/i, '1');
                var b_tier = b.replace(/^S\+/i, '0').replace(/^S/i, '1');
                return a_tier.localeCompare(b_tier);
            }).join(', ');
    }
    tier = vehicles_by_tier[0]._tier;

    /* Print selected tiers */
    var result = (is_random ? 'Random ' : '') + 'GTA Car Tiers: ' + clazz + ' ' + tier + ' ▸ ' +
        vehicles_by_tier.map(function (vehicle) {
            return vehicle._name;
        }).join(', ');

    if (result.length > 400) {
        return result.substring(0, 399) + '…';
    }

    return result;
}

function normalize(text) {
    if (!text) {
        text = '';
    }

    /* Convert to lowercase */
    text = text.toLowerCase();

    /* Remove plural */
    text = text.replace(/(?<=\S)s\b/g, '');

    /* Remove accents */
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    /* Remove everything behind '@' */
    text = text.replace(/\s*@.*/, '');

    /* Convert whitespace to ' ' */
    text = text.replace(/\s+/g, ' ');

    /* Remove all chars that are not letters, '+' or '-' */
    text = text.replace(/[^a-z \+\-]+/g, '');

    /* Temporarily remove 'random' from query */
    var is_random = /\brandom\b/.test(text);
    if (is_random) {
        text = text.replace(/\brandom\b/g, '');
    }

    /* Substitute common aliases with the correct criteria */
    var result;
    switch (text) {
        case '': /* Print usage, if there was not even a single valid letter in the text */
            if (is_random) {
                result = '';
                break;
            } /* else fallthrough */
        case 'help':
        case 'info':
        case 'option':
        case 'instruction':
            result = 'usage';
            break;
        case 'open':
        case 'wheel':
        case 'formula':
        case 'open wheel':
            result = 'open-wheel';
            break;
        case 'classic':
        case 'sportclassic':
        case 'sportsclassic':
        case 'sport classic':
            result = 'sport-classic';
            break;
        case 'utiliti':
        case 'utilitie':
            result = 'utility';
            break;
        case 'offroad':
        case 'off road':
            result = 'off-road';
            break;
        default:
            result = text.trim();
            break;
    }

    return ((is_random ? 'random ' : '') + text).trim();
}

/* Returns only unique values from the specified argument */
function unique(values) {
    return [...new Set(values)];
}

function Vehicle(_clazz, _tier, _name) {
    this._clazz = _clazz;
    this._tier = _tier;
    this._name = _name;

    this.toString = function () {
        return _name;
    };
}
