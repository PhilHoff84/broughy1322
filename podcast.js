/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !podcast $(eval countdown(); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/podcast.js);)
 */
function countdown() {
    var now = new Date();
    now = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes()
    ));

    /* podcast starts at 20:00 */
    var start = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + (7 - now.getUTCDay()) % 7,
        20));

    /* podcast ends at 22:30 */
    var end = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + (7 - now.getUTCDay()) % 7,
        22, 30));

    /* podcast just ended; fast-forward to next week */
    if (end < now) {
        start.setUTCDate(start.getUTCDate() + 7);
        end.setUTCDate(start.getUTCDate() + 7);
    }

    if (start <= now) {
        return "The next Choking Hazard Podcast will start in approximately… wait… it's happening right now!"
    } else {
        return 'The next Choking Hazard Podcast will start in approximately ' + diff(start.getTime() - now.getTime());
    }
}

function diff(difference_ms) {
    /* remove milliseconds and seconds */
    difference_ms = difference_ms / 1000;
    difference_ms = difference_ms / 60;

    var m = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var h = Math.floor(difference_ms % 24);
    var d = Math.floor(difference_ms / 24);

    var delta = [];
    if (d > 0) delta.push(d + ' day' + (d > 1 ? 's' : ''));
    if (h > 0) delta.push(h + ' hour' + (h > 1 ? 's' : ''));
    if (m > 0) delta.push(m + ' minute' + (m > 1 ? 's' : ''));

    if (delta.length === 3)
        return delta.shift() + ', ' + delta.join(' and ');

    return delta.join(', ');
}
