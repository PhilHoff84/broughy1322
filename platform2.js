/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !platform $(eval schedule(); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/platform2.js);)
 */
function schedule() {
    var now = utcDate(new Date());

    var stream1 = nextStream(now);
    var when1 = stream1.getUTCDay() !== 0 ? 'Saturday' : 'Sunday';
    /* when1 += " " + nth(stream1.getUTCDate()); */
    var where1 = nextPlatform(stream1);

    var stream2 = nextStream(nextDay(stream1));
    var when2 = stream2.getUTCDay() !== 0 ? 'Saturday' : 'Sunday';
    /* when2 += " " + nth(stream2.getUTCDate()); */
    var where2 = nextPlatform(stream2);
    return 'Upcoming GTA Streams & Platforms: ' + when1 + ' on ' + where1 + ', ' + when2 + ' on ' + where2;
}

function nextPlatform(date) {
    var offset = 5; /* number of missed streams */
    var count = 0; /* count streams since origin */
    var from = new Date(Date.UTC(2019, 0, 1));
    var to = utcDate(date);
    to.setUTCHours(0, 0, 0, 0);

    while (from <= to) {
        if (isStream(from)) {
            count++;
        }
        from = nextDay(from);
    }
    var platform = ['XB1', 'PS4', 'PC', 'XB1', 'PS4', 'FiveM'];
    var max = to.getUTCDay() === 0 ? platform.length : platform.length / 2;
    return platform[(count + offset) % max];
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
    return date.getUTCDay() % 6 === 0; /* Saturday or Sunday */
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

/*
function nth(n) {
    return n + (['st', 'nd', 'rd'][((n + 90) % 100 - 10) % 10 - 1] || 'th');
}
*/
