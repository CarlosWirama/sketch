import Type from '../constants/Type';

export type RawMove = [level, name, Type, Category, power, accuracy, pp, isChainBred?, stabIndicator?];

export interface Learnset {
  leveling: RawMove[];
  tm?: RawMove[];
  breeding?: RawMove[];
  tutoring?: RawMove[];
  prior?: RawMove[];
}

export type Category = 'Physical' | 'Special' | 'Status';

type level = string;
type name = string;
type power = string;
type accuracy = string;
type pp = string;
type isChainBred = '*' | '';
type stabIndicator = `'''` | `''`;
