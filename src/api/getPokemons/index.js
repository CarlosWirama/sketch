import { fetchAndParseWiki } from '../apiHelper';
const KANTO_POKEMON_LIST_PAGE = 'List_of_Pokémon_by_Kanto_Pokédex_number';
const GALAR_POKEMON_LIST_PAGE = 'List_of_Pokémon_by_Galar_Pokédex_number';

export default async function getPokemons(generation) {
  const isGenVII = generation === 'gen_VII';
  const wikitextResult = await fetchAndParseWiki({
    page: isGenVII ? KANTO_POKEMON_LIST_PAGE : GALAR_POKEMON_LIST_PAGE,
  });

  // list of pokemon will be divided into several sections
  const sectionsOfPokemonList = wikitextResult
    .sections() // get all sections in page
    // filter only sections with pokemon list
    .filter(i => i.depth === (isGenVII ? 2 : 1));
  const unsortedList = sectionsOfPokemonList.map(section =>
    wikitextResult.sections(section._title).json()
      .templates
      .filter(i => i.template === 'rdex') // exclude header
      .map(({ list: [ localDex, nDex, name, typeCount, ...types ] } ) => ({
        localDex,
        name,
        types,
        isAlolan: nDex.slice(-1) === 'A', // TODO do we need this for Galar?
      }))
    ).flat();
  return unsortedList.sort(function (a, b) {
    // make foreign pokemon to be sorted by localDex no.
    // Infinity is sorting pokemon without localDex to the bottom
    return (a.localDex || Infinity) - (b.localDex || Infinity);
  })
}
