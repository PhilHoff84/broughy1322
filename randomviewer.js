/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomviewer $(eval viewer('$(user)', '$(urlfetch json http://tmi.twitch.tv/group/user/broughy1322/chatters)'); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/randomviewer.js);)
 */
function viewer(user = '', text = '') {
    try {
        user = user.toLowerCase();
        var viewers = JSON.parse(text).chatters.viewers.filter(function (viewer) {
            return viewer.toLowerCase()) != user;
        });
        return viewers.length;

        if (viewers.length) {
            return "Thanks for watching " + viewers[Math.floor(Math.random() * viewers.length)] + " broughyLove";
        }
        return "No viewer";*/
    } catch(e) {
        return ("Couldn't fetch the list of viewers: " + e + ": " + text).slice(0, 400);
    }
}
