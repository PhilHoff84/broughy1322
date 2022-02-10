/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=10 !randomplaylist $(eval playlist('$(query)', $(urlfetch json https://docs.google.com/spreadsheets/d/15ZGd_KKINKJhqIS56Fy23YhY9DTeglmCoFYkREVFDek/export?exportFormat=tsv)); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-playlist.js);)
 */
function playlist(query = '', data = {}) {
    query = normalize(query);

    /* Find all tracks that match the specified platform */
    const platform = parse_platform(query);

    const tracks = data[platform];
    if (tracks !== Object(tracks)) {
        return 'Usage: !randomplaylist (PS4 | XB1 | PC)';
    }

    /* Find all tracks that match the specified category */
    const categories = ['Airport', 'Blaine', 'City', 'Hills', 'Custom'];
    const matching_tracks = [];
    try {
        for (const category of categories) {
            matching_tracks.push(
                track(category, tracks)
            );
        }
    } catch (e) {
        return 'Could not generate a random playlist ¯\\_(ツ)_/¯';
    }

    return truncate('Random Playlist: ' + matching_tracks.join(' | '));
}

function track(category = '', tracks = {}) {
    category = normalize(category);

    /* Find all tracks that match the specified category */
    const matching_tracks = [];
    for (var track_category in tracks) {

        if (category !== '' && normalize(track_category).indexOf(category) === -1) {
            continue;
        }
        Array.prototype.push.apply(matching_tracks, tracks[track_category].map(function(track_name) {
            return track_name;
        }));
    };

    /* Output a random track (or error message) */
    if (matching_tracks.length > 0) {
        const i = Math.floor(Math.random() * matching_tracks.length);
        const track = matching_tracks[i];
        return track;
    }
    throw `Could not find a track in category: ${category}`;
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

function parse_platform(query='') {
    if (query.match(/\bps ?4?\b/g) !== null) return 'PS4';
    if (query.match(/\bpc\b/g) !== null) return 'PC';
    if (query.match(/\bxb(?:ox)? ?1?\b/g) !== null) return 'XB1';

    return '';
}

function truncate(text) {
    if (text.length > 400) {
        return text.substring(0, 399) + '…';
    }
    return text;
}
