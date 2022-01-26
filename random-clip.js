/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomclip $(eval clip(`$(urlfetch json https://docs.google.com/spreadsheets/d/1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0/export?format=tsv&id=1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0&gid=565945120)`); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-clip.js);)
 */
function clip(data = '') {
    const clips = data.split('<EOL>');

    if (clips.length > 1) {
        const i = Math.floor(Math.random() * clips.length);
        var clip = clips[i];
        if (clip.startsWith('twitch.tv')) {
            clip = `https://${clip}`;
        }
        return 'Random Clip: ' + clip;
    }

    return 'Could not find a clip ¯\\_(ツ)_/¯';
}
