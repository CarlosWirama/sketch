import wtf from 'wtf_wikipedia';

const DOMAIN = `https://m.bulbapedia.bulbagarden.net/w/api.php`;
const DEFAULT_PARAMS = {
  origin: '*',
  action: 'parse',
  format: 'json',
  redirects: 1,
};
const POKEMON_LIST_PAGE = `List_of_Pokémon_by_Kanto_Pokédex_number`;

export function buildQueryParams(params = {}) {
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

async function fetchAndParseWiki(params) {
  const { wikitext } = await fetchWiki({ ...params, prop: 'wikitext' });
  return await wtf(wikitext['*']);
}

export async function getPokemons() {
  // get all Kanto Pokemon (Pokemon Let's Go)
  const wikitextResult = await fetchAndParseWiki({
    page: POKEMON_LIST_PAGE,
  });
  return [].concat( // flatten arrays, combine all pokemons from all sections
    ...wikitextResult.sections() // sections() will produce list of sections in page
      .filter(i => i.depth === 2) // filter only sections with pokemon list
      .map(section =>
        // sections(str) will return content of section 'str'
        wikitextResult.sections(section._title).json()
          .templates
          .filter(i => i.template === 'rdex') // exclude header
          .map(i => ({
            kantoDex: i.list[0],
            name: i.list[2],
            types: i.list.splice(4),
          }))
      )
  );
}

export async function getPokemonDetail(name) {
  // get learnset table
  const parsedWikitext = await fetchAndParseWiki({
    page: name,
  });
  const learnsetSection = parsedWikitext.sections('By leveling up').json();
  const learnsetTable = learnsetSection.templates
    .filter(i => i.template === 'learnlist/level7');

  return await learnsetTable;
}
