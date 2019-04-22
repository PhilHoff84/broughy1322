/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !platform $(eval schedule('$(query)', -1); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/platform4.js);)
 */
function schedule(query = '', offset = 0) {
    var now = utcDate(new Date());
    if (typeof arguments === 'object' && arguments.length === 1 && arguments[0] instanceof Date) {
        now = utcDate(arguments[0]);
    }

    /* conveniently move streams forward/backwards by 'offset' weeks */
    query = normalize(query);
    if (query === 'next') {
        offset++;
    }
    offset = offset * 7;
    now = nextDay(now, offset);

    if (now.getUTCDay() === 0) {
        /* time-travel back to Saturday on Sunday, to keep the output stable */
        now = nextDay(now, -1);
    }

    var stream1 = nextStream(now, isSaturday || isSunday);
    var satMorn = nextRegular(stream1);

    var stream3 = nextStream(nextDay(stream1), isSunday || isSunday);
    var sunday = nextRegular(stream3);

    var stream2 = nextStream(now, isSaturday);
    var satEve = nextSpecial(stream2, offset);

    return "q=" + query +"; o="+ offset + "; Week's GTA Streams - " +
        "Sat Morn: " + satMorn + " | " +
        "Sat Eve: " + satEve + " | " +
        "Sun: " + sunday;
}


function normalize(text) {
    if (!text) {
        text = '';
    }

    /* Convert to lowercase */
    text = text.toLowerCase();

    /* Remove plural */
    text = text.replace(/s\b/g, '');

    /* Remove accents */
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    /* Remove all chars that are not letters */
    text = text.replace(/[^a-z]+/g, '');
    
    /* Remove everything behind '@' */
    text = text.replace(/\s*@.*/, '');

    return text;
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

function nextSpecial(date, offset = 0) {
    var count = 0 - offset; /* count streams since origin */
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
