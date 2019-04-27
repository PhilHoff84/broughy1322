/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !schedule $(eval schedule('$(provider)', "$(urlfetch json https://docs.google.com/spreadsheets/d/1QDWpycJJFA-UAiSPIv-icJ4UZhbEmuN8wxxag83SE1c/export?exportFormat=csv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/schedule.js);)
 */
function schedule(provider='', data = '') {
    return provider + " @ " + data;
}
