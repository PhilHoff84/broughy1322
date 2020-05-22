/*
 * Nightbot command:
 * !editcom -ul=everyone -cd=10 !tier $(eval tier('$(provider)', '$(query)', "$(urlfetch json https://docs.google.com/spreadsheets/d/17NQWlnzrHHPDXbPhoHyevwdQjDqHQGdIWgK4goiwy5U/export?exportFormat=tsv)"); $(urlfetch json https://raw.githubusercontent.com/PhilHoff84/broughy1322/master/race-tier.js);)
 * !editcom -ul=everyone -cd=10 !compacts -a=!tier compacts $(query)
 * !editcom -ul=everyone -cd=10 !coupes -a=!tier coupes $(query)
 * !editcom -ul=everyone -cd=10 !muscle -a=!tier muscle $(query)
 * !editcom -ul=everyone -cd=10 !offroad -a=!tier off-road $(query)
 * !editcom -ul=everyone -cd=10 !openwheel -a=!tier open-wheel $(query)
 * !editcom -ul=everyone -cd=10 !sedans -a=!tier sedans $(query)
 * !editcom -ul=everyone -cd=10 !sports -a=!tier sports $(query)
 * !editcom -ul=everyone -cd=10 !classics -a=!tier sports-classics $(query)
 * !editcom -ul=everyone -cd=10 !supers -a=!tier supers $(query)
 * !editcom -ul=everyone -cd=10 !suvs -a=!tier suvs $(query)
 * !editcom -ul=everyone -cd=10 !utility -a=!tier utility $(query)
 * !editcom -ul=everyone -cd=10 !vans -a=!tier vans $(query)
 */
function tier(provider='', query = '', data = '') {
	return 'query: ' + query + ' | data: ' + data.substring(0,200).split(/[\r\n]+/).join(' | ');
}