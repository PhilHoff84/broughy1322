/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomtrack $(eval track('$(query)', $(urlfetch json https://docs.google.com/spreadsheets/d/15ZGd_KKINKJhqIS56Fy23YhY9DTeglmCoFYkREVFDek/export?exportFormat=tsv)); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-track.js);)
 */
function track(query = '', data = {}) {
    query = normalize(query);

    /* Find all tracks that match the specified platform */
    const [platform, category] = parse_query(query);
    const tracks = data[platform];
    if (tracks !== Object(tracks)) {
        return 'Usage: !randomtrack (PS5 | PS4 | XSX | XB1 | PC | 5M) (<category>)';
    }

    /* Find all tracks that match the specified category */
    const matching_tracks = [];
    for (var track_category in tracks) {
        if (category !== '' && normalize(track_category).indexOf(category) === -1) {
            continue;
        }
        Array.prototype.push.apply(matching_tracks, tracks[track_category].map(function(track_name) {
            return track_category + ' ▸ ' + track_name;
        }));
    };

    /* Output a random track (or error message) */
    if (matching_tracks.length > 0) {
        const i = Math.floor(Math.random() * matching_tracks.length);
        const track = matching_tracks[i];
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

    query_after = query_before.replace(/\bps ?5?\b/g, '');
    if (query_before !== query_after) return ['PS5', query_after.trim()];

    query_after = query_before.replace(/\bps ?4\b/g, '');
    if (query_before !== query_after) return ['PS4', query_after.trim()];

    query_after = query_before.replace(/\bpc\b/g, '');
    if (query_before !== query_after) return ['PC', query_after.trim()];

    query_after = query_before.replace(/\b?:(xb(?:ox)? ?|xsx)\b/g, '');
    if (query_before !== query_after) return ['XSX', query_after.trim()];
    
    query_after = query_before.replace(/\bxb(?:ox)? ?1\b/g, '');
    if (query_before !== query_after) return ['XB1', query_after.trim()];

    query_after = query_before.replace(/\b(?:5|five) ?m\b/g, '');
    if (query_before !== query_after) return ['5M', query_after.trim()];

    return ['', query_before];
}
