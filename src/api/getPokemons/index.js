import { fetchAndParseWiki } from '../apiHelper';
import Form from '../../common/constants/Form';
const KANTO_POKEMON_LIST_PAGE = 'List_of_Pokémon_by_Kanto_Pokédex_number';
const GALAR_POKEMON_LIST_PAGE = 'List_of_Pokémon_by_Galar_Pokédex_number';

const EXCLUDED = 'excluded';

export default async function getPokemons(generation) {
  const isGenVIII = generation === 'gen_VIII';
  const wikitextResult = await fetchAndParseWiki({
    page: isGenVIII ? GALAR_POKEMON_LIST_PAGE : KANTO_POKEMON_LIST_PAGE,
  });

  // list of pokemon will be divided into several sections
  const sectionsOfPokemonList = wikitextResult
    .sections() // get all sections in page
    // filter only sections with pokemon list
    .filter(i => i.depth === (isGenVIII ? 1 : 2));
  const unsortedList = sectionsOfPokemonList.map(section =>
    wikitextResult.sections(section._title).json()
      .templates
      .filter(i => i.template === 'rdex') // exclude header
      .map(({ list: [localDex, nDex, name, typeCount, ...types] }) => ({
        localDex,
        name,
        types: types.map(str => str.toLowerCase()),
        form: encodeForm(nDex),
      }))
      .filter(i => i.form !== EXCLUDED) // exclude double entried form
  ).flat();
  return unsortedList.sort(function (a, b) {
    // make foreign pokemon to be sorted by localDex no.
    // Infinity is sorting pokemon without localDex to the bottom
    return (a.localDex || Infinity) - (b.localDex || Infinity);
  })
}

function encodeForm(nationalDex) {
  const formInitial = nationalDex.slice(3);
  if (nationalDex.includes('479')) { // Rotom
    switch (formInitial) {
      case 'O': return Form.HeatRotom;
      case 'W': return Form.WashRotom;
      case 'R': return Form.FrostRotom;
      case 'F': return Form.FanRotom;
      case 'L': return Form.MowRotom;
      default:
    }
  } else if (nationalDex.includes('025')) { // Pikachu
    return formInitial ? EXCLUDED : Form.default;
  }
  switch (formInitial) {
    case 'A': return Form.Alolan;
    case 'G': return Form.Galarian;
    case 'F': return Form.Female;
    case 'GZ': return Form.GalarianZenMode;
    case 'L': return Form.LowKey;
    case 'E': return Form.East;
    case 'C': return Form.Crowned;
    case 'W': return Form.White;
    // exclude Basculin Blue form, otherwise it's the Black Kyurem
    case 'B': return (nationalDex === '550B') ? EXCLUDED : Form.Black;
    case 'DW': return Form.DawnWings;
    case 'DM': return Form.DuskMane;
    case 'R': return EXCLUDED; // 647R Keldeo
    default: return Form.default;
  }
}
