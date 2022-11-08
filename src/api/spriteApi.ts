import { pixelUrl } from '../common/constants/urls';
import Form from '../common/constants/Form';

export function getAnimatedPokemonImage(pokemonName: string, form: Form) {
  const baseUrl = 'https://projectpokemon.org/images';
  const name = pokemonName.toLowerCase();
  const spriteType = getSpriteType(name);
  const fileName = getImageFileName(name, form);
  return `${baseUrl}/${spriteType}/${fileName}.gif`;
}

function getSpriteType(name: string, isShiny?: boolean) {
  if (name === 'meltan' || name === 'melmetal')
    return isShiny ? 'lgswitch-shiny' : 'lgswitch-sprite';
  return isShiny ? 'shiny-sprite' : 'normal-sprite';
}

function getImageFileName(pokemonName: string, form: Form) {
  switch (pokemonName) {
    case 'nidoran♂': return 'nidoran_m';
    case 'nidoran♀': return 'nidoran_f';
    case "farfetch'd": return form ? 'farfetchd-galar' : 'farfetchd';
    case "sirfetch'd": return 'sirfetch%E2%80%99d';
    case 'mime jr.': return 'mime_jr';
    case 'mr. mime': return form ? 'mr.-mime-galar' : 'mr.mime';
    case 'mr. rime': return 'mr.rime';
    case 'type: null': return 'typenull';
    case 'rotom': return form
      ? `rotom-${form.split(' ')[0].toLowerCase()}`
      : 'rotom';
    default: break;
  }
  if (form) {
    switch (form) {
      case Form.Alolan: return pokemonName += '-alola';
      case Form.Galarian: return pokemonName += '-galar';
      case Form.LowKey: return 'toxtricity-low-key';
      case Form.Female: return pokemonName += '-f';
      case Form.East: return pokemonName += '-east';
      case Form.GalarianZenMode: return 'darmanitan-zen-galar';
      case Form.Crowned: return pokemonName === 'zacian'
        ? 'zacian-crowned-sword'
        : 'zamazenta-crowned-shield';
      case Form.White: return 'kyurem-white';
      case Form.Black: return 'kyurem-black';
      case Form.DawnWings: return 'necrozma-dawn-wings';
      case Form.DuskMane: return 'necrozma-dusk-mane';
      default: break;
    }
  }
  return pokemonName.replace(' ', ''); // for Tapu Blablabla
}

export function getPixelImage(nDex: string, form?: Form) {
  const formSuffix = form ? `-${form[0].toLowerCase()}` : '';
  const fileName = `${nDex}${formSuffix}`;
  return `${pixelUrl}/${fileName}.png`;
  // e.g. https://www.serebii.net/pokedex-swsh/icon/026-a.png
}

function getPokedexNumber(pokemonName: string) {
  function addLeadingZero(num: number, size: number) {
    let numStr = num.toString();
    while (numStr.length < size) numStr = `0${numStr}`;
    return numStr;
  }
  const index: number = kantoDex.indexOf(pokemonName) + 1;
  return addLeadingZero(index, 3);
}

export function getPixelImageFromName(pokemonName: string) {
  const index: string = getPokedexNumber(pokemonName);
  return getPixelImage(index);
  // TODO meltan, melmetal
  // TODO alolan
}

const kantoDex = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
  "Fearow",
  "Ekans",
  "Arbok",
  "Pikachu",
  "Raichu",
  "Sandshrew",
  "Sandslash",
  "Nidoran♀",
  "Nidorina",
  "Nidoqueen",
  "Nidoran♂",
  "Nidorino",
  "Nidoking",
  "Clefairy",
  "Clefable",
  "Vulpix",
  "Ninetales",
  "Jigglypuff",
  "Wigglytuff",
  "Zubat",
  "Golbat",
  "Oddish",
  "Gloom",
  "Vileplume",
  "Paras",
  "Parasect",
  "Venonat",
  "Venomoth",
  "Diglett",
  "Dugtrio",
  "Meowth",
  "Persian",
  "Psyduck",
  "Golduck",
  "Mankey",
  "Primeape",
  "Growlithe",
  "Arcanine",
  "Poliwag",
  "Poliwhirl",
  "Poliwrath",
  "Abra",
  "Kadabra",
  "Alakazam",
  "Machop",
  "Machoke",
  "Machamp",
  "Bellsprout",
  "Weepinbell",
  "Victreebel",
  "Tentacool",
  "Tentacruel",
  "Geodude",
  "Graveler",
  "Golem",
  "Ponyta",
  "Rapidash",
  "Slowpoke",
  "Slowbro",
  "Magnemite",
  "Magneton",
  "Farfetch'd",
  "Doduo",
  "Dodrio",
  "Seel",
  "Dewgong",
  "Grimer",
  "Muk",
  "Shellder",
  "Cloyster",
  "Gastly",
  "Haunter",
  "Gengar",
  "Onix",
  "Drowzee",
  "Hypno",
  "Krabby",
  "Kingler",
  "Voltorb",
  "Electrode",
  "Exeggcute",
  "Exeggutor",
  "Cubone",
  "Marowak",
  "Hitmonlee",
  "Hitmonchan",
  "Lickitung",
  "Koffing",
  "Weezing",
  "Rhyhorn",
  "Rhydon",
  "Chansey",
  "Tangela",
  "Kangaskhan",
  "Horsea",
  "Seadra",
  "Goldeen",
  "Seaking",
  "Staryu",
  "Starmie",
  "Mr. Mime",
  "Scyther",
  "Jynx",
  "Electabuzz",
  "Magmar",
  "Pinsir",
  "Tauros",
  "Magikarp",
  "Gyarados",
  "Lapras",
  "Ditto",
  "Eevee",
  "Vaporeon",
  "Jolteon",
  "Flareon",
  "Porygon",
  "Omanyte",
  "Omastar",
  "Kabuto",
  "Kabutops",
  "Aerodactyl",
  "Snorlax",
  "Articuno",
  "Zapdos",
  "Moltres",
  "Dratini",
  "Dragonair",
  "Dragonite",
  "Mewtwo",
  "Mew",
  "Meltan",
  "Melmetal",
];
