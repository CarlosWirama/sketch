import { fetchAndParseWiki } from '../apiHelper';
import getEvolutionaryLine from './getEvolutionaryLine';

export default async function getPokemonDetail(name) {
  const parsed = await fetchAndParseWiki({
    page: name,
  });
  const isAlolan = name.indexOf('Alolan_') !== -1;
  const evolutionaryLine = getEvolutionaryLine(parsed, isAlolan);
  const { types, learnset } = getSummary(parsed, name, isAlolan);
  const typeEffectiveness = getTypeEffectiveness(parsed, isAlolan);
  return {
    types,
    learnset,
    typeEffectiveness,
    evolutionaryLine,
  };
}

function getSummary(parsed, name, isAlolan) {
  let types = [];
  let learnsetSection = [];
  const summarySection = parsed.sections('').json().infoboxes[0];
  const {
    type1, type2,
    form2type1, form2type2,
    lv100exp, ability1,
    ndex,
  } = summarySection;
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
  return { types, learnset };
}

function getTypeEffectiveness(parsed, isAlolan) {
  const sectionData = getTypeEffectivenessSectionData(parsed, isAlolan);
  const effectiveness = {
    weak: [],
    resistant: [],
    immune: [],
    normal: [],
  };
  Object.keys(sectionData).forEach(key => {
    const value = sectionData[key];
    if (isNaN(value) || (value < 25 && value !== '0')) return;
    const multiplier = value / 100;
    let effectivenessResult;
    if (multiplier === 1) effectivenessResult = 'normal';
    else if (multiplier === 0) effectivenessResult = 'immune';
    else if (multiplier > 1) effectivenessResult = 'weak';
    else if (multiplier < 1) effectivenessResult = 'resistant';
    effectiveness[effectivenessResult].push([key, multiplier]);
  });
  return effectiveness;
}

function getTypeEffectivenessSectionData(parsed, isAlolan) {
  let { templates } = parsed.sections('Type effectiveness').json();
  let nextSectionIndex = parsed.sections('Type effectiveness').index();
  while (!templates) {
    nextSectionIndex++;
    const nextSection = parsed.sections(nextSectionIndex);
    if (!isAlolan || nextSection.title().indexOf('Alolan ') !== -1) {
      templates = nextSection.json().templates;
    }
  }
  return templates.pop();
}
