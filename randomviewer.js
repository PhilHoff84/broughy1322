/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomviewer $(eval viewer('$(user)', '$(urlfetch json http://tmi.twitch.tv/group/user/broughy1322/chatters)'); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/randomviewer.js);)
 */
function viewer(user = '', text = '') {
    try {        
        user = user.toLowerCase();
        
        if (user==='broughy1322') {
            return "Paint your Dubsta 2 chrome, if you want this to stop broughyLove";
        }
        
        var chatters = JSON.parse(text).chatters;
        var viewers = chatters.viewers.concat(chatters.moderators).filter(function (viewer) {
            return viewer.toLowerCase() != user && viewer != 'nightbot' && viewer != 'streamelements';
        });

        if (viewers.length) {
            return "Thanks for watching @" + viewers[Math.floor(Math.random() * viewers.length)] + " broughyLove - Please remind @Broughy1322 to paint his Dubsta 2 chrome!";
        }
        return "No viewer"
    } catch(e) {
        return ("Couldn't fetch the list of viewers: " + e + ": " + text).slice(0, 400);
    }
}
