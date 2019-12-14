import { pixelSprite } from '../common/constants/urls';

export function getAnimatedPokemonImage(pokemonName: string, isAlolan?: boolean) {
  const baseUrl = 'https://projectpokemon.org/images';
  const name = pokemonName.toLowerCase();
  const spriteType = getSpriteType(name);
  const fileName = getImageFileName(name, isAlolan ? 'Alolan' : '');
  return `${baseUrl}/${spriteType}/${fileName}.gif`;
}

function getSpriteType(name: string, isShiny?: boolean) {
  if (name === 'meltan' || name === 'melmetal')
    return isShiny ? 'lgswitch-shiny' : 'lgswitch-sprite';
  return isShiny ? 'shiny-sprite' : 'normal-sprite';
}

function getImageFileName(pokemonName: string, form: string) {
  if (form === 'Alolan') {
    pokemonName += '-alola';
  } else if (form === 'Galarian') {
    pokemonName += '-galar';
  } else if (form === 'Low Key') {
    return 'toxtricity-low-key';
  }
  switch (pokemonName) {
    case 'nidoran♂': return 'nidoran_m';
    case 'nidoran♀': return 'nidoran_f';
    case "farfetch'd": return 'farfetchd';
    case "sirfetch'd": return 'sirfetch%E2%80%99d';
    case 'mime jr.': return 'mime_jr';
    case 'mr. mime': return 'mr.mime';
    case 'mr. mime-galar': return 'mr.-mime-galar';
    case 'mr. rime': return 'mr.rime';
    case 'type: null': return 'typenull';
    case 'darmanitan': return 'darmanitan-zen-galar';
    default: return pokemonName;
  }
}

export function getPixelImage(pokemonName: string, isAlolan: boolean) {
  const index = kantoDex.indexOf(pokemonName);
  const WIDTH = 32;
  const HEIGHT = 32;
  const TOTAL_COLUMN = 25;
  const x = -1 * (index % TOTAL_COLUMN) * WIDTH;
  const y = -1 * Math.floor(index / TOTAL_COLUMN) * HEIGHT - 4;
  return `url(${pixelSprite}) ${x}px ${y}px`;
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
