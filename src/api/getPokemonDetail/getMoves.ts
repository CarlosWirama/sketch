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
      prior: getMovesByMethod('By a prior evolution'),
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
    const moves = learnsetSection
      .filter(i =>
        i.template.includes('tt') === false &&
        i.template.includes('msp') === false // for breeding mini-sprite data
      )
      .slice(1, -1)
      .map(({ list }) => learningMethod === 'By tutoring' ? ['', ...list] as RawMove : list);
    return (moves.length && moves[0] !== undefined) ? moves : [];
  }
  console.error('learnset not found');
  console.error(parsed.sections());
  throw new Error('learnset not found');
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
