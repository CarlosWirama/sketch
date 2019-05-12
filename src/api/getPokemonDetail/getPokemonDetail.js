import { fetchAndParseWiki } from '../apiHelper';

export default async function getPokemonDetail(name) {
  const parsed = await fetchAndParseWiki({
    page: name,
  });
  const summarySection = parsed.sections("").json().infoboxes[0];
  const {
    type1, type2,
    form2type1, form2type2,
    lv100exp, ability1,
  } = summarySection;
  let types = [];
  let learnsetSection = [];
  const isAlolan = name.indexOf('Alolan_') !== -1;
  if (isAlolan) {
    name = name.replace('_',' '); // for alolans
    learnsetSection = parsed.sections(`=${name}`).json().templates;
    types = form2type2 ? [form2type1.text, form2type2.text] : [form2type1.text];
  } else {
    learnsetSection = parsed.sections('By leveling up').json().templates;
    if (!learnsetSection) {
      learnsetSection = parsed.sections(`=${name}`).json().templates;
    }
    types = type2 ? [type1.text, type2.text] : [type1.text];
  }
  // get learnset table
  const learnset = learnsetSection
    .filter(i => i.template === 'learnlist/level7');

  return {
    types,
    learnset,
  };
}
