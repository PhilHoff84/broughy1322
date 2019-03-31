/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !podcast $(eval countdown(); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/podcast.js);)
 */
function countdown() {
    var now = utcDate(new Date());

    var begin = utcDate(now);
    begin.setUTCDate(1); /* first day of the month */
    var offset = 7 - begin.getUTCDay();

    /* podcast starts at 19:00 UTC*/
    var start = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        7 * 3 + (offset),
        18));

    /* podcast ends at 21:30 UTC */
    var end = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        7 * 3 + (offset),
        20, 30));

    if (start <= now && now <= end) {
        return "The next Choking Hazard Podcast will start in approximately… wait… it's happening right now!"
    } else if (now <= start && now <= end) {
        return 'The next Choking Hazard Podcast will start in approximately ' + diff(start.getTime() - now.getTime());
    } else {
        /* this month's podcast already ended; fast-forward to next month */
        start.setUTCDate(start.getUTCDate() + 4 * 7);
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

function utcDate(date) {
    return new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
    ));
}
