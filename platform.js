/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !platform $(eval schedule(0); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/platform.js);)
 */
function schedule(missedStreams) {
    var now = new Date();
    now = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes()
    ));

    var stream1 = nextStream(now);
    var when1 = stream1.getUTCDay() !== 0 ? 'Saturday' : 'Sunday';
        when1 += " " + nth(stream1.getUTCDate());
    var where1 = nextPlatform(stream1, missedStreams);

    var stream2 = nextStream(nextDay(stream1));
    var when2 = stream2.getUTCDay() !== 0 ? 'Saturday' : 'Sunday';
        when2 += " " + nth(stream2.getUTCDate());
    var where2 = nextPlatform(stream2, missedStreams);
    return 'Upcoming GTA Streams & Platforms: ' + when1 + ' on ' + where1 + ', ' + when2 + ' on ' + where2;
}

function nextPlatform(date, offset) {
    var count = 0; /* count streams since origin */
    var from = new Date(Date.UTC(2018, 7, 11));
    var to = new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
    ));
    while(from <= to) {
        if(isStream(from)) {
            count++;
        }
        nextDay(from);
    }
    var platform = ['XB1', 'PC', 'PS4'];
    return platform[(count + offset) % platform.length];
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
    return date.getUTCDay() % 6 === 0; /* Saturday or Sunday */
}

function nth(n) {
    return n+(['st','nd','rd'][((n+90)%100-10)%10-1]||'th');
}
