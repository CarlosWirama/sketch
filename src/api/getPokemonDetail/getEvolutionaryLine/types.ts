import Type from '../../../common/constants/Type';
import Form from '../../../common/constants/Form';

export interface EvolutionStages {
  nDex: string;
  name: string;
  types: [Type] | [Type, Type];
  form: Form;
  evolutionMethod: string;
}
