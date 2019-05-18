/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !randomtrack $(eval platform('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/15ZGd_KKINKJhqIS56Fy23YhY9DTeglmCoFYkREVFDek/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/randomtrack.js);)
 */
function platform(provider='', query = '', data = '') {
    query = normalize(query);

    var rows = data.replace(/\t/g, ' | ').split('   ');
    if (/(?i)\bps4\b/.test(query)) {
        return 'PS4';
    }
    if (/\bxb(?:ox)?1?\b/.test(query)) {
        return 'XB1';
    }
    if (/\bpc\b/.test(query)) {
        return 'PC';
    }
    if (/\b(?:5|five) ?m\b/.test(query)) {
        return 'Five M';
    }
    
    return 'which platform? (PS4 / PC / XB1 / 5M)';
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

    /* Remove everything behind '@' */
    text = text.replace(/\s*@.*/, '');

    /* Remove all chars that are not letters */
    text = text.replace(/[^a-z]+/g, '');

    return text;
}
