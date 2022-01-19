/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomclip $(eval clip(); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-clip.js);)
 */
function clip() {

    var clips = [
        `Top 5 is always possible - Broughy1322 (2017)`,
        `HE COMES! The keyboard warrior! HE COMES! The killer in the night! HE COMES! Car number 86!`,
        `Broughy is officially a "popular streamer " confirmed by BBC. https://twitter.com/Broughy1322/status/1153663497869373440`,
        `https://i.imgur.com/ARemgTJ.jpg`,
        `You missed BroughyCon™? Sign up for the next one at https://broughy.com/broughycon`,
        `The scumbag song: https://youtu.be/vDe48JDJs0s`,
        `EYE CHOUZE DA JESTA, BHUTT I RATHA HAVE DA KARBONASZI - Rockstar Dev (2015) https://youtu.be/LGOKVjrklrA`,
        `Clean lap next lap - Broughy1322 (Always)`,
        `Holy mother of cow'- Broughy1322 (2018)`,
        `The official crew song: https://youtube.com/watch?v=4fndeDfaWCg`,
        `Be a dick get kicked`,
        `Might be a good time to check out the dispensary. Jed said Charlotte wants to talk to me.`,
        `https://www.twitlonger.com/show/n_1sp9c4g`,
        `The massacro is actually number one, the problem is that most people (not even broughy) can properly control its cornering because it requires slight drifting - Solo Phats (2017)`,
        `I'll happily race you on forza 3 to show you how "bad" I am at driving - Broughy1322 (2010)`,
        `Pretty hectic race that one - Broughy1322 (2014)`,
        `Here is the fastest Horses in Red Dead Redemption around a circuit: https://youtu.be/EUI-HRImyEM`,
        `How about some tissues for your issues?`,
        `https://i.gyazo.com/63f44310c89ebebfdf21d04be6e76447.jpg`,
        `BWABWABWABWABWA - Handbrake Boost (2013)`,
        `Current Status of Old Chair: https://i.imgur.com/qamSEIJ.gif`,
        `Broughy has finally sold out! Visit https://broughy.com/onlyfans for HAWT broughySenpai action!`,
        `Who races in GTA? Go play Forza loser, you take this way too seriously. GTA is for LOLs not racing lmao - Some YT Commenter (Some Year)`,
        `PICNIC - Problem In Chair, Not In Checkpoint broughySmart`,
        `I HOPE TO SEE YAAA! - Broughy1322 (2016)`,
        `oh senpai https://youtu.be/9EUb5WMteeo`,
        `I'll be back in a sex - Broughy1322 (2016)`,
        `"#StraightMixtape #ImReallyAdequate https://youtube.com/watch?v=8L7yexrxAVo - RDT (2014)`,
        `I just need to not be stupid, but it's so difficult - Broughy1322 (2019)`,
        `https://youtu.be/8Pq287h4p0U`,
        `It's time for some tea https://m.soundcloud.com/timhassler/thank-you-for-the-tea/s-FimvX`,
        `Teenage Broughy - Video: https://youtu.be/v4Vx6Bf9vZg?t=3m25s / Pictures: https://i.gyazo.com/ba9252c194e445f673cb1918928fcc89.png`,
        `Broughy & Zearxy sitting in a tree...S.C.U.M.B.A.G.`,
        `Adam... One thing you gotta learn about being the man in the relationship: You can be right, or you can be happy. Do as you're told - A2DaJ (2016)`,
        `Zearxy Drinking Game - 1. Just drink every time broughyDrunk`,
    ];

    var i = Math.floor(Math.random() * clips.length);
    return 'Random Clip: ' + clips[i];
}
