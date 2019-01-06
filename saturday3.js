/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !saturday $(eval schedule(); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/saturday3.js);)
 */
function schedule() {
    var now = utcDate(new Date());

    var stream1 = nextStream(now);
    var what1 = nextPlatform(stream1);

    var stream2 = nextStream(nextDay(stream1));
    var what2 = nextPlatform(stream2);

    return 'Next Saturday evening stream: ' + what1 + ' | Following Saturday: ' + what2 + ' | All start at 7pm UK time';
}

function nextPlatform(date) {
    var count = 0; /* count streams since origin */
    var from = utcDate(date);
    from.setUTCDate(1);
    var to = utcDate(date);
    to.setUTCHours(0, 0, 0, 0);

    while (from <= to) {
        if (isStream(from)) {
            count++;
        }
        from = nextDay(from);
    }
    switch (count) {
        case 0:
            return 'Content Creator PS4 on YouTube';
        case 1:
            return 'Content Creator XB1 on YouTube';
        case 2:
            return 'Content Creator PC on YouTube';
        case 3:
            return 'Podcast on Twitch';
        default:
            return 'No stream!';
    }
}

function nextStream(date) {
    var i = utcDate(date);
    while (!isStream(i)) {
        i = nextDay(i);
    }
    return i; /* date of the next stream */
}

function nextDay(date) {
    return new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate() + 1,
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
    ));
}

function isStream(date) {
    return date.getUTCDay() === 6; /* Saturday */
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
