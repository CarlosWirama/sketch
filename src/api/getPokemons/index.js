import { fetchAndParseWiki } from '../apiHelper';
const POKEMON_LIST_PAGE = `List_of_Pokémon_by_Kanto_Pokédex_number`;

export default async function getPokemons() {
  // get all Kanto Pokemon (Pokemon Let's Go)
  const wikitextResult = await fetchAndParseWiki({
    page: POKEMON_LIST_PAGE,
  });
  const unsortedList = [].concat( // flatten arrays, combine all pokemons from all sections
    ...wikitextResult.sections() // sections() will produce list of sections in page
      .filter(i => i.depth === 2) // filter only sections with pokemon list
      .map(section =>
        // sections(str) will return content of section 'str'
        wikitextResult.sections(section._title).json()
          .templates
          .filter(i => i.template === 'rdex') // exclude header
          .map(({ list: [ kantoDex, nDex, name, typeCount, ...types ] } ) => ({
            kantoDex,
            isAlolan: nDex.slice(-1) === 'A',
            name,
            types,
          }))
      )
  );
  return unsortedList.sort(function (a, b) {
    // make alolan to be sorted by kantoDex no.
    return a.kantoDex - b.kantoDex;
  })
}
