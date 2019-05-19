/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !randomtrack $(eval track('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/15ZGd_KKINKJhqIS56Fy23YhY9DTeglmCoFYkREVFDek/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/randomtrack.js);)
 */
function track(provider='', query = '', data = '') {
    query = normalize(query);

    var rows = data.split('<EOL>');
    var tracks = [];
    var type = 'unknown';
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i].trim();
        var cols = row.split('\t');

        if (cols.length === 1) {
            type = cols[0];
        } else if (cols.length === 5) {
            tracks.push(new Track(type, cols[0], cols[1], cols[2], cols[3], cols[4]));
        }
    }
    
    /* Find all tracks that match the specified criteria */
    var matching_tracks = tracks.filter(function (track) {
        return track.matches(query);
    });
    
    
    /* Output a random track (or error message) */
    if (matching_tracks.length > 0) {
        var track = track[Math.floor(Math.random() * matching_tracks.length)];
        return 'Random track 1/' + matching_tracks.length + ': ' + track;
    } else {
        return 'Could not find a matching random track ¯\\_(ツ)_/¯';
    }
    
    return tracks.size + ": " + Array.from(tracks.keys()).join(', ').substring(0, 380);
    return 'n: '+data.split('\n').length + ' r: ' + data.split('\r').length;

    if (/\bps4\b/.test(query)) {
        return 'PS4';
    }
    if (/\bxb(?:ox)?1?\b/.test(query)) {
        return 'XB1';
    }
    if (/\bpc\b/.test(query)) {
        return 'PC';
    }
    if (/\b(?:5|five) ?m\b/.test(query)) {
        return 'Five M';
    }
    
    return query + 'which platform? (PS4 / PC / XB1 / 5M)';
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

    /* Remove all chars that are not letters */
    text = text.replace(/[^a-z0-9 ]+/g, '');

    return text;
}


function Track(_type, _name, _ps4, _pc, _xb1, _fivem) {
    this._type = _type;
    this._name = _name;
    this._ps4 = _ps4.length > 1;
    this._pc = _pc.length > 1;
    this._xb1 = _xb1.length > 1;
    this._fivem = _fivem.length > 1;

    this.toString = function () {
        return _type + ' ▸ ' + _name;
    };
    
    this.matches = function (query) {
        return true;
    }
}
