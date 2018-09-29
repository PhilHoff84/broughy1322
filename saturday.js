/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !saturday $(eval schedule(new Date(), 0, 0); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/saturday.js);)
 */
function schedule(date, missedStreams, missedPlatforms) {
    date.setUTCHours(date.getUTCHours() + 5, 0, 0, 0);

    var stream1 = nextStream(date);
    var where1 = nextPlatform(stream1, missedStreams, missedPlatforms);

    var stream2 = nextStream(nextDay(stream1));
    var where2 = nextPlatform(stream2, missedStreams, missedPlatforms);
    return 'Next Saturday evening stream: ' + where1 + '  | Following Saturday: ' + where2;
}

function nextPlatform(date, streamOffset, platformOffset) {
    var count = 0; /* count streams since origin */
    var from = new Date(Date.UTC(2018, 7, 11));
    var to = new Date(date);
    to.setUTCHours(0, 0, 0, 0);
    while (from <= to) {
        if (isStream(from)) {
            count++;
        }
        nextDay(from);
    }
    if ((count + streamOffset) % 2 === 0) {
        return 'Podcast on Twitch';
    }
    var platform = ['Content Creator XB1 on YouTube', 'Content Creator PC on YouTube', 'Content Creator PS4 on YouTube'];
    return platform[(Math.floor(count / 2) + streamOffset + platformOffset) % platform.length];
}

function nextStream(date) {
    var i = new Date(date);
    while (!isStream(i)) {
        nextDay(i);
    }
    return i; /* date of the next stream */
}

function nextDay(date) {
    return date.setUTCDate(date.getUTCDate() + 1);
}

function isStream(date) {
    return date.getUTCDay() === 6; /* Saturday */
}
