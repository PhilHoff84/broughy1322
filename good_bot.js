/*
 * Nightbot command:
 * !editcom -ul=moderator -cd=30 good $(eval good_bot('$(query)'); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/good_bot.js);)
 */
function good_bot(query='') {
    if (query.trim() === 'bot') {
         return 'Thank you. 🥰';
    }
    return false;
}
