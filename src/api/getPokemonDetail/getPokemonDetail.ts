import wtf from 'wtf_wikipedia';
import { fetchAndParseWiki } from '../apiHelper';
import getSummary from './getSummary';
import getEvolutionaryLine from './getEvolutionaryLine';
import { getSection } from '../sectionHelper';
import getTypeEffectiveness from './getTypeEffectiveness';
import getMoves from './getMoves';

// types
import { Learnset} from '../../common/types/move';
import Form from '../../common/constants/Form';
import BaseStats from '../../common/types/baseStats';

export default async function getPokemonDetail(speciesName: string, generation: number, form: Form) {
  const parsed = await fetchAndParseWiki({ page: speciesName });
  const { types, abilities, genderRatio, eggGroups } = getSummary(parsed, form);
  const evolutionaryLine = getEvolutionaryLine(parsed, form, generation);
  const baseStats: BaseStats = getBaseStats(parsed, form);
  const typeEffectiveness = getTypeEffectiveness(parsed, form);
  const moves: Learnset = getMoves(parsed, speciesName, form);
  return {
    types,
    moves,
    baseStats,
    typeEffectiveness,
    evolutionaryLine,
    abilities,
    genderRatio,
    eggGroups,
  };
}

function getBaseStats(parsed: wtf.Document, form: Form): BaseStats {
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
