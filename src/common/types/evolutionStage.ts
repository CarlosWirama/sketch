import Form from '../constants/Form';
import { Types } from '.';

export default interface EvolutionStage {
  nDex: string;
  name: string;
  types: Types;
  form: Form;
  evolutionMethod: string;
}
