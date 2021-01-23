// enums
import Form from '../../common/constants/Form';
// types
import wtf from 'wtf_wikipedia';
import { RawMove, Learnset } from '../../common/types/move';
import { curry, __ } from 'ramda';

export default function getLearnset(
  parsed: wtf.Document,
  name: string,
  form: Form,
): Learnset {
  const getMovesByMethod = curry(getMoves)(__, parsed, name, form);
  return {
    leveling: getMovesByMethod('By leveling up'),
    tm: getMovesByMethod('By TM/TR'),
    breeding: getMovesByMethod('By'),
    tutoring: getMovesByMethod('By tutoring'),
    // prior: getMovesByMethod('By a prior evolution'),
  };
}

function getMoves(
  learningMethod: learningMethod,
  parsed: wtf.Document,
  name: string,
  form: Form,
): RawMove[] {
  let learnsetSection = (parsed.sections(learningMethod).json() as any).templates as LearnsetMethodSectionTemplate;
  if (!learnsetSection) {
    const formName = form ? `${form} ${name}` : name;
    learnsetSection = (parsed.sections(formName).json() as any).templates as LearnsetMethodSectionTemplate;
  }
  if (learnsetSection) {
    // get learnset table
    if (learningMethod === 'By leveling up') learnsetSection = modifyLevelingList(learnsetSection);
    else if (learningMethod === 'By') learnsetSection = modifyBreedingList(learnsetSection);
    else learnsetSection = learnsetSection.slice(1, -1);
    let moves = learnsetSection
      .filter(i => i.template.includes('null') === false)
      // TODO
      // - remove unknown
      // - add RawMove without level for tutoring,
      // - add move with first item as TM/HM instead of level
      .map(({ list }) => learningMethod === 'By tutoring' ? ['', ...list] as unknown as RawMove : list);
    return (moves.length && moves[0] !== undefined) ? moves : [];
  }
  console.error('learnset not found');
  console.error(parsed.sections());
  throw new Error('learnset not found');
}

function modifyLevelingList(learnsetSection: LearnsetMethodSectionTemplate) {
  const prunedList = learnsetSection
    .slice(2, -1); // slice the list tt template, header, and footer;
  const movesLearntByEvo = prunedList
    .filter(({ list }) => list[0] === '')
    .map(moveData => ({ ...moveData, list: ['EVO', ...moveData.list.slice(1)] as RawMove }));
  const movesLearntByLeveling = prunedList.filter(({ list }) => list[0] !== '');
  return [...movesLearntByEvo, ...movesLearntByLeveling];
}
function modifyBreedingList(learnsetSection: LearnsetMethodSectionTemplate) {
  return learnsetSection
    .filter(i => i.template.includes('msp') === false)
    .slice(1, -1) // slice the list header and footer;
}

type learningMethod =
  | 'By leveling up'
  | 'By TM/TR'
  | 'By' /** breeding */
  | 'By tutoring'
  | 'By a prior evolution'
  ;

type LearnsetMethodSectionTemplate = Array<{
  template: string;
  list: RawMove
}>;
