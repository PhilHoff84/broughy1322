/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !roles $(eval roles('$(provider)'); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/roles.js);)
 */
function roles(provider='') {
  if (provider === 'discord') {
    return 'Please read the instructions in the #welcome channel to claim your Patreon, YouTube, Twitch or Regular role.'
  }
  return '';
}
