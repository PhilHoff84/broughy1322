/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=10 !schedule $(eval schedule('$(provider)'); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/schedule.js);)
 */
function schedule(provider = 'twitch') {
    if (provider != 'discord') {
        return 'Twitch streams usually at 17:00 UK time every Wednesday & Sunday plus 09:00 UK time every Saturday. Full details are here: https://broughy.com/schedule (use !plans for games & GTA stream platform info)';
    }

    var now = new Date();
    now = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    ));

    var wed=new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + (7 - now.getUTCDay()-4) % 7,
      17,
      00
    ));
    wed.setTime(wed.getTime() + getOffset(wed) * 60 * 60 * 1000);

    var sat=new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + (7 - now.getUTCDay()-1) % 7,
      09,
      00
    ));
    sat.setTime(sat.getTime() + getOffset(sat) * 60 * 60 * 1000);

    var sun=new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + (7 - now.getUTCDay()) % 7,
      17,
      00
    ));
    sun.setTime(sun.getTime() + getOffset(sun) * 60 * 60 * 1000);

    return `Twitch streams usually start at <t:${Math.floor(wed/1000)}:t> every Wednesday, <t:${Math.floor(sat/1000)}:t> every Saturday and <t:${Math.floor(sun/1000)}:t> every Sunday. Full details are here: https://broughy.com/schedule (use !plans for games & GTA stream platform info)`;
}

function getOffset(date) {
  const rawTime = new Intl.DateTimeFormat('en-GB', {
    timeStyle: 'long',
    timeZone: 'Europe/London'
  }).format(date);

  return rawTime.endsWith('BST') ? -1 : 0;
}
