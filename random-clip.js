/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomclip $(eval clip(); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-clip.js);)
 */
function clip() {

    var clips = [
        ´https://twitch.tv/broughy1322/clip/FlaccidDullBulgogiBCouch-KXHz1o0yoZESlWaV´,
        ´https://twitch.tv/broughy1322/clip/SilkySlipperyZucchiniSquadGoals´,
        ´https://twitch.tv/broughy1322/clip/EphemeralImportantYakinikuFUNgineer´,
        ´https://twitch.tv/broughy1322/clip/AbrasiveRockyIguanaFailFish´,
        ´https://twitch.tv/broughy1322/clip/AlertDullCheddarKappaPride´,
        ´https://twitch.tv/broughy1322/clip/ConfidentDeliciousSalsifyPeanutButterJellyTime´,
        ´https://twitch.tv/broughy1322/clip/ViscousLongBibimbapAliens´,
        ´https://twitch.tv/broughy1322/clip/SucculentComfortableMonkeyCharlieBitMe´,
        ´https://twitch.tv/broughy1322/clip/SlickPreciousAlligatorDatBoi´,
        ´https://twitch.tv/broughy1322/clip/SoftFunnyKaleBCWarrior´,
        ´https://twitch.tv/broughy1322/clip/KnottyHumbleBottleDoubleRainbow´,
        ´https://twitch.tv/broughy1322/clip/HealthyAgitatedSowOhMyDog´,
        ´https://twitch.tv/broughy1322/clip/TenderGleamingChamoisBrokeBack´,
        ´https://twitch.tv/broughy1322/clip/DependableGracefulStarHassaanChop´,
        ´https://twitch.tv/broughy1322/clip/RelatedSquareTofuPJSalt´,
        ´https://twitch.tv/broughy1322/clip/OddFreezingChoughSpicyBoy-LzGlZdASgVWRwufu´,
        ´https://twitch.tv/broughy1322/clip/BlightedAmazingKaleThisIsSparta-gTmanHb40l0xVkzX´,
        ´https://twitch.tv/broughy1322/clip/SweetGleamingRhinocerosDatBoi-ps7t263YBQoXh5Pu´,
        ´https://twitch.tv/broughy1322/clip/TangibleLittleFinchAliens-0rkN8Pxk2sPXJDhY´,
        ´https://twitch.tv/broughy1322/clip/ViscousHelplessSardineDogFace´,
        ´https://twitch.tv/broughy1322/clip/SoftArtsyMouseRedCoat´,
        ´https://twitch.tv/broughy1322/clip/EagerInspiringBatPlanking´,
        ´https://twitch.tv/broughy1322/clip/PatientAgreeableDadBudBlast-32Y5LhbHS6T2fGyO´,
        ´https://twitch.tv/broughy1322/clip/TenderSecretiveSamosaSaltBae´,
        ´https://twitch.tv/broughy1322/clip/SmokyStormyVampirePupper´,
        ´https://twitch.tv/broughy1322/clip/EagerPrettyCarrotSwiftRage´,
        ´https://twitch.tv/broughy1322/clip/RelatedSquareTofuPJSalt´,
        ´https://twitch.tv/broughy1322/clip/GeniusInnocentArtichokeNerfRedBlaster´,
        ´https://twitch.tv/broughy1322/clip/SpoopyReliableCarrotPartyTime´,
        ´https://twitch.tv/broughy1322/clip/AltruisticPowerfulHawk4Head´,
        ´https://twitch.tv/broughy1322/clip/BlazingSavoryCattleOptimizePrime´,
        ´https://twitch.tv/broughy1322/clip/AstuteYummyDogPeoplesChamp´,
        ´https://twitch.tv/broughy1322/clip/EnthusiasticVictoriousPassionfruitRedCoat´,
        ´https://twitch.tv/broughy1322/clip/EndearingEagerShieldBCWarrior´,
        ´https://twitch.tv/broughy1322/clip/StrangeOilyMochaMingLee´,
        ´https://twitch.tv/broughy1322/clip/OnerousAmusedPlumBleedPurple´,
        ´https://twitch.tv/broughy1322/clip/ShortCooperativeHeronTheTarFu´,
        ´https://twitch.tv/broughy1322/clip/TentativeRamshackleClamKevinTurtle´,
        ´https://twitch.tv/broughy1322/clip/ResourcefulWiseAlfalfaWholeWheat´,
        ´https://twitch.tv/broughy1322/clip/StupidDreamyLaptopOpieOP-sX5jUZBHT1BUZBas´,
        ´https://twitch.tv/broughy1322/clip/JazzyCooperativePterodactylOSfrog´,
        ´https://twitch.tv/broughy1322/clip/PreciousWiseTeaGrammarKing´,
        ´https://twitch.tv/broughy1322/clip/HealthyDirtySamosaOMGScoots´,
        ´https://twitch.tv/broughy1322/clip/RealSourSquirrelSpicyBoy´,
        ´https://twitch.tv/broughy1322/clip/JazzyPlausibleCakeFeelsBadMan´,
        ´https://twitch.tv/broughy1322/clip/AnnoyingCarelessOrangeAMPEnergyCherry´,
        ´https://twitch.tv/broughy1322/clip/GloriousKindWaterRalpherZ´,
        ´https://twitch.tv/broughy1322/clip/HelplessCallousClintBatChest´,
        ´https://twitch.tv/broughy1322/clip/StrongSarcasticTildePupper´,
        ´https://twitch.tv/broughy1322/clip/DifficultTemperedLardPraiseIt´,
        ´https://twitch.tv/broughy1322/clip/EnjoyableImportantHerringCclamChamp´,
        ´https://twitch.tv/broughy1322/clip/CoySlipperyBaboonFUNgineer´,
        ´https://twitch.tv/broughy1322/clip/DarlingSpoopyTurtlePastaThat´,
        ´https://twitch.tv/broughy1322/clip/SourBoxyCaribouHeyGuys´,
        ´https://twitch.tv/broughy1322/clip/CovertRefinedGiraffeLitFam´,
        ´https://twitch.tv/broughy1322/clip/DeterminedDirtyTaroCorgiDerp´,
        ´https://twitch.tv/broughy1322/clip/PolishedRealRaccoonPartyTime´,
        ´https://twitch.tv/broughy1322/clip/HelplessAstuteBorkOSkomodo´,
        ´https://twitch.tv/broughy1322/clip/AstutePuzzledChipmunkPanicBasket´,
        ´https://twitch.tv/broughy1322/clip/HyperFitOkapiResidentSleeper´,
        ´https://twitch.tv/broughy1322/clip/SullenSavageKoupreyLitty´,
        ´https://twitch.tv/broughy1322/clip/SavageMistySangPeoplesChamp´,
        ´https://twitch.tv/broughy1322/clip/MistyCuriousAntDoggo´,
        ´https://twitch.tv/broughy1322/clip/ShyAwkwardHorseDoritosChip´,
        ´https://twitch.tv/broughy1322/clip/CoweringScrumptiousPlumberCoolCat´,
        ´https://twitch.tv/broughy1322/clip/PluckyGoldenPuddingNomNom´,
        ´https://twitch.tv/broughy1322/clip/ShortCooperativeHeronTheTarFu´,
        ´https://twitch.tv/broughy1322/clip/HeadstrongMuddyClipzKevinTurtle´,
    ];

    var i = Math.floor(Math.random() * clips.length);
    return 'Random clip: ' + clips[i];
}
