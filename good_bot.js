/*
 * Nightbot command:
 * !editcom -ul=moderator -cd=30 good $(eval good_bot('$(query)'); $(urlfetch json https://raw.githubusercontent.com/MarkVerstappen/BigRigTravels/master/good_bot.js);)
 */
function good_bot(query='') {
    if (query.trim() === 'bot') {
         return 'Thank you. 🥰';
    }
    return false;
}
