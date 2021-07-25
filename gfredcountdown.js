/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !gfredcountdown $(eval countdown(); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/gfredcountdown.js);)
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

    /* Gfred starts at 21:15 */
    var start = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + (7 - now.getUTCDay()) % 7,
        20,
        15));

    /* Gfred ends at 22:00 */
    var end = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + (7 - now.getUTCDay()) % 7,
        20,
        45));
    
    /* Gfred just ended; fast-forward to next week / season */
    while (end < now || end < new Date(Date.UTC(2021, 8))) {
        start.setUTCDate(start.getUTCDate() + 7);
        end.setUTCDate(end.getUTCDate() + 7);
    }

    if (start <= now) {
        return "The next live Gfred race will start in approximately… wait… it's happening right now!"
    } else {
        return 'The next live Gfred race will start in approximately ' + diff(start.getTime() - now.getTime());
    }
}

function diff(difference_ms) {
    /* 1 day in milliseconds */
    var one_day = 1000 * 60 * 60 * 24;

    /* remove milliseconds */
    difference_ms = difference_ms / 1000;
    var s = Math.floor(difference_ms % 60);
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

    return delta.join(' and ');
}
