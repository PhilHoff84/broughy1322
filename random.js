/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=30 !random $(eval $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/random.js); randomVehicle('$(query)');)
 */
function randomVehicle(query) {
    /* Sanitize the filter criteria specified in the query */
    query = normalize(query);

    /* Print usage */
    if (query === 'usage') {
        return 'Usage: !random (<class> | car | bike | land | air | sea | all [raceable])';
    }

    /* Find all vehicles that match the specified criteria */
    var vehicles = all().filter(function (vehicle) {
        return vehicle.matches(query);
    });

    /* Output a random vehicle (or error message) */
    if (vehicles.length > 0) {
        var vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        return 'Random vehicle 1/' + vehicles.length + ': ' + vehicle;
    } else {
        return 'Could not find a matching random vehicle ¯\\_(ツ)_/¯';
    }
}

function normalize(text) {
    if (!text) {
        text = '';
    }

    /* Convert to lowercase */
    text = text.toLowerCase();

    /* Remove plural */
    text = text.replace(/s\b/g, '');

    /* Remove accents */
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    /* Remove all chars that are not letters */
    text = text.replace(/[^a-z]+/g, '');

    /* Substitute common aliases with the correct criteria */
    switch (text) {
        case '': /* Print usage, if there was not even a single valid letter in the text */
        case 'help':
        case 'option':
        case 'instruction':
            return 'usage';
        case 'bicycle':
            return 'cycle';
        case 'heli':
            return 'helicopter';
        case 'airplane':
            return 'plane';
        case 'sportclassic':
        case 'sportsclassic':
            return 'classic';
        case 'utiliti':
        case 'utilitie':
            return 'utility';
        case 'raceable':
        case 'allraceable':
            return 'all raceable';
        default:
            return text;
    }
}

function Vehicle(_clazz, _name, _availability) {
    /* Normalize the class name to match the normalized query */
    this._clazz = _clazz;
    this._name = _name;
    this._availability = !!_availability ? _availability : 'none';

    this.toString = function () {
        var result = _clazz + ' ▸ ' + _name;
        switch (_availability) {
            case 'regular':
                return result;
            case 'transform':
                return result + ' [transform race only]';
            default:
                return result + ' [not raceable]';
        }
    };

    this.matches = function (query) {
        var clazz = normalize(_clazz);
        switch (query) {
            /* Random raceable land vehicle that's not in motorcycles or cycles class */
            case 'car':
                return _availability === 'regular' && (
                    clazz !== 'boat' &&
                    clazz !== 'plane' &&
                    clazz !== 'helicopter' &&
                    clazz !== 'cycle' &&
                    clazz !== 'motorcycle'
                );
            /* Random raceable motorcycle or cycle */
            case 'bike':
                return _availability === 'regular' && (clazz === 'motorcycle' || clazz == 'cycle');
            /* Random car, bike, or cycle (whether raceable or not) */
            case 'land':
                return clazz !== 'boat' && clazz !== 'plane' && clazz !== 'helicopter';
            /* Random plane or helicopter (whether raceable or not) */
            case 'air':
                return clazz === 'plane' || clazz === 'helicopter';
            /* Random boat (whether raceable or not) */
            case 'sea':
            case 'water':
                return clazz === 'boat';
            /* Random vehicle from any class (whether raceable or not) */
            case 'all':
                return true;
            /* Random raceable vehicle from any class */
            case 'all raceable':
                return _availability === 'regular';
            /* Random raceable vehicle that's in the specified class */
            default:
                return _availability === 'regular' && clazz === query;
        }
    };
}

function all() {
    return [
        new Vehicle("Boats", "Dinghy", "regular"),
        new Vehicle("Boats", "Jetmax", "regular"),
        new Vehicle("Boats", "Kraken"),
        new Vehicle("Boats", "Marquis", "transform"),
        new Vehicle("Boats", "Police Predator", "transform"),
        new Vehicle("Boats", "Seashark", "regular"),
        new Vehicle("Boats", "Speeder", "regular"),
        new Vehicle("Boats", "Squalo", "regular"),
        new Vehicle("Boats", "Submersible"),
        new Vehicle("Boats", "Suntrap", "regular"),
        new Vehicle("Boats", "Toro", "regular"),
        new Vehicle("Boats", "Tropic", "regular"),
        new Vehicle("Boats", "Tug", "transform"),
        new Vehicle("Commercial", "Hauler Custom"),
        new Vehicle("Commercial", "Phantom Custom"),
        new Vehicle("Commercial", "Phantom Wedge", "transform"),
        new Vehicle("Commercial", "Benson", "transform"),
        new Vehicle("Commercial", "Phantom", "transform"),
        new Vehicle("Commercial", "Stockade", "transform"),
        new Vehicle("Commercial", "Packer", "transform"),
        new Vehicle("Commercial", "Trailer"),
        new Vehicle("Commercial", "Mule (Armored)", "regular"),
        new Vehicle("Commercial", "Biff"),
        new Vehicle("Commercial", "Hauler", "transform"),
        new Vehicle("Commercial", "Pounder", "transform"),
        new Vehicle("Commercial", "Mule", "transform"),
        new Vehicle("Commercial", "Tanker"),
        new Vehicle("Compacts", "Brioso R/A", "regular"),
        new Vehicle("Compacts", "Rhapsody", "regular"),
        new Vehicle("Compacts", "Panto", "regular"),
        new Vehicle("Compacts", "Blista", "regular"),
        new Vehicle("Compacts", "Issi", "regular"),
        new Vehicle("Compacts", "Prairie", "regular"),
        new Vehicle("Compacts", "Issi Classic", "regular"),
        new Vehicle("Compacts", "Dilettante", "regular"),
        new Vehicle("Coupes", "Zion", "regular"),
        new Vehicle("Coupes", "Zion Cabrio", "regular"),
        new Vehicle("Coupes", "Felon", "regular"),
        new Vehicle("Coupes", "Exemplar", "regular"),
        new Vehicle("Coupes", "Jackal", "regular"),
        new Vehicle("Coupes", "Sentinel XS", "regular"),
        new Vehicle("Coupes", "Cognescenti Cabrio", "regular"),
        new Vehicle("Coupes", "F620", "regular"),
        new Vehicle("Coupes", "Felon GT", "regular"),
        new Vehicle("Coupes", "Sentinel", "regular"),
        new Vehicle("Coupes", "Oracle", "regular"),
        new Vehicle("Coupes", "Oracle XS", "regular"),
        new Vehicle("Coupes", "Windsor", "regular"),
        new Vehicle("Coupes", "Windsor Drop", "regular"),
        new Vehicle("Cycles", "BMX", "regular"),
        new Vehicle("Cycles", "Cruiser", "regular"),
        new Vehicle("Cycles", "Fixter"),
        new Vehicle("Cycles", "Race Bike", "regular"),
        new Vehicle("Cycles", "Scorcher", "regular"),
        new Vehicle("Emergency", "Ambulance", "transform"),
        new Vehicle("Emergency", "FIB", "transform"),
        new Vehicle("Emergency", "FIB SUV", "transform"),
        new Vehicle("Emergency", "Fire Truck", "transform"),
        new Vehicle("Emergency", "Lifeguard"),
        new Vehicle("Emergency", "Park Ranger", "regular"),
        new Vehicle("Emergency", "Police Bike", "transform"),
        new Vehicle("Emergency", "Police Cruiser (Buffalo)"),
        new Vehicle("Emergency", "Police Cruiser (Interceptor)", "transform"),
        new Vehicle("Emergency", "Police Cruiser (Stanier)"),
        new Vehicle("Emergency", "Police Rancher"),
        new Vehicle("Emergency", "Police Riot", "transform"),
        new Vehicle("Emergency", "Police Roadcruiser"),
        new Vehicle("Emergency", "Police Transporter"),
        new Vehicle("Emergency", "Prison Bus", "transform"),
        new Vehicle("Emergency", "RCV", "transform"),
        new Vehicle("Emergency", "Sheriff Cruiser"),
        new Vehicle("Emergency", "Sheriff SUV", "transform"),
        new Vehicle("Emergency", "Unmarked Cruiser"),
        new Vehicle("Helicopters", "Akula", "regular"),
        new Vehicle("Helicopters", "Annihilator", "regular"),
        new Vehicle("Helicopters", "Buzzard", "regular"),
        new Vehicle("Helicopters", "Cargobob", "regular"),
        new Vehicle("Helicopters", "Frogger", "regular"),
        new Vehicle("Helicopters", "Havok", "regular"),
        new Vehicle("Helicopters", "Hunter", "regular"),
        new Vehicle("Helicopters", "Maverick", "regular"),
        new Vehicle("Helicopters", "Police Maverick", "regular"),
        new Vehicle("Helicopters", "Savage", "regular"),
        new Vehicle("Helicopters", "Sea Sparrow", "regular"),
        new Vehicle("Helicopters", "Skylift", "transform"),
        new Vehicle("Helicopters", "SuperVolito", "regular"),
        new Vehicle("Helicopters", "Swift", "regular"),
        new Vehicle("Helicopters", "Swift Deluxe", "regular"),
        new Vehicle("Helicopters", "Valkyrie", "regular"),
        new Vehicle("Helicopters", "Volatus", "regular"),
        new Vehicle("Industrial", "Cutter"),
        new Vehicle("Industrial", "Dock Handler", "transform"),
        new Vehicle("Industrial", "Dozer", "transform"),
        new Vehicle("Industrial", "Dump", "transform"),
        new Vehicle("Industrial", "Flatbed", "transform"),
        new Vehicle("Industrial", "Guardian", "regular"),
        new Vehicle("Industrial", "Mixer (6 Wheels)", "transform"),
        new Vehicle("Industrial", "Mixer (8 Wheels)", "transform"),
        new Vehicle("Industrial", "Rubble", "transform"),
        new Vehicle("Industrial", "Tipper (4 Wheels)", "transform"),
        new Vehicle("Industrial", "Tipper (6 Wheels)"),
        new Vehicle("Military", "Anti-Aircraft Trailer"),
        new Vehicle("Military", "APC", "transform"),
        new Vehicle("Military", "Barracks", "transform"),
        new Vehicle("Military", "Barracks Semi", "transform"),
        new Vehicle("Military", "Barrage"),
        new Vehicle("Military", "Chernobog", "transform"),
        new Vehicle("Military", "Crusader", "regular"),
        new Vehicle("Military", "Half-Track", "transform"),
        new Vehicle("Military", "Rhino Tank", "transform"),
        new Vehicle("Military", "Thruster", "transform"),
        new Vehicle("Military", "TM-02 Khanjali", "transform"),
        new Vehicle("Motorcycles", "Oppressor", "transform"),
        new Vehicle("Motorcycles", "Oppressor Mk II"),
        new Vehicle("Motorcycles", "Shotaro", "regular"),
        new Vehicle("Motorcycles", "Hakuchou Drag", "regular"),
        new Vehicle("Motorcycles", "Bati 801", "regular"),
        new Vehicle("Motorcycles", "Akuma", "regular"),
        new Vehicle("Motorcycles", "Double-T", "regular"),
        new Vehicle("Motorcycles", "Defiler", "regular"),
        new Vehicle("Motorcycles", "Hakuchou", "regular"),
        new Vehicle("Motorcycles", "Carbon RS", "regular"),
        new Vehicle("Motorcycles", "Vortex", "regular"),
        new Vehicle("Motorcycles", "FCR 1000 Custom", "regular"),
        new Vehicle("Motorcycles", "Ruffian", "regular"),
        new Vehicle("Motorcycles", "Cliffhanger", "regular"),
        new Vehicle("Motorcycles", "Gargoyle", "regular"),
        new Vehicle("Motorcycles", "Diabolus Custom", "regular"),
        new Vehicle("Motorcycles", "FCR 1000", "regular"),
        new Vehicle("Motorcycles", "BF400", "regular"),
        new Vehicle("Motorcycles", "Sanctus", "regular"),
        new Vehicle("Motorcycles", "Nightblade", "regular"),
        new Vehicle("Motorcycles", "Lectro", "regular"),
        new Vehicle("Motorcycles", "Diabolus", "regular"),
        new Vehicle("Motorcycles", "Sanchez", "regular"),
        new Vehicle("Motorcycles", "Nemesis", "regular"),
        new Vehicle("Motorcycles", "Innovation", "regular"),
        new Vehicle("Motorcycles", "Vader", "regular"),
        new Vehicle("Motorcycles", "Vindicator", "regular"),
        new Vehicle("Motorcycles", "Esskey", "regular"),
        new Vehicle("Motorcycles", "Sovereign", "regular"),
        new Vehicle("Motorcycles", "Manchez", "regular"),
        new Vehicle("Motorcycles", "PCJ 600", "regular"),
        new Vehicle("Motorcycles", "Hexer", "regular"),
        new Vehicle("Motorcycles", "Avarus", "regular"),
        new Vehicle("Motorcycles", "Thrust", "regular"),
        new Vehicle("Motorcycles", "Daemon (Lost)", "regular"),
        new Vehicle("Motorcycles", "Zombie Chopper", "regular"),
        new Vehicle("Motorcycles", "Zombie Bobber", "regular"),
        new Vehicle("Motorcycles", "Daemon", "regular"),
        new Vehicle("Motorcycles", "Chimera", "regular"),
        new Vehicle("Motorcycles", "Enduro", "regular"),
        new Vehicle("Motorcycles", "Bagger", "regular"),
        new Vehicle("Motorcycles", "Wolfsbane", "regular"),
        new Vehicle("Motorcycles", "Rat Bike", "regular"),
        new Vehicle("Motorcycles", "Faggio Sport", "regular"),
        new Vehicle("Motorcycles", "Faggio Mod", "regular"),
        new Vehicle("Motorcycles", "Faggio", "regular"),
        new Vehicle("Muscle", "Yosemite", "regular"),
        new Vehicle("Muscle", "Pisswasser Dominator", "regular"),
        new Vehicle("Muscle", "Sabre Turbo Custom", "regular"),
        new Vehicle("Muscle", "Dominator GTX", "regular"),
        new Vehicle("Muscle", "Dominator", "regular"),
        new Vehicle("Muscle", "Blade", "regular"),
        new Vehicle("Muscle", "Dukes", "regular"),
        new Vehicle("Muscle", "Coquette BlackFin", "regular"),
        new Vehicle("Muscle", "Ruiner", "regular"),
        new Vehicle("Muscle", "Duke O'Death", "regular"),
        new Vehicle("Muscle", "Sabre Turbo", "regular"),
        new Vehicle("Muscle", "Weaponized Tampa", "transform"),
        new Vehicle("Muscle", "Hermes", "regular"),
        new Vehicle("Muscle", "Burger Shot Stallion", "regular"),
        new Vehicle("Muscle", "Redwood Gauntlet", "regular"),
        new Vehicle("Muscle", "Slamvan Custom", "regular"),
        new Vehicle("Muscle", "Tampa", "regular"),
        new Vehicle("Muscle", "Phoenix", "regular"),
        new Vehicle("Muscle", "Stallion", "regular"),
        new Vehicle("Muscle", "Ruiner 2000", "transform"),
        new Vehicle("Muscle", "Gauntlet", "regular"),
        new Vehicle("Muscle", "Hustler", "regular"),
        new Vehicle("Muscle", "Buccaneer Custom", "regular"),
        new Vehicle("Muscle", "Buccaneer", "regular"),
        new Vehicle("Muscle", "Vigero", "regular"),
        new Vehicle("Muscle", "Faction Custom", "regular"),
        new Vehicle("Muscle", "Ellie", "regular"),
        new Vehicle("Muscle", "Lurcher", "regular"),
        new Vehicle("Muscle", "Nightshade", "regular"),
        new Vehicle("Muscle", "Virgo Classic Custom", "regular"),
        new Vehicle("Muscle", "Faction Custom Donk", "regular"),
        new Vehicle("Muscle", "Faction", "regular"),
        new Vehicle("Muscle", "Moonbeam Custom", "regular"),
        new Vehicle("Muscle", "Picador", "regular"),
        new Vehicle("Muscle", "Virgo", "regular"),
        new Vehicle("Muscle", "Hotknife", "regular"),
        new Vehicle("Muscle", "Chino Custom", "regular"),
        new Vehicle("Muscle", "Chino", "regular"),
        new Vehicle("Muscle", "Virgo Classic", "regular"),
        new Vehicle("Muscle", "Moonbeam", "regular"),
        new Vehicle("Muscle", "Voodoo Custom", "regular"),
        new Vehicle("Muscle", "Voodoo", "regular"),
        new Vehicle("Muscle", "Rat-Truck", "regular"),
        new Vehicle("Muscle", "Rat-Loader", "regular"),
        new Vehicle("Muscle", "Lost Slamvan"),
        new Vehicle("Muscle", "Slamvan", "regular"),
        new Vehicle("Off-Road", "Ramp Buggy", "transform"),
        new Vehicle("Off-Road", "Kamacho", "regular"),
        new Vehicle("Off-Road", "Blazer Aqua", "transform"),
        new Vehicle("Off-Road", "Street Blazer", "regular"),
        new Vehicle("Off-Road", "Desert Raid", "regular"),
        new Vehicle("Off-Road", "Trophy Truck", "regular"),
        new Vehicle("Off-Road", "Nightshark", "transform"),
        new Vehicle("Off-Road", "Bifta", "regular"),
        new Vehicle("Off-Road", "Blazer", "regular"),
        new Vehicle("Off-Road", "Hot Rod Blazer", "regular"),
        new Vehicle("Off-Road", "Dune Buggy", "regular"),
        new Vehicle("Off-Road", "Brawler", "regular"),
        new Vehicle("Off-Road", "Ramp Buggy (Spoiler)"),
        new Vehicle("Off-Road", "Caracara", "regular"),
        new Vehicle("Off-Road", "Riata", "regular"),
        new Vehicle("Off-Road", "Insurgent Pick-Up Custom"),
        new Vehicle("Off-Road", "Injection", "regular"),
        new Vehicle("Off-Road", "Dune FAV", "transform"),
        new Vehicle("Off-Road", "Insurgent", "regular"),
        new Vehicle("Off-Road", "Bodhi", "regular"),
        new Vehicle("Off-Road", "Technical Custom"),
        new Vehicle("Off-Road", "Technical Aqua", "transform"),
        new Vehicle("Off-Road", "Dubsta 6x6", "regular"),
        new Vehicle("Off-Road", "Mesa (Merryweather)", "regular"),
        new Vehicle("Off-Road", "Rusty Rebel", "regular"),
        new Vehicle("Off-Road", "Rebel", "regular"),
        new Vehicle("Off-Road", "Marshall", "regular"),
        new Vehicle("Off-Road", "Liberator", "regular"),
        new Vehicle("Off-Road", "Sandking SWB", "regular"),
        new Vehicle("Off-Road", "Kalahari", "regular"),
        new Vehicle("Off-Road", "Sandking XL", "regular"),
        new Vehicle("Off-Road", "Insurgent Pick-Up", "transform"),
        new Vehicle("Off-Road", "Technical", "transform"),
        new Vehicle("Off-Road", "Rancher XL", "regular"),
        new Vehicle("Off-Road", "Space Docker"),
        new Vehicle("Off-Road", "Blazer Lifeguard", "regular"),
        new Vehicle("Off-Road", "Duneloader", "regular"),
        new Vehicle("Planes", "Alpha Z-1", "regular"),
        new Vehicle("Planes", "Avenger"),
        new Vehicle("Planes", "B-11 Strikeforce"),
        new Vehicle("Planes", "Besra", "regular"),
        new Vehicle("Planes", "Blimp (Atomic)"),
        new Vehicle("Planes", "Blimp (Nightclub)"),
        new Vehicle("Planes", "Blimp (Xero)"),
        new Vehicle("Planes", "Cargoplane"),
        new Vehicle("Planes", "Cuban 800", "regular"),
        new Vehicle("Planes", "Dodo", "transform"),
        new Vehicle("Planes", "Duster", "regular"),
        new Vehicle("Planes", "Howard NX-25", "regular"),
        new Vehicle("Planes", "Hydra", "regular"),
        new Vehicle("Planes", "Jet"),
        new Vehicle("Planes", "LF-22 Starling", "regular"),
        new Vehicle("Planes", "Luxor", "regular"),
        new Vehicle("Planes", "Luxor Deluxe", "regular"),
        new Vehicle("Planes", "Mallard", "regular"),
        new Vehicle("Planes", "Mammatus", "regular"),
        new Vehicle("Planes", "Miljet", "regular"),
        new Vehicle("Planes", "Mogul", "regular"),
        new Vehicle("Planes", "Nimbus", "regular"),
        new Vehicle("Planes", "P-45 Nokota", "regular"),
        new Vehicle("Planes", "P-996 Lazer", "regular"),
        new Vehicle("Planes", "Pyro", "regular"),
        new Vehicle("Planes", "RM-10 Bombushka", "transform"),
        new Vehicle("Planes", "Rogue", "regular"),
        new Vehicle("Planes", "Seabreeze", "regular"),
        new Vehicle("Planes", "Shamal", "regular"),
        new Vehicle("Planes", "Titan", "transform"),
        new Vehicle("Planes", "Tula", "regular"),
        new Vehicle("Planes", "Ultralight", "regular"),
        new Vehicle("Planes", "V-65 Molotok", "regular"),
        new Vehicle("Planes", "Velum", "regular"),
        new Vehicle("Planes", "Vestra", "regular"),
        new Vehicle("Planes", "Volatol", "regular"),
        new Vehicle("Sedans", "Schafter V12 (Armored)", "regular"),
        new Vehicle("Sedans", "Schafter", "regular"),
        new Vehicle("Sedans", "Schafter LWB (Armored)", "regular"),
        new Vehicle("Sedans", "Tailgater", "regular"),
        new Vehicle("Sedans", "Fugitive", "regular"),
        new Vehicle("Sedans", "Primo Custom", "regular"),
        new Vehicle("Sedans", "Primo", "regular"),
        new Vehicle("Sedans", "Intruder", "regular"),
        new Vehicle("Sedans", "Warrener", "regular"),
        new Vehicle("Sedans", "Washington", "regular"),
        new Vehicle("Sedans", "Stanier", "regular"),
        new Vehicle("Sedans", "Asterope", "regular"),
        new Vehicle("Sedans", "Cognoscenti 55", "regular"),
        new Vehicle("Sedans", "Cognoscenti 55 (Armored)", "regular"),
        new Vehicle("Sedans", "Surge", "regular"),
        new Vehicle("Sedans", "Stratum", "regular"),
        new Vehicle("Sedans", "Premier", "regular"),
        new Vehicle("Sedans", "Asea", "regular"),
        new Vehicle("Sedans", "Super Diamond", "regular"),
        new Vehicle("Sedans", "Cognoscenti", "regular"),
        new Vehicle("Sedans", "Glendale", "regular"),
        new Vehicle("Sedans", "Cognoscenti (Armored)", "regular"),
        new Vehicle("Sedans", "Turreted Limo"),
        new Vehicle("Sedans", "Stafford", "regular"),
        new Vehicle("Sedans", "Romero Hearse", "regular"),
        new Vehicle("Sedans", "Ingot", "regular"),
        new Vehicle("Sedans", "Emperor", "regular"),
        new Vehicle("Sedans", "Stretch", "transform"),
        new Vehicle("Sedans", "Regina", "regular"),
        new Vehicle("Service", "Dune", "regular"),
        new Vehicle("Service", "Wastelander", "transform"),
        new Vehicle("Service", "Taxi", "transform"),
        new Vehicle("Service", "Brickade", "transform"),
        new Vehicle("Service", "Trashmaster", "transform"),
        new Vehicle("Service", "Rental Shuttle Bus"),
        new Vehicle("Service", "Tourbus"),
        new Vehicle("Service", "Bus", "transform"),
        new Vehicle("Service", "Dashound", "transform"),
        new Vehicle("Sports", "Pariah", "regular"),
        new Vehicle("Sports", "Comet SR", "regular"),
        new Vehicle("Sports", "Elegy RH8", "regular"),
        new Vehicle("Sports", "Feltzer", "regular"),
        new Vehicle("Sports", "Neon", "regular"),
        new Vehicle("Sports", "Jester (Racecar)", "regular"),
        new Vehicle("Sports", "Elegy Retro Custom", "regular"),
        new Vehicle("Sports", "Jester", "regular"),
        new Vehicle("Sports", "Massacro (Racecar)", "regular"),
        new Vehicle("Sports", "Massacro", "regular"),
        new Vehicle("Sports", "Flash GT", "regular"),
        new Vehicle("Sports", "9F", "regular"),
        new Vehicle("Sports", "9F Cabrio", "regular"),
        new Vehicle("Sports", "Revolter", "regular"),
        new Vehicle("Sports", "Specter Custom", "regular"),
        new Vehicle("Sports", "Bestia GTS", "regular"),
        new Vehicle("Sports", "Specter", "regular"),
        new Vehicle("Sports", "Raiden", "regular"),
        new Vehicle("Sports", "Surano", "regular"),
        new Vehicle("Sports", "Seven-70", "regular"),
        new Vehicle("Sports", "Schafter V12", "regular"),
        new Vehicle("Sports", "Comet", "regular"),
        new Vehicle("Sports", "Comet Retro Custom", "regular"),
        new Vehicle("Sports", "Sentinel Classic", "regular"),
        new Vehicle("Sports", "Verlierer", "regular"),
        new Vehicle("Sports", "Carbonizzare", "regular"),
        new Vehicle("Sports", "Alpha", "regular"),
        new Vehicle("Sports", "Sultan", "regular"),
        new Vehicle("Sports", "Banshee", "regular"),
        new Vehicle("Sports", "Coquette", "regular"),
        new Vehicle("Sports", "Jester Classic", "regular"),
        new Vehicle("Sports", "Kuruma", "regular"),
        new Vehicle("Sports", "Tropos Rallye", "regular"),
        new Vehicle("Sports", "Hotring Sabre", "regular"),
        new Vehicle("Sports", "Lynx", "regular"),
        new Vehicle("Sports", "Omnis", "regular"),
        new Vehicle("Sports", "Sprunk Buffalo", "regular"),
        new Vehicle("Sports", "GB200", "regular"),
        new Vehicle("Sports", "Comet Safari", "regular"),
        new Vehicle("Sports", "Buffalo S", "regular"),
        new Vehicle("Sports", "Ruston", "regular"),
        new Vehicle("Sports", "Khamelion", "regular"),
        new Vehicle("Sports", "Drift Tampa", "regular"),
        new Vehicle("Sports", "Rapid GT", "regular"),
        new Vehicle("Sports", "Rapid GT Cabrio", "regular"),
        new Vehicle("Sports", "Furore GT", "regular"),
        new Vehicle("Sports", "Buffalo", "regular"),
        new Vehicle("Sports", "Fusilade", "regular"),
        new Vehicle("Sports", "Kuruma (Armored)", "regular"),
        new Vehicle("Sports", "Schafter LWB", "regular"),
        new Vehicle("Sports", "Schwartzer", "regular"),
        new Vehicle("Sports", "Raptor", "regular"),
        new Vehicle("Sports", "Penumbra", "regular"),
        new Vehicle("Sports", "Futo", "regular"),
        new Vehicle("Sports", "Streiter", "regular"),
        new Vehicle("Sports", "Go Go Monkey Blista"),
        new Vehicle("Sports", "Blista Compact", "regular"),
        new Vehicle("Sports Classics", "Turismo Classic", "regular"),
        new Vehicle("Sports Classics", "Cheetah Classic", "regular"),
        new Vehicle("Sports Classics", "Ardent", "transform"),
        new Vehicle("Sports Classics", "Rapid GT Classic", "regular"),
        new Vehicle("Sports Classics", "Stirling GT", "regular"),
        new Vehicle("Sports Classics", "Infernus Classic", "regular"),
        new Vehicle("Sports Classics", "Torero", "regular"),
        new Vehicle("Sports Classics", "Swinger", "regular"),
        new Vehicle("Sports Classics", "Deluxo", "transform"),
        new Vehicle("Sports Classics", "Viseris", "regular"),
        new Vehicle("Sports Classics", "Savestra", "regular"),
        new Vehicle("Sports Classics", "Stromberg", "transform"),
        new Vehicle("Sports Classics", "Retinue", "regular"),
        new Vehicle("Sports Classics", "Z-Type", "regular"),
        new Vehicle("Sports Classics", "Pigalle", "regular"),
        new Vehicle("Sports Classics", "Casco", "regular"),
        new Vehicle("Sports Classics", "190z", "regular"),
        new Vehicle("Sports Classics", "Monroe", "regular"),
        new Vehicle("Sports Classics", "Coquette Classic", "regular"),
        new Vehicle("Sports Classics", "JB 700", "regular"),
        new Vehicle("Sports Classics", "GT500", "regular"),
        new Vehicle("Sports Classics", "Cheburek", "regular"),
        new Vehicle("Sports Classics", "Mamba", "regular"),
        new Vehicle("Sports Classics", "Stinger GT", "regular"),
        new Vehicle("Sports Classics", "Stinger", "regular"),
        new Vehicle("Sports Classics", "Michelli GT", "regular"),
        new Vehicle("Sports Classics", "Roosevelt Valor", "regular"),
        new Vehicle("Sports Classics", "Franken Stange", "regular"),
        new Vehicle("Sports Classics", "Roosevelt", "regular"),
        new Vehicle("Sports Classics", "Tornado Rat Rod", "regular"),
        new Vehicle("Sports Classics", "Fagaloa", "regular"),
        new Vehicle("Sports Classics", "Manana", "regular"),
        new Vehicle("Sports Classics", "Tornado Custom", "regular"),
        new Vehicle("Sports Classics", "Peyote", "regular"),
        new Vehicle("Sports Classics", "Tornado", "regular"),
        new Vehicle("Sports Classics", "Tornado Cabrio", "regular"),
        new Vehicle("Sports Classics", "Tornado Mariachi", "regular"),
        new Vehicle("Supers", "Vigilante", "transform"),
        new Vehicle("Supers", "Vagner", "regular"),
        new Vehicle("Supers", "Rocket Voltic", "transform"),
        new Vehicle("Supers", "RE-7B", "regular"),
        new Vehicle("Supers", "XA-21", "regular"),
        new Vehicle("Supers", "Autarch", "regular"),
        new Vehicle("Supers", "Tempesta", "regular"),
        new Vehicle("Supers", "Zentorno", "regular"),
        new Vehicle("Supers", "Nero Custom", "regular"),
        new Vehicle("Supers", "Visione", "regular"),
        new Vehicle("Supers", "X80 Proto", "regular"),
        new Vehicle("Supers", "ETR1", "regular"),
        new Vehicle("Supers", "T20", "regular"),
        new Vehicle("Supers", "Osiris", "regular"),
        new Vehicle("Supers", "Tyrus", "regular"),
        new Vehicle("Supers", "Tyrant", "regular"),
        new Vehicle("Supers", "Nero", "regular"),
        new Vehicle("Supers", "Tezeract", "regular"),
        new Vehicle("Supers", "FMJ", "regular"),
        new Vehicle("Supers", "Itali GTB", "regular"),
        new Vehicle("Supers", "Cyclone", "regular"),
        new Vehicle("Supers", "Turismo R", "regular"),
        new Vehicle("Supers", "Entity XF", "regular"),
        new Vehicle("Supers", "Penetrator", "regular"),
        new Vehicle("Supers", "Reaper", "regular"),
        new Vehicle("Supers", "Itali GTB Custom", "regular"),
        new Vehicle("Supers", "Infernus", "regular"),
        new Vehicle("Supers", "811", "regular"),
        new Vehicle("Supers", "Cheetah", "regular"),
        new Vehicle("Supers", "GP1", "regular"),
        new Vehicle("Supers", "SC1", "regular"),
        new Vehicle("Supers", "Vacca", "regular"),
        new Vehicle("Supers", "Entity XXR", "regular"),
        new Vehicle("Supers", "Sultan RS", "regular"),
        new Vehicle("Supers", "Banshee 900R", "regular"),
        new Vehicle("Supers", "Adder", "regular"),
        new Vehicle("Supers", "Voltic", "regular"),
        new Vehicle("Supers", "Taipan", "regular"),
        new Vehicle("Supers", "Bullet", "regular"),
        new Vehicle("SUVs", "Contender", "regular"),
        new Vehicle("SUVs", "XLS (Armored)", "regular"),
        new Vehicle("SUVs", "Huntley S", "regular"),
        new Vehicle("SUVs", "Baller LE", "regular"),
        new Vehicle("SUVs", "Baller LE (Armored)", "regular"),
        new Vehicle("SUVs", "Baller", "regular"),
        new Vehicle("SUVs", "Baller LE LWB", "regular"),
        new Vehicle("SUVs", "Baller LE LWB (Armored)", "regular"),
        new Vehicle("SUVs", "Radius", "regular"),
        new Vehicle("SUVs", "XLS", "regular"),
        new Vehicle("SUVs", "Rocoto", "regular"),
        new Vehicle("SUVs", "Granger", "regular"),
        new Vehicle("SUVs", "Serrano", "regular"),
        new Vehicle("SUVs", "Dubsta", "regular"),
        new Vehicle("SUVs", "Landstalker", "regular"),
        new Vehicle("SUVs", "Habanero", "regular"),
        new Vehicle("SUVs", "FQ2", "regular"),
        new Vehicle("SUVs", "Dubsta 2", "regular"),
        new Vehicle("SUVs", "Gresley", "regular"),
        new Vehicle("SUVs", "BeeJay XL", "regular"),
        new Vehicle("SUVs", "Cavalcade", "regular"),
        new Vehicle("SUVs", "Cavalcade (Old)", "regular"),
        new Vehicle("SUVs", "Baller (Old)", "regular"),
        new Vehicle("SUVs", "Mesa", "regular"),
        new Vehicle("SUVs", "Seminole", "regular"),
        new Vehicle("SUVs", "Patriot", "regular"),
        new Vehicle("SUVs", "Patriot Stretch", "regular"),
        new Vehicle("Utility", "Sadler", "regular"),
        new Vehicle("Utility", "Mobile Operations Center"),
        new Vehicle("Utility", "Towtruck (Small)"),
        new Vehicle("Utility", "Towtruck (Large)"),
        new Vehicle("Utility", "Caddy", "regular"),
        new Vehicle("Utility", "Caddy (Rusty)"),
        new Vehicle("Utility", "Utility Truck (Van)"),
        new Vehicle("Utility", "Utility Truck"),
        new Vehicle("Utility", "Utility Truck (Cherry Picker)"),
        new Vehicle("Utility", "Scrap Truck", "transform"),
        new Vehicle("Utility", "Ripley", "transform"),
        new Vehicle("Utility", "Docktug"),
        new Vehicle("Utility", "Caddy (Bunker)"),
        new Vehicle("Utility", "Forklift"),
        new Vehicle("Utility", "Fieldmaster", "regular"),
        new Vehicle("Utility", "Airtug", "regular"),
        new Vehicle("Utility", "Tractor"),
        new Vehicle("Utility", "Lawn Mower", "regular"),
        new Vehicle("Vans", "Rumpo Custom", "regular"),
        new Vehicle("Vans", "Gang Burrito", "regular"),
        new Vehicle("Vans", "Speedo Custom"),
        new Vehicle("Vans", "Bison", "regular"),
        new Vehicle("Vans", "Minivan Custom", "regular"),
        new Vehicle("Vans", "Armored Boxville", "transform"),
        new Vehicle("Vans", "Youga", "regular"),
        new Vehicle("Vans", "Rumpo", "regular"),
        new Vehicle("Vans", "Paradise", "regular"),
        new Vehicle("Vans", "Minivan", "regular"),
        new Vehicle("Vans", "Bobcat XL", "regular"),
        new Vehicle("Vans", "Pony", "regular"),
        new Vehicle("Vans", "Clown Van", "regular"),
        new Vehicle("Vans", "Speedo", "regular"),
        new Vehicle("Vans", "Burrito", "regular"),
        new Vehicle("Vans", "Gang Burrito (Lost)", "transform"),
        new Vehicle("Vans", "Youga Classic", "regular"),
        new Vehicle("Vans", "Camper", "regular"),
        new Vehicle("Vans", "Journey", "regular"),
        new Vehicle("Vans", "Boxville", "regular"),
        new Vehicle("Vans", "Taco Van", "regular"),
        new Vehicle("Vans", "Surfer", "regular"),
        new Vehicle("Commercial", "Mule Custom"),
        new Vehicle("Commercial", "Pounder Custom"),
        new Vehicle("Commercial", "Terrorbyte"),
        new Vehicle("Service", "Festival Bus"),
        new Vehicle("Supers", "Scramjet"),
        new Vehicle("Off-Road", "Freecrawler"),
        new Vehicle("Off-Road", "Menacer")
    ];
}
