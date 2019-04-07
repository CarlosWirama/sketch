import { fetchAndParseWiki } from '../apiHelper';

export default async function getPokemonDetail(name) {
  // get learnset table
  const parsedWikitext = await fetchAndParseWiki({
    page: name,
  });
  let { templates } = parsedWikitext.sections('By leveling up').json();
  if (!templates) {
    // const isAlolan = name.indexOf('Alolan_') !== -1;
    name = name.replace('_',' '); // for alolans
    templates = parsedWikitext.sections(`=${name}`).json().templates;
  }
  const learnsetTable = templates
    .filter(i => i.template === 'learnlist/level7');

  return await learnsetTable;
}
