/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !saturday $(eval schedule(0, 0); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/saturday.js);)
 */
function schedule(missedStreams, missedPlatforms) {
    var date = new Date();
    date = new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours() + 1,
        date.getUTCMinutes(),
        date.getUTCSeconds()
    ));

    var stream1 = nextStream(date);
    var what1 = nextPlatform(stream1, missedStreams, missedPlatforms);

    var stream2 = nextStream(nextDay(stream1));
    var what2 = nextPlatform(stream2, missedStreams, missedPlatforms);
    return 'Next Saturday evening stream: ' + what1 + '  | Following Saturday: ' + what2;
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
    var platform = ['XB1', 'PC', 'PS4'];
    return 'Content Creator ' + platform[(Math.floor(count / 2) + streamOffset + platformOffset) % platform.length] + ' on YouTube';
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
