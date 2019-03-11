import wtf from 'wtf_wikipedia';

const DOMAIN = `https://m.bulbapedia.bulbagarden.net/w/api.php`;
// const DEFAULT_PARAMS = `?origin=*&action=parse&format=json&redirects=1`;
const DEFAULT_PARAMS = {
  origin: '*',
  action: 'parse',
  format: 'json',
  redirects: 1,
};
const POKEMON_LIST_PAGE = `List_of_Pokémon_by_Kanto_Pokédex_number`;

export function buildQueryParams(params) {
  function buildKeyValueQueryFromObject(obj) {
    return Object.keys(obj).map(key => `${key}=${obj[key]}`)
  }
  return [
    ...buildKeyValueQueryFromObject(DEFAULT_PARAMS),
    ...buildKeyValueQueryFromObject(params),
  ].join('&');
}

async function fetchWiki(params) {
  const queryParams = buildQueryParams(params);
  const url = `${DOMAIN}?${queryParams}`;
  const response =  await fetch(url).then(r => r.json())
  return response.parse;
}

async function fetchAndParseWiki(params, sections) {
  const { wikitext } = await fetchWiki({ ...params, prop: 'wikitext' });
  // TODO; should break this down to allow multple sections in one fetch
  return await wtf(wikitext['*']).sections(sections).json();
}

export async function getPokemons() {
  // get all Kanto Pokemon (Pokemon Let's Go)
  const learnsetSection = await fetchAndParseWiki({
    page: POKEMON_LIST_PAGE,
  }, 'By leveling up');
  const learnsetTable = learnsetSection.templates
    .filter(i => i.template === 'learnlist/level7');

  return await learnsetTable;
}

export async function getPokemonDetail(name) {
  // get learnset table
  const learnsetSection = await fetchAndParseWiki({
    page: name,
  }, 'By leveling up');
  const learnsetTable = learnsetSection.templates
    .filter(i => i.template === 'learnlist/level7');

  return await learnsetTable;
}
