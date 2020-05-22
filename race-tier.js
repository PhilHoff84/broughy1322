/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=10 !tier $(eval tier('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/17NQWlnzrHHPDXbPhoHyevwdQjDqHQGdIWgK4goiwy5U/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/race-tier.js);)
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

    /* Parse vehicles */
    var vehicles = data.split('<EOL>').map(function (row) {
        var cols = row.split('\t');
        return new Vehicle(cols[0], cols[1], cols[2]);
    });
    return 'parsed ' + vehicles.length + 'vehicles';

    /* Print usage */
    if (/\busage\b/.test(query)) {
        return 'GTA tier lists are available for the following classes: ' +
            [...new Set(
                vehicles.map(function (vehicle) {
                    return vehicle._clazz;
                })
            )].join(', ');
    }

    return 'query: ' + query + ' | data: ' + data.split('<EOL>').join(' | ');
}

function normalize(text) {
    if (!text) {
        text = '';
    }

    /* Convert to lowercase */
    text = text.toLowerCase();

    /* Remove plural */
    text = text.replace(/s\b/g, '');

    /* Remove accents */
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    /* Remove everything behind '@' */
    text = text.replace(/\s*@.*/, '');

    /* Remove all chars that are not letters, whitespace or the plus char */
    text = text.replace(/[^a-z\s\+]+/g, '');

    /* Substitute common aliases with the correct criteria */
    switch (text) {
        case '': /* Print usage, if there was not even a single valid letter in the text */
        case 'help':
        case 'option':
        case 'instruction':
            return 'usage';
        case 'sportclassic':
        case 'sportsclassic':
            return 'classic';
        case 'utiliti':
        case 'utilitie':
            return 'utility';
        default:
            return text;
    }
}

function Vehicle(_clazz, _tier, _name) {
    /* Normalize the class name to match the normalized query */
    this._clazz = _clazz;
    this._tier = _tier;
    this._name = _name;

    this.toString = function () {
        return _name;
    };
}