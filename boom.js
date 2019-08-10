/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !boom $(eval boom(); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/boom.js);)
 */
function boom() {
    var result = '';
    result += randomBetween(0, 1) == 0 ? 'B' : 'b';
/*
    var n = randomBetween(2, 10);
    for (var i = 0; i < n; i++) {
        switch(randomBetween(0, 2)) {
            case 0: {
                result += 'O';
                break;
            }
            case 1: {
                result += 'o';
                break;
            }
            case 2: {
                result += '0';
                break;
            }
        }
    }
*/
    result += randomBetween(0, 1) == 0 ? 'M' : 'm';
    return result;
}

function randomBetween(min, max) {
    /* min <= result <= max */
    return Math.floor(Math.random() * (max - min + 1) + min);
}
