/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !platform $(eval schedule(); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/platform3.js);)
 */
function schedule() {
    var now = utcDate(new Date());

    if (now.getUTCDay() === 0) {
        /* time-travel back to Saturday on Sunday, to keep the output stable */
        now = nextDay(now, -1);
    }

    var stream1 = nextStream(now, isSaturdayOrSunday);
    var satMorn = nextRegular(stream1);

    var stream3 = nextStream(nextDay(stream1), isSaturdayOrSunday);
    var sunday = nextRegular(stream3);

    var stream2 = nextStream(now, isSaturday);
    var satEve = nextSpecial(stream2);

    return "This Week's GTA Streams - " +
        "Sat Morn: " + satMorn + " | " +
        "Sat Eve: " + satEve + " | " +
        "Sun: " + sunday;
}

function nextRegular(date) {
    var offset = 5; /* number of missed streams */
    var count = 0; /* count streams since origin */
    var from = new Date(Date.UTC(2019, 0, 1));
    var to = utcDate(date);
    to.setUTCHours(0, 0, 0, 0);

    while (from <= to) {
        if (isSaturdayOrSunday(from)) {
            count++;
        }
        from = nextDay(from);
    }
    var platform = ['XB1', 'PS4', 'PC', 'XB1', 'PS4', 'FiveM'];
    var max = to.getUTCDay() === 0 ? platform.length : platform.length / 2;
    return platform[(count + offset) % max];
}

function nextSpecial(date) {
    var count = 0; /* count streams since origin */
    var from = utcDate(date);
    from.setUTCDate(1);
    var to = utcDate(date);
    to.setUTCHours(0, 0, 0, 0);

    while (from <= to) {
        if (isSaturday(from)) {
            count++;
        }
        from = nextDay(from);
    }
    switch (count) {
        case 0:
            return 'PS4';
        case 1:
            return 'XB1';
        case 2:
            return 'PC';
        /* case 3: return 'Podcast'; */
        default:
            return 'None';
    }
}

function nextStream(date, callback) {
    var i = utcDate(date);
    while (!callback(i)) {
        i = nextDay(i);
    }
    return i; /* date of the next stream */
}

function nextDay(date, offset = 1) {
    return new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate() + offset,
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
    ));
}

function isSaturday(date) {
    return date.getUTCDay() === 6; /* Saturday */
}

function isSaturdayOrSunday(date) {
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
