/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomvideo $(eval video(`$(query)`, `$(urlfetch json https://docs.google.com/spreadsheets/d/1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0/export?format=tsv&id=1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0&gid=229679351)`); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-video.js);)
 */
function video(query = '', data = '') {
    /* Sanitize the filter criteria specified in the query */
    const found = query.match(/[^@]*?(\d+)/);
    const year = found && found[1];

    /* Parse videos */
    const videos = data.split('<EOL>').reduce(function(accumulator, row) {
        const cols = row.trim().split('\t');
        if (!year || year === cols[0]) {
            accumulator.push(cols[1]);
        }
        return accumulator;
    }, new Array());

    if (0 === videos.length) {
        if (!year) {
            return 'Could not find a video ¯\\_(ツ)_/¯';
        }
        return 'Could not find a video from ' + year + ' ¯\\_(ツ)_/¯';
    }

    const i = Math.floor(Math.random() * videos.length);
    const video = videos[i];
    return 'Random Video: ' + video;
}
