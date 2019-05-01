export default function getImageUrl(pokemonName, isAlolan) {
  const baseUrl = 'https://projectpokemon.org/images';
  let name = pokemonName.toLowerCase();
  let spriteType = 'normal-sprite';
  if (isAlolan) {
    name += '-alola';
  } else switch (name) {
    case 'nidoran♂': name = 'nidoran_m'; break;
    case 'nidoran♀': name = 'nidoran_f'; break;
    case "farfetch'd": name = 'farfetchd'; break;
    case 'mr. mime': name = 'mr._mime'; break;
    case 'meltan':
    case 'melmetal': spriteType = 'lgswitch-sprite';
  }
  return `${baseUrl}/${spriteType}/${name}.gif`;
}
