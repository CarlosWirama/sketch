import Type from '../constants/Type';

export default interface Effectiveness {
  weak: Type[],
  resistant: Type[],
  doubleWeak: Type[],
  doubleResistant: Type[],
  immune: Type[],
}
