/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randommeme $(eval meme(`$(urlfetch json https://docs.google.com/spreadsheets/d/1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0/export?format=tsv&id=1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0&gid=601678403)`); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-meme.js);)
 */
function meme(data = '') {
    const memes = data.split('<EOL>');

    if (memes.length > 1) {
        const i = Math.floor(Math.random() * memes.length);
        const meme = memes[i];
        return 'Random Meme: ' + meme;
    }

    return 'Could not find a meme ¯\\_(ツ)_/¯';
}
