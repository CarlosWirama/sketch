import wtf from 'wtf_wikipedia';

const DOMAIN = `https://m.bulbapedia.bulbagarden.net/w/api.php`;
const DEFAULT_PARAMS = {
  origin: '*',
  action: 'parse',
  format: 'json',
  redirects: 1,
};

export async function fetchAndParseWiki(params) {
  const { wikitext } = await fetchWiki({ ...params, prop: 'wikitext' });
  return await wtf(wikitext['*']);
}

async function fetchWiki(params) {
  const queryParams = buildQueryParams(params);
  const url = `${DOMAIN}?${queryParams}`;
  const response =  await fetch(url).then(r => r.json())
  return response.parse;
}

export function buildQueryParams(params = {}) {
  function buildKeyValueQueryFromObject(obj) {
    return Object.keys(obj).map(key => `${key}=${obj[key]}`)
  }
  return [
    ...buildKeyValueQueryFromObject(DEFAULT_PARAMS),
    ...buildKeyValueQueryFromObject(params),
  ].join('&');
}
