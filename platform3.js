/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !platform $(eval schedule(1); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/platform3.js);)
 */
function schedule(offset) {
    var now = utcDate(new Date());
    if (typeof arguments === 'object' && arguments.length === 1 && arguments[0] instanceof Date) {
        now = utcDate(arguments[0]);
    }

    if (!offset) { /* conveniently move streams fordward/backwards */
        offset = 0;
    }
    now = nextDay(now, offset * 7);

    if (now.getUTCDay() === 0) {
        /* time-travel back to Saturday on Sunday, to keep the output stable */
        now = nextDay(now, -1);
    }

    var stream1 = nextStream(now, isSaturday || isSunday);
    var satMorn = nextRegular(stream1);

    var stream3 = nextStream(nextDay(stream1), isSunday || isSunday);
    var sunday = nextRegular(stream3);

    var stream2 = nextStream(now, isSaturday);
    var satEve = nextSpecial(stream2);

    return "This Week's GTA Streams - " +
        "Sat Morn: " + satMorn + " | " +
        "Sat Eve: " + satEve + " | " +
        "Sun: " + sunday;
}

function nextRegular(date) {
    var offset = -1; /* number of missed streams */
    var saturdays = 0; /* count Saturdays since origin */
    var sundays = 0; /* count Sundays since origin */
    var from = new Date(Date.UTC(2019, 0, 1));
    var to = utcDate(date);
    to.setUTCHours(0, 0, 0, 0);

    while (from <= to) {
        if (isSaturday(from)) {
            saturdays++;
        } else if (isSunday(from)) {
            sundays++;
        }
        from = nextDay(from);
    }

    if (to.getUTCDay() === 6) { /* Saturday */
        var saturday = ['XB1', 'PC & FiveM', 'PS4', 'XB1 & FiveM', 'PC', 'PS4'];
        return saturday[(saturdays + offset) % saturday.length];
    } else { /* Sunday */
        var sunday = ['PS4', 'XB1', 'PC', 'PS4', 'XB1', 'FiveM'];
        return sunday[(sundays + offset) % sunday.length];
    }
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

function isSunday(date) {
    return date.getUTCDay() === 0; /* Sunday */
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
