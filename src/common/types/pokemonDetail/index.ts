import BaseStats from "../baseStats";
import Effectiveness from "../effectiveness";
import EvolutionStage from "../evolutionStage";
import { Learnset } from "../move";
import { Types } from "../types";


export interface PokemonDetail {
  types: Types;
  moves: Learnset;
  baseStats: BaseStats;
  typeEffectiveness: Effectiveness;
  evolutionaryLine:  EvolutionStage[];
  abilities:  {
    nonHidden: string[];
    hidden?: string;
}
  genderRatio: number;
  eggGroups: string[];
  evYield: {
    stat: 'hp' | 'at' | 'de' | 'sa' | 'sd' | 'sp';
    value: number;
}[]
}