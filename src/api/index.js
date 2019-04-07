import { fetchAndParseWiki } from './apiHelper';
export { default as getPokemons } from './getPokemons';

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
