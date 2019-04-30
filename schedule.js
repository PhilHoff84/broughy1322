/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=5 !schedule $(eval schedule('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/1PT7RWCyBe0hIK7clZQoR6l9og7JwI--4ldKZit5UQFU/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/schedule.js);)
 */
function schedule(provider='', query = '', data = '') {
    query = normalize(query);

    var rows = data.replace(/\t/g, ' | ').split('   ');
    if (provider === 'twitch') {
        return rows[query === 'next' ? 1 : 0];
    }
    return " • " + rows.join("\n • ");
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
