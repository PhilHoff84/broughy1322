/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomtrack $(eval track('$(query)', $(urlfetch json https://docs.google.com/spreadsheets/d/15ZGd_KKINKJhqIS56Fy23YhY9DTeglmCoFYkREVFDek/export?exportFormat=tsv&gid=219652588)); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-track-new.js);)
 */
function track(query = '', data = {}) {
    query = normalize(query);

    const [platform_filter, type_filter] = parse_query(query);
    if (platform_filter === '') {
        return 'Usage: platform:'+platform_filter + ' type:'+type_filter;
        return 'Usage: !randomtrack (PS4 | XB1 | PC | 5M) (<category>)';
    }

    /* Find all tracks that match the specified platform */
    const tracks = data[platform_filter];

    /* Find all tracks that match the specified criteria */
    var matching_tracks = [];
    for (var track_type in data) {
        matching_tracks.push(normalize(track_type));
        if (normalize(track_type).indexOf(type_filter) === -1) {
            continue;
        }
        matching_tracks = matching_tracks.concat(tracks[track_type]);
        /*
         * Merge the second array into the first one
         * Equivalent to vegetables.push('celery', 'beetroot')
         * Array.prototype.push.apply(vegetables, moreVegs)
         */
    };
    return truncate('platform:'+platform_filter + ' type:'+type_filter + ' -> ' + JSON.stringify(matching_tracks));

    /* Output a random track (or error message) */
    if (matching_tracks.length > 0) {
        var i = Math.floor(Math.random() * matching_tracks.length);
        var track = matching_tracks[i];
        return 'Random Track: ' + track;
    }
    return 'Could not find a matching random track ¯\\_(ツ)_/¯';
}

function normalize(text) {
    if (!text) {
        text = '';
    }

    /* Convert to lowercase */
    text = text.toLowerCase();

    /* Remove plural (unless part of 'PS 4')*/
    text = text.replace(/(?<=\bp)s\b(?=4)/g, '');

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

    query_after = query_before.replace(/\bps ?4?\b/g, '');
    if (query_before !== query_after) return ['PS4', query_after.trim()];

    query_after = query_before.replace(/\bpc\b/g, '');
    if (query_before !== query_after) return ['PC', query_after.trim()];

    query_after = query_before.replace(/\bxb(?:ox)? ?1?\b/g, '');
    if (query_before !== query_after) return ['XB1', query_after.trim()];

    query_after = query_before.replace(/\b(?:5|five) ?m\b/g, '');
    if (query_before !== query_after) return ['5M', query_after.trim()];

    return ['', query_before];
}

function truncate(text) {
    if (text.length > 400) {
        return text.substring(0, 399) + '…';
    }
    return text;
}
