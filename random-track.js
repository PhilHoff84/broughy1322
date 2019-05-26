/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !randomtrack $(eval track('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/15ZGd_KKINKJhqIS56Fy23YhY9DTeglmCoFYkREVFDek/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-track.js);)
 */
function track(provider='', query = '', data = '') {
    query = normalize(query);

    var [platform_filter, type_filter] = parse_query(query);
    if (!!platform_filter) {/*
 * Nightbot command:/*/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !randomtrack $(eval track('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/15ZGd_KKINKJhqIS56Fy23YhY9DTeglmCoFYkREVFDek/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-track.js);)
 */
function track(provider='', query = '', data = '') {
    query = normalize(query);

    var [platform_filter, type_filter] = parse_query(query);
    if (platform_filter === '') {
        return 'which platform? (PS4 / PC / XB1 / 5M)';
    }

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
        return track.matches(platform_filter, type_filter.trim());
    });


    /* Output a random track (or error message) */
    if (matching_tracks.length > 0) {
        var i = Math.floor(Math.random() * matching_tracks.length);
        var track = matching_tracks[i];
        return 'Random track ' + i + '/' + matching_tracks.length + ': ' + track;
    }
    return type_filter+'Could not find a matching random track ¯\\_(ツ)_/¯';
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

function parse_query(query_before='') {
    var query_after = '';

    query_after = query_before.replace(/\bps ?4\b/g, '');
    if (query_before !== query_after) return ['ps', query_after];
/*
    query_after = query_before.replace(/\bpc\b/g, '');
    if (query_before !== query_after) return ['pc', query_after];

    query_after = query_before.replace(/\bxb(?:ox)? ?1?\b/g, '');
    if (query_before !== query_after) return ['xb', query_after];

    query_after = query_before.replace(/\b(?:5|five) ?m\b/g, '');
    if (query_before !== query_after) return ['5m', query_after];
*/
    return ['', query_before];
}


function Track(_type, _name, _ps, _pc, _xb, _5m) {
    this._type = _type;
    this._name = _name;
    this._ps = _ps.length > 1;
    this._pc = _pc.length > 1;
    this._xb = _xb.length > 1;
    this._5m = _5m.length > 1;

    this.toString = function () {
        var platforms = [];
        if (this._ps) {
            platforms.push('PS4');
        }
        if (this._pc) {
            platforms.push('PC');
        }
        if (this._xb) {
            platforms.push('XB1');
        }
        if (this._5m) {
            platforms.push('FiveM PH');
        }

        return _type + ' ▸ ' + _name + ' (' + platforms.join(', ') + ')';
    };

    this.matches = function (platform_filter, type_filter) {
        return true;/*
        if (type_filter !== '' && this._type.indexOf(type_filter) === -1) return false;

        return     this._ps && platform_filter === 'ps'
                || this._pc && platform_filter === 'pc'
                || this._xb && platform_filter === 'xb'
                || this._5m && platform_filter === '5m';*/
    }
}
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !randomtrack $(eval track('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/15ZGd_KKINKJhqIS56Fy23YhY9DTeglmCoFYkREVFDek/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-track.js);)
 */
function track(provider='', query = '', data = '') {
    query = normalize(query);

    var [platform_filter, type_filter] = parse_query(query);
    if (platform_filter === '') {
        return 'which platform? (PS4 / PC / XB1 / 5M)';
    }

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
        return track.matches(platform_filter, type_filter.trim());
    });


    /* Output a random track (or error message) */
    if (matching_tracks.length > 0) {
        var i = Math.floor(Math.random() * matching_tracks.length);
        var track = matching_tracks[i];
        return 'Random track ' + i + '/' + matching_tracks.length + ': ' + track;
    }
    return type_filter+'Could not find a matching random track ¯\\_(ツ)_/¯';
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

function parse_query(query_before='') {
    var query_after = '';

    query_after = query_before.replace(/\bps ?4\b/g, '');
    if (query_before !== query_after) return ['ps', query_after];

    query_after = query_before.replace(/\bpc\b/g, '');
    if (query_before !== query_after) return ['pc', query_after];

    query_after = query_before.replace(/\bxb(?:ox)? ?1?\b/g, '');
    if (query_before !== query_after) return ['xb', query_after];

    query_after = query_before.replace(/\b(?:5|five) ?m\b/g, '');
    if (query_before !== query_after) return ['5m', query_after];

    return ['', query_before]
}


function Track(_type, _name, _ps, _pc, _xb, _5m) {
    this._type = _type;
    this._name = _name;
    this._ps = _ps.length > 1;
    this._pc = _pc.length > 1;
    this._xb = _xb.length > 1;
    this._5m = _5m.length > 1;

    this.toString = function () {
        var platforms = [];
        if (this._ps) {
            platforms.push('PS4');
        }
        if (this._pc) {
            platforms.push('PC');
        }
        if (this._xb) {
            platforms.push('XB1');
        }
        if (this._5m) {
            platforms.push('FiveM PH');
        }

        return _type + ' ▸ ' + _name + ' (' + platforms.join(', ') + ')';
    };

    this.matches = function (platform_filter, type_filter) {
        return true;/*
        if (type_filter !== '' && this._type.indexOf(type_filter) === -1) return false;

        return     this._ps && platform_filter === 'ps'
                || this._pc && platform_filter === 'pc'
                || this._xb && platform_filter === 'xb'
                || this._5m && platform_filter === '5m';*/
    }
}
 * !editcom -ul=everyone -cd=5 !randomtrack $(eval track('$(provider)', '$(query/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !randomtrack $(eval track('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/15ZGd_KKINKJhqIS56Fy23YhY9DTeglmCoFYkREVFDek/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-track.js);)
 */
function track(provider='', query = '', data = '') {
    query = normalize(query);

    var [platform_filter, type_filter] = parse_query(query);
    if (platform_filter === '') {
        return 'which platform? (PS4 / PC / XB1 / 5M)';
    }

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
        return track.matches(platform_filter, type_filter.trim());
    });


    /* Output a random track (or error message) */
    if (matching_tracks.length > 0) {
        var i = Math.floor(Math.random() * matching_tracks.length);
        var track = matching_tracks[i];
        return 'Random track ' + i + '/' + matching_tracks.length + ': ' + track;
    }
    return type_filter+'Could not find a matching random track ¯\\_(ツ)_/¯';
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

function parse_query(query_before='') {
    var query_after = '';

    query_after = query_before.replace(/\bps ?4\b/g, '');
    if (query_before !== query_after) return ['ps', query_after];

    query_after = query_before.replace(/\bpc\b/g, '');
    if (query_before !== query_after) return ['pc', query_after];

    query_after = query_before.replace(/\bxb(?:ox)? ?1?\b/g, '');
    if (query_before !== query_after) return ['xb', query_after];

    query_after = query_before.replace(/\b(?:5|five) ?m\b/g, '');
    if (query_before !== query_after) return ['5m', query_after];

    return ['', query_before]
}


function Track(_type, _name, _ps, _pc, _xb, _5m) {
    this._type = _type;
    this._name = _name;
    this._ps = _ps.length > 1;
    this._pc = _pc.length > 1;
    this._xb = _xb.length > 1;
    this._5m = _5m.length > 1;

    this.toString = function () {
        var platforms = [];
        if (this._ps) {
            platforms.push('PS4');
        }
        if (this._pc) {
            platforms.push('PC');
        }
        if (this._xb) {
            platforms.push('XB1');
        }
        if (this._5m) {
            platforms.push('FiveM PH');
        }

        return _type + ' ▸ ' + _name + ' (' + platforms.join(', ') + ')';
    };

    this.matches = function (platform_filter, type_filter) {
        if (type_filter !== '' && this._type.indexOf(type_filter) === -1) return false;

        return     this._ps && platform_filter === 'ps'
                || this._pc && platform_filter === 'pc'
                || this._xb && platform_filter === 'xb'
                || this._5m && platform_filter === '5m';
    }
})', "$(urlfetch json https://docs.google.com/spreadsheets/d/15ZGd_KKINKJhqIS56Fy23YhY9DTeglmCoFYkREVFDek/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-track.js);)
 */
function track(provider='', query = '', data = '') {
    query = normalize(query);

    var [platform_filter, type_filter] = parse_query(query);
    if (!platform_filter) {
        return 'which platform? (PS4 / PC / XB1 / 5M)';
    }

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
        return track.matches(platform_filter, type_filter.trim());
    });


    /* Output a random track (or error message) */
    if (matching_tracks.length > 0) {
        var i = Math.floor(Math.random() * matching_tracks.length);
        var track = matching_tracks[i];
        return 'Random track ' + i + '/' + matching_tracks.length + ': ' + track;
    }
    return type_filter+'Could not find a matching random track ¯\\_(ツ)_/¯';
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

function parse_query(query_before='') {
    var query_after = '';

    query_after = query_before.replace(/\bps ?4\b/g, '');
    if (query_before !== query_after) return ['ps', query_after];

    query_after = query_before.replace(/\bpc\b/g, '');
    if (query_before !== query_after) return ['pc', query_after];

    query_after = query_before.replace(/\bxb(?:ox)? ?1?\b/g, '');
    if (query_before !== query_after) return ['xb', query_after];

    query_after = query_before.replace(/\b(?:5|five) ?m\b/g, '');
    if (query_before !== query_after) return ['5m', query_after];

    return ['', query_before]
}


function Track(_type, _name, _ps, _pc, _xb, _5m) {
    this._type = _type;
    this._name = _name;
    this._ps = _ps.length > 1;
    this._pc = _pc.length > 1;
    this._xb = _xb.length > 1;
    this._5m = _5m.length > 1;

    this.toString = function () {
        var platforms = [];
        if (this._ps) {
            platforms.push('PS4');
        }
        if (this._pc) {
            platforms.push('PC');
        }
        if (this._xb) {
            platforms.push('XB1');
        }
        if (this._5m) {
            platforms.push('FiveM PH');
        }

        return _type + ' ▸ ' + _name + ' (' + platforms.join(', ') + ')';
    };

    this.matches = function (platform_filter, type_filter) {
        if (type_filter !== '' && this._type.indexOf(type_filter) === -1) return false;

        return     this._ps && platform_filter === 'ps'
                || this._pc && platform_filter === 'pc'
                || this._xb && platform_filter === 'xb'
                || this._5m && platform_filter === '5m';
    }
}
        return 'which platform? (PS4 / PC / XB1 / 5M)';
    }

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
        return track.matches(platform_filter, type_filter.trim());
    });


    /* Output a random track (or error message) */
    if (matching_tracks.length > 0) {
        var i = Math.floor(Math.random() * matching_tracks.length);
        var track = matching_tracks[i];
        return 'Random track ' + i + '/' + matching_tracks.length + ': ' + track;
    }
    return 'Could not find a matching random track ¯\\_(ツ)_/¯';
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

function parse_query(query_before='') {
    var query_after = '';

    query_after = query_before.replace(/\bps ?4\b/g, '');
    if (query_before !== query_after) return ['ps', query_after];

    query_after = query_before.replace(/\bpc\b/g, '');
    if (query_before !== query_after) return ['pc', query_after];

    query_after = query_before.replace(/\bxb(?:ox)? ?1?\b/g, '');
    if (query_before !== query_after) return ['xb', query_after];

    query_after = query_before.replace(/\b(?:5|five) ?m\b/g, '');
    if (query_before !== query_after) return ['5m', query_after];

    return ['', query_before]
}


function Track(_type, _name, _ps, _pc, _xb, _5m) {
    this._type = _type;
    this._name = _name;
    this._ps = _ps.length > 1;
    this._pc = _pc.length > 1;
    this._xb = _xb.length > 1;
    this._5m = _5m.length > 1;

    this.toString = function () {
        var platforms = [];
        if (this._ps) {
            platforms.push('PS4');
        }
        if (this._pc) {
            platforms.push('PC');
        }
        if (this._xb) {
            platforms.push('XB1');
        }
        if (this._5m) {
            platforms.push('FiveM PH');
        }

        return _type + ' ▸ ' + _name + ' (' + platforms.join(', ') + ')';
    };

    this.matches = function (platform_filter, type_filter) {
        if (type_filter !== '' && this._type.indexOf(type_filter) === -1) return false;

        return     this._ps && platform_filter === 'ps'
                || this._pc && platform_filter === 'pc'
                || this._xb && platform_filter === 'xb'
                || this._5m && platform_filter === '5m';
    }
}
