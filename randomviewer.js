/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomviewer $(eval viewer(`$(urlfetch json http://tmi.twitch.tv/group/user/$(channel)/chatters)`); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/randomviewer.js);)
 */
function viewer(text = {}) {
    try {
        chatters = JSON.parse(text).chatters;
        viewers = chatters.viewers.filter(viewer => `$(user)`.toLowerCase() != viewer.toLowerCase());

        if (viewers.length) {
            return `Thanks for watching ${viewers[Math.floor(Math.random()*viewers.length)} broughyLove`;
        }
        return "No viewer";
    } catch(e) {
        return `Couldn't fetch the list of viewers: ${e}: ${r}`.slice(0,400);
    }
}
