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
 
    /* Parse vehicles */
    var vehicles = data.split('<EOL>').map(function (row) {
        var cols = row.split('\t');
        return new Vehicle(cols[0], cols[1], cols[2]);
    });
    
    /* Parse vehicles */
    var vehicles = data.split('<EOL>').map(function (row) {
        var cols = row.split('\t');
        return new Vehicle(cols[0], cols[1], cols[2]);
    });
    
    /* Determine all classes and tiers */
    var all_classes_and_tiers = vehicles.reduce(function (accumulator, vehicle) {
        if (accumulator.has(vehicle._clazz)) {
            accumulator.set(vehicle._clazz, new Set());
        }
        accumulator.get(vehicle._clazz).add(vehicle._tier);
        return accumulator;
    }, new Map());
    return 'all: ' + all_classes_and_tiers.size;
}

function Vehicle(_clazz, _tier, _name) {
    this._clazz = _clazz;
    this._tier = _tier;
    this._name = _name;

    this.toString = function () {
        return _name;
    };
}
