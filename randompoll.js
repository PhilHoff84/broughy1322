/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randompoll $(eval poll('$(query)'); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/randompoll.js);)
 */
function poll(query = '') {
    return 'https://www.strawpoll.me/' + get_number(query);
}

function get_number(text) {
    if (!text) {
        text = '';
    }

    /* Find leading number */
    text = text.replace(/^\s*(\d+).*$/, '$1');

    var parsed = parseInt(text);
    if (isNaN(parsed) || parsed < 1 || parsed > 7) {
        return randomBetween(1, 7424995);
    }
    return randomBetween(Math.pow(10, parsed - 1), Math.pow(10, parsed));
}

function randomBetween(min, max) {
    /* min <= result < max */
    return Math.floor(Math.random() * (max - min) + min);
}
