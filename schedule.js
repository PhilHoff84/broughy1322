/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !schedule $(eval schedule('$(provider)', "$(urlfetch json https://docs.google.com/spreadsheets/d/10ahpRz_Q4aFSOMtacIZVJD3Urd1MlFDwi_KcdDrC6mc/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/schedule.js);)
 */
function schedule(provider='', data = '') {
    if (provider === 'twitch') {
        var rows = data.split("   ");
        return (" • " + rows[0] + " • " + rows[1]).replace(/\t/g, ' | ');
    }

    return 'Twitch streams start at 18:00 UK time every Wednesday & Sunday plus 09:00 UK time every Saturday. '
         + 'Full details are here: http://broughy.com/schedule '
         + '(use !platform for next GTA stream platform info)';
}
