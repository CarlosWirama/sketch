// functions
import { getSection } from '../sectionHelper';
import { keys } from 'ramda';
// enums
import { Type } from '../../common/components/Types';
// types
import wtf from 'wtf_wikipedia';
import Form from '../../common/constants/Form';


export default function getTypeEffectiveness(parsed: wtf.Document, form: Form) {
  const sectionData: RawEffectiveness = getSection(parsed, 'Type effectiveness', form)[0];
  const initialEffectiveness: Effectiveness = {
    weak: [],
    resistant: [],
    doubleWeak: [],
    doubleResistant: [],
    immune: [],
  };

  function curryPushEffectiveness (total: Effectiveness, key: Type) {
    return function (effectiveness: keyof Effectiveness) {
      return { ...total, [effectiveness]: [ ...total[effectiveness], key] };
    }
  }

  return keys(sectionData).reduce((total, key) => {
    if (isType(key)) {
      const value = sectionData[key];
      const pushEffectiveness = curryPushEffectiveness(total, key);
      switch(value) {
        case '0': return pushEffectiveness('immune');
        case '25': return pushEffectiveness('doubleResistant');
        case '50': return pushEffectiveness('resistant');
        case '200': return pushEffectiveness('weak');
        case '400': return pushEffectiveness('doubleWeak');
      }
    }
    return total;
  }, initialEffectiveness);
}

function isType (arg: string): arg is Type {
  return keys(Type).map(i => i.toString()).includes(arg);
}

interface Effectiveness {
  weak: Type[],
  resistant: Type[],
  doubleWeak: Type[],
  doubleResistant: Type[],
  immune: Type[],
}

interface RawEffectiveness {
  bug: rawEffectivenessValue,
  dark: rawEffectivenessValue,
  dragon: rawEffectivenessValue,
  electric: rawEffectivenessValue,
  fairy: rawEffectivenessValue,
  fighting: rawEffectivenessValue,
  fire: rawEffectivenessValue,
  flying: rawEffectivenessValue,
  ghost: rawEffectivenessValue,
  grass: rawEffectivenessValue,
  ground: rawEffectivenessValue,
  ice: rawEffectivenessValue,
  normal: rawEffectivenessValue,
  poison: rawEffectivenessValue,
  psychic: rawEffectivenessValue,
  rock: rawEffectivenessValue,
  steel: rawEffectivenessValue,
  template: 'typeeffectiveness',
  type1: Type,
  water: rawEffectivenessValue,
}

type rawEffectivenessValue = '0' | '25' | '50' | '100' | '200' | '400';
