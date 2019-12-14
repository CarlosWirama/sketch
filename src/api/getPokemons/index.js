import { fetchAndParseWiki } from '../apiHelper';
import Form from '../../common/constants/Form';
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
        form: encodeForm(nDex, name),
      }))
    ).flat();
  return unsortedList.sort(function (a, b) {
    // make foreign pokemon to be sorted by localDex no.
    // Infinity is sorting pokemon without localDex to the bottom
    return (a.localDex || Infinity) - (b.localDex || Infinity);
  })
}

function encodeForm(nationalDex, name) {
  const formInitial = nationalDex.slice(3);
  // check for rotom
  if (nationalDex.includes('479')) {
    switch (formInitial) {
      case 'O': return Form.HeatRotom;
      case 'W': return Form.WashRotom;
      case 'R': return Form.FrostRotom;
      case 'F': return Form.FanRotom;
      case 'L': return Form.MowRotom;
      default:
    }
  }
  switch (formInitial) {
    case 'A': return Form.Alolan;
    case 'G': return Form.Galarian;
    case 'F': return Form.Female;
    case 'GZ': return Form.GalarianZenMode;
    case 'L': return Form.LowKey;
    case 'E': return Form.East;
    case 'C': return Form.Crowned;
    default: return Form.default;
    /**
     * 550B Basculin
     * 646B Kyurem
     * 646W Kyurem
     * 647R Keldeo
     * 800DM Necrozma
     * 800DW Necrozma
     */
  }
}
