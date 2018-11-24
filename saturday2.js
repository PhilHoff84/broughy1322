/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !saturday $(eval schedule(0, 0); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/saturday2.js);)
 */
function schedule(missedStreams, missedPlatforms) {
    var now = utcDate(new Date());

    var stream1 = nextStream(now);
    var what1 = nextPlatform(stream1, missedStreams, missedPlatforms);

    var stream2 = nextStream(nextDay(stream1));
    var what2 = nextPlatform(stream2, missedStreams, missedPlatforms);

    if (isVacationBetween(now, stream1)) {
        return 'Next Saturday evening stream: No stream! | Following Saturday: ' + what2 + ' | All start at 7pm UK time';
    } else if (isVacationBetween(stream1, stream2)) {
        return 'Next Saturday evening stream: ' + what1 + ' | Following Saturday: No stream! | All start at 7pm UK time';
    }
    return 'Next Saturday evening stream: ' + what1 + ' | Following Saturday: ' + what2 + ' | All start at 7pm UK time';
}

function nextPlatform(date, streamOffset, platformOffset) {
    var count = 0; /* count streams since origin */
    var from = new Date(Date.UTC(2018, 7, 11));
    var to = utcDate(date);
    to.setUTCHours(0, 0, 0, 0);

    while (from <= to) {
        if (isStream(from)) {
            count++;
        }
        from = nextDay(from);
    }

    if ((count + streamOffset) % 4 === 0) {
        return 'Podcast on Twitch';
    }
    var platforms = ['XB1', 'PC', 'PS4'];
    var platform = platforms[(count - Math.floor(count / 4) + streamOffset + platformOffset) % platforms.length];
    return 'Content Creator ' + platform + ' on YouTube';
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
    return date.getUTCDay() === 6 /* Saturday */ && date.getUTCDate() <= 4 * 7 /* except the 5th Saturday in a month */;
}

function isVacationBetween(from, to) {
    var i = utcDate(from);
    while (i <= to) {
        if (i.getUTCDay() === 6 /* Saturday */ && i.getUTCDate() > 4 * 7 /* only 5th Saturday in a month */) {
            return true;
        }
        i = nextDay(i);
    }
    return false;
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

/*function nth(n) {
    return n + (['st', 'nd', 'rd'][((n + 90) % 100 - 10) % 10 - 1] || 'th');
}*/
