import { fetchAndParseWiki } from '../apiHelper';

export default async function getPokemonDetail(name) {
  const parsed = await fetchAndParseWiki({
    page: name,
  });
  const isAlolan = name.indexOf('Alolan_') !== -1;
  const evolutionaryLine = getEvolutionaryLine(parsed, isAlolan);
  const { types, learnset } = getTypesAndLearnset(parsed, name, isAlolan);
  const typeEffectiveness = getTypeEffectiveness(parsed, isAlolan);
  return {
    types,
    learnset,
    typeEffectiveness,
    evolutionaryLine,
  };
}

// TODO: eevee, alolan, secondary evolution, item-holding trade, babies
function getEvolutionaryLine(parsed, isAlolan) {
  // evolution data structure will be vary from here
  // e.g. Squirtle will be different from Eevee, Gloom, Slowking etc.
  const evolutionData = parsed.sections('Evolution').json().templates;
  const lastNode = evolutionData.pop();
  switch (lastNode.template) {
    // case 'evobox-1': return []; // no evolutionary line. e.g: Tauros
    case 'evobox/1branch7': return []; // Eevee!
    case 'evobox': // custom evo, all evo info will present in this node
    default: // 'evobox-2' | 'evobox-3' normal evolutionary line
  }

  function composeEvolutionMethod(item, method) {
    if (method === undefined) return null;
    const [a, methodType, levelText] = method.list;
    if (levelText) return levelText; // methodType should be "Level" or "Pokémon breeding"
    // if (methodType === 'Trade') {
    //   const [itemName] = item.list;
    //   return `Trade${itemName !== 'Pal Pad' ? ` with ${itemName}` : ''}`;
    // }
    return methodType;
  }
  const [item2, method2, item3, method3] = evolutionData;
  const evolution = [
    null,
    null,
    composeEvolutionMethod(item2, method2),
    composeEvolutionMethod(item3, method3),
  ];

  function getEvotype(i) {
    switch (lastNode[`evotype${i-1}`]) {
      case undefined: return '';
      case 'Level': return `Level ${lastNode[`level${i-1}`]}`;
      case 'Stone': return lastNode[`evostone${i-1}`];
      // case 'Trade': return lastNode[`held${i-1}`];
      // case 'Friendship': ;
      default: return lastNode[`evotype${i-1}`];
    }
  }
  const evolutionaryLine = [];
  let i = 1; // vary from 1-3 (sometimes 3a, etc)
  do {
    const type1 = lastNode[`type1-${i}`];
    const type2 = lastNode[`type2-${i}`];
    const types = [type1, type2].filter(a => a); // removes undefineds
    const evolutionMethod = evolution[i] || getEvotype(i);
    const name = lastNode[`name${i}`];
    evolutionaryLine.push({ name, types, evolutionMethod });
    i++;
  } while (lastNode[`name${i}`] !== undefined);
  return evolutionaryLine;
}

function getTypesAndLearnset(parsed, name, isAlolan) {
  let types = [];
  let learnsetSection = [];
  const summarySection = parsed.sections('').json().infoboxes[0];
  const {
    type1, type2,
    form2type1, form2type2,
    lv100exp, ability1,
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
  return templates[0];
}
