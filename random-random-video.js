/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomrandom $(eval random_video(`$(urlfetch json https://docs.google.com/spreadsheets/d/1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0/export?format=tsv&id=1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0&gid=1686137097)`); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-random-video.js);)
 */
function random_video(data = '') {
    const random_videos = data.split('<EOL>');

    if (random_videos.length > 1) {
        const i = Math.floor(Math.random() * random_videos.length);
        const random_video = random_videos[i];
        return 'Random² Video: ' + random_video;
    }

    return 'Could not find a video ¯\\_(ツ)_/¯';
}
