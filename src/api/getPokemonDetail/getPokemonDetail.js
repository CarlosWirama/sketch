import { fetchAndParseWiki } from '../apiHelper';
import getEvolutionaryLine from './getEvolutionaryLine';

export default async function getPokemonDetail(name, generation) {
  const parsed = await fetchAndParseWiki({
    page: name,
  });
  const isAlolan = name.indexOf('Alolan_') !== -1;
  const form = isAlolan ? 'Alolan' : null;
  const evolutionaryLine = getEvolutionaryLine(parsed, isAlolan);
  const { types, abilities } = getSummary(parsed, isAlolan, generation);
  const typeEffectiveness = getTypeEffectiveness(parsed, form);
  const baseStats = getBaseStats(parsed, form);
  const learnset = getLearnset(parsed, name, isAlolan, generation);
  return {
    types,
    learnset,
    typeEffectiveness,
    evolutionaryLine,
    baseStats,
    abilities,
  };
}

function getSummary(parsed, isAlolan, generation) {
  const summarySection = parsed.sections('').json().infoboxes[0];
  const {
    type1, type2,
    form2type1, form2type2,
    lv100exp,
    ability1, ability2, abilityd,
    egggroup1,
    ndex,
  } = summarySection;
  const types = (isAlolan)
    ? pluckText([form2type1, form2type2])
    : pluckText([type1, type2]);
  const abilities = {
    nonHidden: pluckText([ability1, ability2]),
    hidden: (abilityd || {}).text,
  };
  return { types, abilities };
}

const pluckText = array => cleanArray(array).map(e => e.text);
const cleanArray = array => array.filter(e => e);

function getTypeEffectiveness(parsed, form) {
  const sectionData = getMultiformPokemonSectionData('Type effectiveness', parsed, form);
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

function getMultiformPokemonSectionData(section, parsed, form = 'Galar') {
  let { templates } = parsed.sections(section).json();
  let nextSectionIndex = parsed.sections(section).index();
  while (!templates) {
    nextSectionIndex++;
    const nextSection = parsed.sections(nextSectionIndex);
    if (nextSection.title().includes(form)) {
      templates = nextSection.json().templates;
    }
  }
  return templates[0];
}

function getBaseStats(parsed, form) {
  const baseStatsSection = getMultiformPokemonSectionData(
    'Base stats', parsed, form
  );
  const { attack, defense, hp, spatk, spdef, speed } = baseStatsSection;
  return {
    attack: Number(attack),
    defense: Number(defense),
    hp: Number(hp),
    spatk: Number(spatk),
    spdef: Number(spdef),
    speed: Number(speed),
  };
}

function getLearnset(parsed, name, isAlolan, generation) {
  let learnsetSection;
  if (isAlolan) {
    name = name.replace('_',' '); // for alolans
    learnsetSection = parsed.sections(`=${name}`).json().templates;
  } else {
    learnsetSection = parsed.sections('By leveling up').json().templates;
    if (!learnsetSection) {
      learnsetSection = parsed.sections(`=${name}`).json().templates;
    }
  }
  // get learnset table
  return learnsetSection
    .filter(i => i.template.includes(`level${generation}`));
}
