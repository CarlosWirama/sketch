import { fetchAndParseWiki } from '../apiHelper';

export default async function getPokemonDetail(name) {
  // get learnset table
  const parsed = await fetchAndParseWiki({
    page: name,
  });
  const summarySection = parsed.sections("").json().infoboxes[0];
  const { type1, type2, lv100exp, ability1 } = summarySection;
  const types = type2 ? [type1.text, type2.text] : [type1.text];
  let learnsetSection = parsed.sections('By leveling up').json().templates;
  if (!learnsetSection) {
    // const isAlolan = name.indexOf('Alolan_') !== -1;
    name = name.replace('_',' '); // for alolans
    learnsetSection = parsed.sections(`=${name}`).json().templates;
  }
  const learnset = learnsetSection
    .filter(i => i.template === 'learnlist/level7');

  return {
    types,
    learnset,
  };
}
