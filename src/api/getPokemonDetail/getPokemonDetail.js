import { fetchAndParseWiki } from '../apiHelper';
import getEvolutionaryLine from './getEvolutionaryLine';
import Form from '../../common/constants/Form';
import { getSection } from '../sectionHelper';

export default async function getPokemonDetail(speciesName, generation, form) {
  const parsed = await fetchAndParseWiki({
    page: speciesName,
  });
  const { types, abilities, genderRatio, eggGroups } = getSummary(parsed, form);
  const evolutionaryLine = getEvolutionaryLine(parsed, form, generation);
  const baseStats = getBaseStats(parsed, form);
  const typeEffectiveness = getTypeEffectiveness(parsed, form);
  const learnset = getLearnset(parsed, speciesName, form, generation);
  return {
    types,
    learnset,
    baseStats,
    typeEffectiveness,
    evolutionaryLine,
    abilities,
    genderRatio,
    eggGroups,
  };
}

function getSummary(parsed, form) {
  const summarySection = parsed.sections('').json().infoboxes[0];
  const {
    type1, type2,
    form2type1, form2type2,
    lv100exp,
    ability1, ability2, abilityd,
    gendercode, egggroup1, egggroup2,
  } = summarySection;
  const types = (form === Form.Galarian) // TODO
    ? pluckText([form2type1, form2type2])
    : pluckText([type1, type2]);
  const abilities = {
    nonHidden: pluckText([ability1, ability2]),
    hidden: (abilityd || {}).text,
  };
  const eggGroups = pluckText([egggroup1, egggroup2]);
  const genderRatio = (254 - gendercode.number) / 254;
  return { types, abilities, genderRatio, eggGroups };
}

const pluckText = array => cleanArray(array).map(e => e.text);
const cleanArray = array => array.filter(e => e);

function getTypeEffectiveness(parsed, form) {
  const sectionData = getSection(parsed, 'Type effectiveness', form);
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

function getBaseStats(parsed, form) {
  const baseStatsSection = getSection(
    parsed, 'Base Stats', form
  );
  const { attack, defense, hp, spatk, spdef, speed } = baseStatsSection[0];
  return {
    attack: Number(attack),
    defense: Number(defense),
    hp: Number(hp),
    spatk: Number(spatk),
    spdef: Number(spdef),
    speed: Number(speed),
  };
}

function getLearnset(parsed, speciesName, form, generation) {
  let learnsetSection = parsed.sections('By leveling up').json().templates;
  if (!learnsetSection) {
    const formName = form ? `${form} ${speciesName}` : speciesName;
    learnsetSection = parsed.sections(formName).json().templates;
  }
  if (learnsetSection) {
    // get learnset table
    return learnsetSection
      .filter(i => i.template.includes(`level${generation}`));
  }
  console.error('learnset not found');
  console.error(parsed.sections());
  throw new Error('learnset not found');
}
