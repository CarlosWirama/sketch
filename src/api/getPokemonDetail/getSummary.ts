// enums
import Form from '../../common/constants/Form';
// types
import wtf from 'wtf_wikipedia';
import { PokemonDetail, Types } from '../../common/types';

export default function getSummary(parsed: wtf.Document, form: Form) {
  const summarySection: SummarySection =
    (parsed.sections('').json() as any).infoboxes[0];
  const {
    type1, type2,
    form2type1, form2type2,
    ability1, ability2, abilityd,
    gendercode, egggroup1, egggroup2,
    evhp, evat, evde, evsa, evsd, evsp,
  } = summarySection;
  
  const evYield = Object
    .entries({evhp, evat, evde, evsa, evsd, evsp})
    .filter(([_, value]) => value !== undefined)
    .map(([key, val]) => ({
      stat: key.substring(2), // trim 'ev' from 'evhp'
      value: (val as numberWithText).number,
    }) ) as PokemonDetail['evYield']

  const capsTypes = (form === Form.Galarian) // TODO
    ? pluckText([form2type1, form2type2])
    : pluckText([type1, type2]);
  const types = capsTypes.map(str => str.toLowerCase()) as Types;
  const abilities = {
    nonHidden: pluckText([ability1, ability2]),
    hidden: (abilityd || {}).text,
  };
  const eggGroups = pluckText([egggroup1, egggroup2]);
  const genderRatio = (254 - gendercode.number) / 254;
  return { types, abilities, genderRatio, eggGroups, evYield };
}

function pluckText (array: Array<{ text: string } | undefined>) {
  return cleanArray(array).map(e => e.text);
}

function cleanArray <T>(array: Array<T | undefined>) {
  return array.filter(e => e !== undefined) as Array<T>;
}

/** any number with it's string counterpart; e.g. {text: "3", number: 3} */
interface numberWithText {
  text: string;
  number: number;
}

interface SummarySection {
  ability1: { text: string };
  ability2?: { text: string };
  'ability2-1'?: { text: string };
  abilityd?: { text: string };
  abilityn: { text: 'd' };
  // number of ability or has hidden ability
  body: numberWithText;
  catchrate: numberWithText;
  category: { text: string };
  color: { text: string };
  eggcycles: numberWithText;
  egggroup1: { text: string };
  egggroup2?: { text: string };
  egggroupn: numberWithText;
  evforms: numberWithText;
  evhp?: numberWithText;
  evat?: numberWithText;
  evat2?: numberWithText;
  evde?: numberWithText;
  evde2?: numberWithText;
  evsa?: numberWithText;
  evsa2?: numberWithText;
  evsd?: numberWithText;
  evsd2?: numberWithText;
  evsp?: numberWithText;
  evtotal: numberWithText;
  expyield: numberWithText;
  form1?: { text: string };
  form2?: { text: string };
  forme?: numberWithText;
  friendship: numberWithText;
  gendercode: numberWithText;
  generation: numberWithText;
  'height-ftin': {text: string };
  'height-ftin2'?: {text: string };
  'height-m': numberWithText;
  'height-m2'?: numberWithText;
  jname: { text: string };
  lv100exp: numberWithText;
  name: { text: string };
  ndex: numberWithText;
  pokefordex: { text: string };
  tmname: {text: "Eolb"}
  type1: { text: string };
  type2?: { text: string };
  form2type1?: { text: string };
  form2type2?: { text: string };
  'weight-kg': numberWithText;
  'weight-kg2'?: { text: string };
  'weight-lbs': numberWithText;
  'weight-lbs2'?: { text: string };
}
