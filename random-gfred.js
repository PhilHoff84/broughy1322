/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomgfred $(eval gfred(`$(urlfetch json https://docs.google.com/spreadsheets/d/1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0/export?format=tsv&id=1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0&gid=120774303)`); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-gfred.js);)
 */
function gfred(data = '') {
    const gfreds = data.split('<EOL>');

    if (gfreds.length > 1) {
        const i = Math.floor(Math.random() * gfreds.length);
        const gfred = gfreds[i];
        return 'Random Gfred: ' + gfred;
    }

    return 'Could not find a Gfred ¯\\_(ツ)_/¯';
}
