import { Type } from '../../../common/components/Types';
import Form from '../../../common/constants/Form';

export interface EvolutionStages {
  nDex: string;
  name: string;
  types: [Type] | [Type, Type];
  form: Form;
  evolutionMethod: string;
}
