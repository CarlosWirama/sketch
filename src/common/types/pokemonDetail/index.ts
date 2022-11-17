import Type from "../../constants/Type";
import BaseStats from "../baseStats";
import Effectiveness from "../effectiveness";
import { Learnset } from "../move";
import { Types } from "../types";


export interface PokemonDetail {
  types: Types;
  moves: Learnset;
  baseStats: BaseStats;
  typeEffectiveness: Effectiveness;
  evolutionaryLine:  {
    name: string;
    types: Type[];
    evolutionMethod: string;
    nDex: string;
}[]
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