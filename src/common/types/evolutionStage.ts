import Type from '../constants/Type';
import Form from '../constants/Form';

export default interface EvolutionStage {
  nDex: string;
  name: string;
  types: [Type] | [Type, Type];
  form: Form;
  evolutionMethod: string;
}
