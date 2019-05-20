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
        var i = Math.floor(Math.random() * matching_tracks.length);
        var track = matching_tracks[i];
        return 'Random track ' + i + '/' + matching_tracks.length + ': ' + track;
    } else {
        return 'Could not find a matching random track ¯\\_(ツ)_/¯';
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
        var platforms = [];
        if (this._ps4) {
            platforms.push('PS4');
        }
        if (this._pc) {
            platforms.push('PC');
        }
        if (this._xb1) {
            platforms.push('XB1');
        }
        if (this._fivem) {
            platforms.push('FiveM PH');
        }
        
        return _type + ' ▸ ' + _name + ' (' + platforms.join(', ') + ')';
    };
    
    this.matches = function (query) {
        return this._ps4 && /\bps4\b/.test(query)
                || this._pc && /\bpc\b/.test(query)
                || this._xb1 && /\bxb(?:ox)?1?\b/.test(query)
                || this._fivem && /\b(?:5|five) ?m\b/.test(query);
    }
}
