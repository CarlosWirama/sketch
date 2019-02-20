import wtf from 'wtf_wikipedia';

const DOMAIN = `https://m.bulbapedia.bulbagarden.net/w/api.php`;
const DEFAULT_PARAMS = `?origin=*&action=parse&format=json&redirects=1`;
const POKEMON_LIST_PAGE = `List_of_Pokémon_by_Kanto_Pokédex_number`;

export function buildQueryParams(params) { // TODO: obj above is just an example
  return [
    DEFAULT_PARAMS,
    ...Object.keys(params).map(key => `${key}=${params[key]}`),
  ].join('&');
}

async function fetchWiki(params) {
  const queryParams = buildQueryParams(params);
  const url = `${DOMAIN}${queryParams}`;
  const response =  await fetch(url).then(r => r.json())
  return response.parse;
}

async function fetchAndParseWiki(params) {
  const { wikitext } = await fetchWiki({ ...params, prop: 'wikitext' });
  // return await wtf(wikitext['*']).json();
  return await wtf(wikitext['*']).sections('By leveling up').json();
}

export async function getPokemonDetail(name) {
  // get learnset table
  const learnsetSection = await fetchAndParseWiki({
    page: name,
  });
  console.log(learnsetSection);
  // const learnsetTable = learnsetSection.sections[0].templates;
  const learnsetTable = learnsetSection.templates
    // .filter(i => i.template === 'learnlist/level7');
  console.log(learnsetTable);

  return learnsetTable;
}
