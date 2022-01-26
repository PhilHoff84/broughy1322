/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randommeme $(eval meme("$(urlfetch json https://docs.google.com/spreadsheets/d/1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0/export?format=tsv&id=1xB2vwnA4CeqQcR6bO1tIvTjInVeodwB4nnYjrArQDF0)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-meme.js);)
 */
function meme(data = '') {
    const memes = data.split('<EOL>');

    if (memes.length > 1) {
        const i = Math.floor(Math.random() * memes.length);
        const meme = memes[i];
        return 'Random Meme: ' + meme;
    }

    return 'Could not find a meme ¯\\_(ツ)_/¯';
}
tsv=`"Top 5 is always possible" - Broughy1322 (2017)
<EOL>HE COMES! The keyboard warrior! HE COMES! The killer in the night! HE COMES! Car number 86!
<EOL>Broughy is officially a "popular streamer " confirmed by BBC https://twitter.com/Broughy1322/status/1153663497869373440
<EOL>Britney! https://i.imgur.com/ARemgTJ.jpg
<EOL>You missed BroughyCon™? Sign up for the next one at https://broughy.com/broughycon
<EOL>The scumbag song https://youtu.be/vDe48JDJs0s
<EOL>"EYE CHOUZE DA JESTA BHUTT I RATHA HAVE DA KARBONASZI" - Rockstar Dev (2015) https://youtu.be/LGOKVjrklrA
<EOL>"Clean lap next lap" - Broughy1322 (Always)
<EOL>"Holy mother of cow" - Broughy1322 (2018)
<EOL>The official crew song https://youtube.com/watch?v=4fndeDfaWCg
<EOL>Be a dick get kicked
<EOL>Might be a good time to check out the dispensary. Jed said Charlotte wants to talk to me.
<EOL>https://www.twitlonger.com/show/n_1sp9c4g
<EOL>"The massacro is actually number one the problem is that most people (not even broughy) can properly control its cornering because it requires slight drifting" - Solo Phats (2017)
<EOL>"I'll happily race you on forza 3 to show you how 'bad' I am at driving" - Broughy (2010)
<EOL>"Pretty hectic race that one" - Broughy1322 (2014)
<EOL>The fastest Horses in Red Dead Redemption around a circuit https://youtu.be/EUI-HRImyEM
<EOL>"How about some tissues for your issues?" - Zearxy (2016)
<EOL>Listen Right https://i.gyazo.com/63f44310c89ebebfdf21d04be6e76447.jpg
<EOL>"BWABWABWABWABWA" - Handbrake Boost (2013)
<EOL>Current Status of Old Chair https://i.imgur.com/qamSEIJ.gif
<EOL>Broughy has finally sold out! Visit https://broughy.com/onlyfans for HAWT broughySenpai action!
<EOL>"Who races in GTA? Go play Forza loser you take this way too seriously. GTA is for LOLs not racing lmao" - Some YT Commenter (Some Year)
<EOL>PICNIC - Problem In Chair Not In Checkpoint broughySmart
<EOL>"I HOPE TO SEE YAAA!" - Broughy1322 (2016)
<EOL>oh senpai https://youtu.be/9EUb5WMteeo
<EOL>"I'll be back in a sex" - Broughy1322 (2016)
<EOL>#StraightMixtape #ImReallyAdequate https://youtube.com/watch?v=8L7yexrxAVo - RDT (2014)
<EOL>"I just need to not be stupid but it's so difficult" - Broughy1322 (2019)
<EOL>Multi-Taco Endurance Championship https://youtu.be/8Pq287h4p0U
<EOL>It's time for some tea https://m.soundcloud.com/timhassler/thank-you-for-the-tea/s-FimvX
<EOL>Teenage Broughy - Video: https://youtu.be/v4Vx6Bf9vZg?t=3m25s / Pictures: https://i.gyazo.com/ba9252c194e445f673cb1918928fcc89.png
<EOL>Broughy & Zearxy sitting in a tree...S.C.U.M.B.A.G.
<EOL>"Adam... One thing you gotta learn about being the man in the relationship: You can be right or you can be happy. Do as you're told" - A2DaJ (2016)
<EOL>Zearxy Drinking Game - 1. Just drink every time broughyDrunk`
console.log(meme(tsv));