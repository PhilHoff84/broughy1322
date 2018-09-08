function randomVehicle(query) {
    /* Sanitize the filter criteria specified in the urldecoded querystring of the request */
    query = normalize(query);
    return query;
}

function normalize(text) {
    if (!text) {
        text = '';
    }

    /* Convert to lowercase */
    text = text.toLowerCase();

    /* Remove plural */
    text = text.replace(/s\b/, '');

    /* Remove all chars that are not letters */
    text = text.replace(/[^a-z]+/, '');

    /* Remove plural (again) */
    text = text.replace(/s\b/, '');

    /* Remove accents */
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

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
        case 'classic':
        case 'sportsclassic':
            return 'sportclassic';
        case 'utilities':
            return 'utility';
        case 'raceable':
        case 'allraceable':
            return 'all raceable';
        default:
            return text;
    }
}
