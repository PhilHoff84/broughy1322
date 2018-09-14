/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !randomsong $(eval $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random-song.js); randomSong('$(query)');)
 */
function randomSong(query) {
    /* Sanitize the filter criteria specified in the query */
    query = normalize(query);

    /* Print usage */
    if (query === 'usage') {
        return 'Usage: !randomsong (<genre> | <artist> | <year> | all)';
    }

    /* Find all songs that match the specified criteria */
    var songs = all().filter(function (song) {
        return song.matches(query);
    });

    /* Output a random song (or error message) */
    if (songs.length > 0) {
        var song = songs[Math.floor(Math.random() * songs.length)];
        return 'Random song 1/' + songs.length + ': ' + song;
    } else {
        return 'Could not find a matching random song ¯\\_(ツ)_/¯';
    }
}

function normalize(text) {
    if (!text) {
        text = '';
    }

    /* Convert to lowercase */
    text = ('' + text).toLowerCase();

    /* Remove plural */
    text = text.replace(/s\b/g, '');

    /* Remove accents */
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    /* Remove all chars that are not letters, digits or blanks */
    text = text.replace(/[^a-z0-9 ]+/g, '');

    /* Substitute common aliases with the correct criteria */
    switch (text) {
        case '': /* Print usage, if there was not even a single valid letter in the text */
        case 'help':
        case 'option':
        case 'instruction':
            return 'usage';
        default:
            return text;
    }
}

function Song(genre, artist, title, year) {
    /* Normalize the class name to match the normalized query */
    this.genre = genre;
    this.artist = artist;
    this.title = title;
    this.year = year;

    this.toString = function () {
        return genre + ' ▸ ' + artist + ' - ' + title + ' (' + year + ')';
    };

    this.matches = function (query) {
        var genre = normalize(genre);
        switch (query) {
            /* Random song from any genre and year */
            case 'all':
                return true;
            /* Random song that mactches the specified genre, artist or year */
            case year:
            case normalize(genre):
            case normalize(artist):
                return true;
            default:
                return false;
        }
    };
}

function all() {
    return [
        new Song("Alternative", "4 Non Blondes", "What's Up?", 1992),
        new Song("Alternative", "At the Drive-In", "One Armed Scissor", 2000),
        new Song("Alternative", "Cake", "Short Skirt/Long Jacket", 2001),
        new Song("Alternative", "Faith No More", "Midlife Crisis", 1992),
        new Song("Alternative", "Filter", "Hey Man, Nice Shot", 1995),
        new Song("Alternative", "Flyleaf", "Again", 2009),
        new Song("Alternative", "Flyleaf", "I'm So Sick", 2005),
        new Song("Alternative", "Foo Fighters", "Best of You", 2005),
        new Song("Alternative", "Foo Fighters", "Learn to Fly", 1999),
        new Song("Alternative", "Foo Fighters", "Long Road to Ruin", 2007),
        new Song("Alternative", "Foo Fighters", "The Feast and the Famine", 2014),
        new Song("Alternative", "Foo Fighters", "The Pretender", 2007),
        new Song("Alternative", "Foo Fighters", "Wheels", 2009),
        new Song("Alternative", "Foo Fighters", "Word Forward", 2009),
        new Song("Alternative", "Gin Blossoms", "Follow You Down", 1996),
        new Song("Alternative", "H.I.M.", "Killing Loneliness", 2005),
        new Song("Alternative", "Ida Maria", "Oh My God", 2008),
        new Song("Alternative", "Imagine Dragons", "I Bet My Life", 2015),
        new Song("Alternative", "Jane's Addiction", "Been Caught Stealing", 1990),
        new Song("Alternative", "Live", "All Over You", 1994),
        new Song("Alternative", "Marilyn Manson", "The Beautiful People", 1996),
        new Song("Alternative", "Phoenix", "Lasso", 2009),
        new Song("Alternative", "Pixies", "Wave of Mutilation", 1989),
        new Song("Alternative", "Primus", "Jerry Was a Race Car Driver", 1991),
        new Song("Alternative", "Queens of the Stone Age", "My God Is the Sun", 2013),
        new Song("Alternative", "R.E.M.", "Orange Crush", 1988),
        new Song("Alternative", "R.E.M.", "The One I Love", 1987),
        new Song("Alternative", "Radiohead", "Creep", 1993),
        new Song("Alternative", "Smashing Pumpkins", "Cherub Rock", 1993),
        new Song("Alternative", "Spacehog", "In the Meantime", 1995),
        new Song("Alternative", "Spin Doctors", "Little Miss Can't Be Wrong", 1991),
        new Song("Alternative", "Stone Temple Pilots", "Plush", 1992),
        new Song("Alternative", "Stone Temple Pilots", "Vasoline", 1994),
        new Song("Alternative", "The Flaming Lips", "Yoshimi Battles the Pink Robots Pt. 1", 2002),
        new Song("Alternative", "The Killers", "Somebody Told Me", 2004),
        new Song("Alternative", "The Killers", "When You Were Young", 2006),
        new Song("Alternative", "The Smiths", "Stop Me If You Think You've Heard This One Before", 1987),
        new Song("Alternative", "Weezer", "Say It Ain't So", 1994),
        new Song("Blues", "Brandi Carlile", "Mainstream Kid", 2015),
        new Song("Classic Rock", "Blue Öyster Cult", "(Don't Fear) The Reaper", 1975),
        new Song("Classic Rock", "Blue Öyster Cult", "Godzilla", 1977),
        new Song("Classic Rock", "Boston", "Foreplay/Long Time", 1976),
        new Song("Classic Rock", "Boston", "More Than a Feeling", 1976),
        new Song("Classic Rock", "Chicago", "25 or 6 to 4", 1970),
        new Song("Classic Rock", "Deep Purple", "Highway Star", 1972),
        new Song("Classic Rock", "Deep Purple", "Smoke on the Water", 1972),
        new Song("Classic Rock", "Elton John", "Saturday Night's Alright for Fighting", 1973),
        new Song("Classic Rock", "Fleetwood Mac", "You Make Loving Fun", 1977),
        new Song("Classic Rock", "Foreigner", "Cold as Ice", 1977),
        new Song("Classic Rock", "Golden Earring", "Radar Love", 1973),
        new Song("Classic Rock", "Heart", "Alone", 1987),
        new Song("Classic Rock", "Heart", "Kick It Out", 1977),
        new Song("Classic Rock", "John Lennon", "Imagine", 1971),
        new Song("Classic Rock", "Kiss", "Detroit Rock City", 1976),
        new Song("Classic Rock", "Pat Benatar", "Heartbreaker", 1979),
        new Song("Classic Rock", "Pat Benatar", "Hit Me With Your Best Shot", 1980),
        new Song("Classic Rock", "Paul McCartney & Wings", "Band on the Run", 1973),
        new Song("Classic Rock", "Queen", "Bohemian Rhapsody", 1975),
        new Song("Classic Rock", "Queen", "I Want It All", 1989),
        new Song("Classic Rock", "Ram Jam", "Black Betty", 1977),
        new Song("Classic Rock", "Rick Derringer", "Rock and Roll, Hoochie Koo", 1973),
        new Song("Classic Rock", "Santana (ft. Rob Thomas)", "Smooth", 1999),
        new Song("Classic Rock", "Steve Miller Band", "Fly Like an Eagle", 1976),
        new Song("Classic Rock", "Styx", "Renegade", 1978),
        new Song("Classic Rock", "The Doobie Brothers", "China Grove", 1973),
        new Song("Classic Rock", "The Doors", "Break on Through (To the Other Side)", 1967),
        new Song("Classic Rock", "The Jimi Hendrix Experience", "Crosstown Traffic", 1968),
        new Song("Classic Rock", "The Rolling Stones", "Gimme Shelter", 1969),
        new Song("Classic Rock", "The Who", "I Can See for Miles", 1967),
        new Song("Classic Rock", "The Who", "The Seeker", 1970),
        new Song("Classic Rock", "The Who", "Won't Get Fooled Again", 1971),
        new Song("Classic Rock", "Tom Petty and the Heartbreakers", "I Need to Know", 1978),
        new Song("Classic Rock", "Warren Zevon", "Werewolves of London", 1978),
        new Song("Country", "Brad Paisley ft. Keith Urban", "Start a Band", 2008),
        new Song("Country", "Little Big Town", "Little White Church", 2010),
        new Song("Emo", "Fall Out Boy", "Dead on Arrival", 2003),
        new Song("Glam", "David Bowie", "Space Oddity", 1969),
        new Song("Glam", "David Bowie", "Suffragette City", 1972),
        new Song("Glam", "Sweet (As Made Famous By)", "Ballroom Blitz", 1975),
        new Song("Glam", "T. Rex", "20th Century Boy", 1973),
        new Song("Grunge", "Alice in Chains", "A Looking in View", 2009),
        new Song("Grunge", "Alice in Chains", "Check My Brain", 2009),
        new Song("Grunge", "Alice in Chains", "No Excuses", 1994),
        new Song("Grunge", "Alice in Chains", "Rooster", 1992),
        new Song("Grunge", "Alice in Chains", "Would?", 1992),
        new Song("Grunge", "Nirvana", "In Bloom", 1991),
        new Song("Grunge", "Soundgarden", "Black Hole Sun", 1994),
        new Song("Grunge", "Soundgarden", "Superunknown", 1994),
        new Song("Hip-Hop/Rap", "Beastie Boys", "Sabotage", 1994),
        new Song("Indie Rock", "Eddie Japan", "Albert", 2015),
        new Song("Indie Rock", "Grouplove", "Tongue Tied", 2011),
        new Song("Indie Rock", "Hypernova", "Viva la Resistance", 2010),
        new Song("Indie Rock", "Lucius", "Turn it Around", 2013),
        new Song("Indie Rock", "Metric", "Combat Baby", 2003),
        new Song("Indie Rock", "Pretty Girls Make Graves", "Something Bigger, Something Brighter", 2003),
        new Song("Indie Rock", "Rilo Kiley", "Portions for Foxes", 2004),
        new Song("Indie Rock", "St. Vincent", "Birth in Reverse", 2014),
        new Song("Indie Rock", "Tegan and Sara", "The Con", 2007),
        new Song("Indie Rock", "The New Pornographers", "Electric Version", 2003),
        new Song("Indie Rock", "The Raveonettes", "Last Dance", 2009),
        new Song("Indie Rock", "White Denim", "At Night in Dreams", 2013),
        new Song("Metal", "Anthrax", "Caught in a Mosh", 1987),
        new Song("Metal", "Avenged Sevenfold", "Beast and the Harlot", 2005),
        new Song("Metal", "Avenged Sevenfold", "Hail to the King", 2013),
        new Song("Metal", "Crooked X", "Nightmare", 2008),
        new Song("Metal", "Def Leppard", "Foolin'", 1983),
        new Song("Metal", "Dio", "Rainbow in the Dark", 1983),
        new Song("Metal", "Judas Priest", "Halls of Valhalla", 2014),
        new Song("Metal", "Ozzy Osbourne", "Crazy Train", 1980),
        new Song("Metal", "Ozzy Osbourne", "Diary of a Madman", 1981),
        new Song("Metal", "Ozzy Osbourne", "Miracle Man", 1988),
        new Song("Metal", "Ozzy Osbourne", "No More Tears", 1991),
        new Song("Metal", "Ozzy Osbourne", "Over the Mountain", 1981),
        new Song("Metal", "Rammstein", "Du Hast", 1997),
        new Song("Metal", "Scorpions", "No One Like You", 1982),
        new Song("Metal", "Slipknot", "Before I Forget", 2004),
        new Song("Metal", "Soul Remnants", "Dead Black (Heart of Ice)", 2013),
        new Song("Metal", "Whitesnake", "Here I Go Again", 1987),
        new Song("Metal", "Whitesnake", "Still of the Night", 1987),
        new Song("New Wave", "Big Country", "In a Big Country", 1983),
        new Song("New Wave", "Blondie", "Heart of Glass", 1978),
        new Song("New Wave", "Devo", "Whip It", 1980),
        new Song("New Wave", "Echo & The Bunnymen", "The Killing Moon", 1984),
        new Song("New Wave", "Poni Hoax", "Antibodies", 2008),
        new Song("New Wave", "The B-52's", "Rock Lobster", 1979),
        new Song("New Wave", "The Cure", "Friday I'm In Love", 1992),
        new Song("New Wave", "The Cure", "Just Like Heaven", 1987),
        new Song("New Wave", "The Sounds", "Living in America", 2002),
        new Song("Novelty", "GLaDOS", "Still Alive", 2007),
        new Song("Nu-Metal", "Disturbed", "Prayer", 2002),
        new Song("Nu-Metal", "System of a Down", "Spiders", 1998),
        new Song("Pop-Rock", "Fall Out Boy", "Centuries", 2015),
        new Song("Pop-Rock", "Garbage", "I Think I'm Paranoid", 1998),
        new Song("Pop-Rock", "Hole", "Celebrity Skin", 1998),
        new Song("Pop-Rock", "INXS", "Need You Tonight", 1987),
        new Song("Pop-Rock", "Juanes", "Me Enamora", 2007),
        new Song("Pop-Rock", "Maná", "Oye Mi Amor", 1992),
        new Song("Pop-Rock", "OK Go", "Here It Goes Again", 2003),
        new Song("Pop-Rock", "Paramore", "Misery Business", 2007),
        new Song("Pop-Rock", "Paramore", "Still Into You", 2013),
        new Song("Pop-Rock", "Roxette", "The Look", 1988),
        new Song("Pop-Rock", "Smash Mouth", "Walking on the Sun", 1997),
        new Song("Pop-Rock", "Tears for Fears", "Everybody Wants to Rule the World", 1985),
        new Song("Pop-Rock", "The Both", "Milwaukee", 2014),
        new Song("Pop-Rock", "The Muffs", "Outer Space", 1997),
        new Song("Pop-Rock", "The Outfield", "Your Love", 1985),
        new Song("Pop-Rock", "The Police", "Don't Stand So Close to Me", 1980),
        new Song("Pop-Rock", "Tokio Hotel", "Humanoid", 2009),
        new Song("Pop-Rock", "Toto", "Africa", 1982),
        new Song("Pop-Rock", "Toto", "Hold the Line", 1978),
        new Song("Pop-Rock", "Toto", "Rosanna", 1982),
        new Song("Pop/Dance/Electronic", "Jeff Allen ft. Noelle LeBlanc and Naoko Takamoto", "Recession", 2015),
        new Song("Prog", "Coheed and Cambria", "Welcome Home", 2005),
        new Song("Prog", "Dream Theater", "Metropolis - Part 1 'The Miracle and the Sleeper'", 1992),
        new Song("Prog", "Rush", "A Passage to Bangkok", 1976),
        new Song("Prog", "Rush (As Made Famous By)", "Tom Sawyer", 1981),
        new Song("Prog", "Yes", "Owner of a Lonely Heart", 1983),
        new Song("Prog", "Yes", "Roundabout", 1971),
        new Song("Punk", "Duck & Cover", "Knock Em Down", 2014),
        new Song("Punk", "Joan Jett & The Blackhearts", "I Love Rock N' Roll", 1981),
        new Song("Punk", "Ramones", "Blitzkrieg Bop", 1976),
        new Song("Punk", "Ramones", "I Wanna Be Sedated", 1978),
        new Song("Punk", "Riverboat Gamblers", "Don't Bury Me... I'm Still Not Dead", 2006),
        new Song("Punk", "Swingin' Utters", "This Bastard's Life", 1998),
        new Song("Punk", "The Bronx", "False Alarm", 2003),
        new Song("Punk", "The Clash", "Should I Stay or Should I Go", 1982),
        new Song("Punk", "The Hives", "Main Offender", 2000),
        new Song("Punk", "Tijuana Sweetheart", "Pistol Whipped", 2012),
        new Song("R&B/Soul/Funk", "Amy Winehouse", "Rehab", 2006),
        new Song("R&B/Soul/Funk", "James Brown", "I Got You (I Feel Good) (Alternative Version)", 1974),
        new Song("R&B/Soul/Funk", "Johnny Blazes and the Pretty Boys", "Cold Clear Light", 2015),
        new Song("R&B/Soul/Funk", "Mark Ronson ft. Bruno Mars", "Uptown Funk", 2015),
        new Song("R&B/Soul/Funk", "Van Morrison", "Brown Eyed Girl", 1967),
        new Song("R&B/Soul/Funk", "WAR", "Low Rider", 1975),
        new Song("Reggae/Ska", "Bob Marley and the Wailers", "Get Up, Stand Up", 1973),
        new Song("Reggae/Ska", "The Mighty Mighty Bosstones", "The Impression That I Get", 1997),
        new Song("Rock", "Aerosmith", "Angel", 1987),
        new Song("Rock", "Aerosmith", "Back In The Saddle", 1976),
        new Song("Rock", "Aerosmith", "Crazy", 1993),
        new Song("Rock", "Aerosmith", "Cryin'", 1993),
        new Song("Rock", "Aerosmith", "Dream On (Live)", 1973),
        new Song("Rock", "Aerosmith", "Dude (Looks Like a Lady)", 1987),
        new Song("Rock", "Aerosmith", "Eat the Rich", 1993),
        new Song("Rock", "Aerosmith", "I Don't Want to Miss a Thing", 1998),
        new Song("Rock", "Aerosmith", "Janie's Got a Gun", 1989),
        new Song("Rock", "Aerosmith", "Legendary Child", 2012),
        new Song("Rock", "Aerosmith", "Livin' on the Edge", 1993),
        new Song("Rock", "Aerosmith", "Love in an Elevator", 1989),
        new Song("Rock", "Aerosmith", "Lover Alot", 2012),
        new Song("Rock", "Aerosmith", "Rag Doll", 1987),
        new Song("Rock", "Aerosmith", "Rats in the Cellar", 1976),
        new Song("Rock", "Aerosmith", "Seasons of Wither", 1974),
        new Song("Rock", "Aerosmith", "Sweet Emotion", 1975),
        new Song("Rock", "Aerosmith", "Toys in the Attic", 1975),
        new Song("Rock", "Aerosmith", "Walk This Way", 1975),
        new Song("Rock", "Aerosmith (As Made Famous By)", "Train Kept A-Rollin'", 1974),
        new Song("Rock", "Arctic Monkeys", "Arabella", 2013),
        new Song("Rock", "Audioslave", "Gasoline", 2002),
        new Song("Rock", "Audioslave", "Like a Stone", 2002),
        new Song("Rock", "Benjamin Booker", "Violent Shiver", 2014),
        new Song("Rock", "Bon Jovi", "Wanted Dead or Alive", 1986),
        new Song("Rock", "Bon Jovi", "You Give Love A Bad Name", 1986),
        new Song("Rock", "Dark Wheels", "V-Bomb", 2015),
        new Song("Rock", "Dire Straits", "Walk of Life", 1985),
        new Song("Rock", "Dover", "King George", 2001),
        new Song("Rock", "Elvis Presley", "Suspicious Minds", 1969),
        new Song("Rock", "Faith No More", "Epic", 1990),
        new Song("Rock", "Gary Clark, Jr.", "Ain’t Messin ‘Round", 2012),
        new Song("Rock", "Halestorm", "I Miss the Misery", 2012),
        new Song("Rock", "Heaven's Basement", "I Am Electric", 2013),
        new Song("Rock", "Huey Lewis and the News", "The Power of Love", 1985),
        new Song("Rock", "Jack White", "Lazaretto", 2014),
        new Song("Rock", "Jet", "Are You Gonna Be My Girl", 2003),
        new Song("Rock", "Lightning Bolt", "Dream Genie", 2015),
        new Song("Rock", "Living Colour", "Cult Of Personality", 1988),
        new Song("Rock", "Mumford & Sons", "The Wolf", 2015),
        new Song("Rock", "Nickelback", "Animals", 2005),
        new Song("Rock", "Nickelback", "Burn It to the Ground", 2008),
        new Song("Rock", "Nickelback", "Figured You Out", 2003),
        new Song("Rock", "Nickelback", "How You Remind Me", 2001),
        new Song("Rock", "Nickelback", "If Today Was Your Last Day", 2008),
        new Song("Rock", "Nickelback", "Never Again", 2001),
        new Song("Rock", "Nickelback", "Photograph", 2005),
        new Song("Rock", "Nickelback", "Rockstar", 2005),
        new Song("Rock", "Nickelback", "Someday", 2003),
        new Song("Rock", "Nickelback", "This Afternoon", 2008),
        new Song("Rock", "Nickelback", "This Means War", 2011),
        new Song("Rock", "Night Ranger", "Sister Christian", 1983),
        new Song("Rock", "Nine Inch Nails", "The Hand That Feeds", 2005),
        new Song("Rock", "Phish", "Llama", 1992),
        new Song("Rock", "Queens of the Stone Age", "Go with the Flow", 2002),
        new Song("Rock", "Queens of the Stone Age", "No One Knows", 2002),
        new Song("Rock", "Red Hot Chili Peppers", "Dani California", 2006),
        new Song("Rock", "Scandal", "The Warrior", 1984),
        new Song("Rock", "Slydigs", "Light the Fuse", 2015),
        new Song("Rock", "The Beach Boys", "Good Vibrations (Live)", 1968),
        new Song("Rock", "The Black Keys", "Fever", 2014),
        new Song("Rock", "The J. Geils Band", "Centerfold", 1981),
        new Song("Rock", "The Konks", "29 Fingers", 2005),
        new Song("Rock", "The Mother Hips", "Time We Had", 2003),
        new Song("Rock", "The Police", "Next to You", 1978),
        new Song("Rock", "The Protomen", "Light Up the Night", 2009),
        new Song("Rock", "The Strokes", "Reptilia", 2003),
        new Song("Rock", "The Vines", "Get Free", 2002),
        new Song("Rock", "The Warning", "Free Falling", 2015),
        new Song("Rock", "The White Stripes", "The Hardest Button to Button", 2003),
        new Song("Rock", "Them Crooked Vultures", "Dead End Friends", 2009),
        new Song("Rock", "Timmy and the Lords of the Underworld", "Timmy and the Lords of the Underworld", 2000),
        new Song("Rock", "U2", "Cedarwood Road", 2014),
        new Song("Rock", "U2", "I Will Follow", 1980),
        new Song("Rock", "Van Halen", "Panama", 1984),
        new Song("Rock", "Yeah Yeah Yeahs", "Maps", 2003),
        new Song("Southern Rock", ".38 Special", "Caught Up in You", 1982),
        new Song("Southern Rock", "Lynyrd Skynyrd", "Free Bird", 1973),
        new Song("Southern Rock", "Lynyrd Skynyrd", "Sweet Home Alabama (Live)", 1976),
        new Song("Southern Rock", "Lynyrd Skynyrd", "That Smell", 1977),
        new Song("Southern Rock", "Molly Hatchet", "Flirtin' with Disaster", 1979),
        new Song("Southern Rock", "Mountain (As Made Famous By)", "Mississippi Queen", 1971),
        new Song("Southern Rock", "The Outlaws (As Made Famous By)", "Green Grass and High Tides", 1975)
    ];
}
