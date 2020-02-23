import * as React from 'react';
import Type from '../../../common/constants/Type';

export type EvolutionSection = Array<EvoMethodTemplate | EvoboxTemplate>;
/** example: [
 * 0: {template: "bag", list: ["Rare Candy"]}
 * 1: {template: "color2", list: ["000", "Level", "Level 16"]}
 * 2: {template: "bag", list: ["Rare Candy"]}
 * 3: {template: "color2", list: ["000", "Level", "Level 35"]}
 * 4: {template: "evobox-3", type1: "Grass", no1: "810", name1: "Grookey", type1-1: "Grass", no2: "811", …}
] */

export interface EvoboxTemplate {
  template: Template;
  name1: string;
  name2?: string;
  name2a?: string;
  name2b?: string;
  name3?: string;
  name3a?: string;
  name3b?: string;
  form2a?: string;
  form2b?: string;
  form3a?: string;
  form3b?: string;
  no1: string;
  no2?: string;
  no3?: string;
  no2a?: string;
  no2b?: string;
  no3a?: string;
  no3b?: string;
  type1: Type;
  'type1-1': Type;
  'type1-2'?: Type;
  'type1-3'?: Type;
  'type1-2a'?: Type;
  'type1-2b'?: Type;
  'type1-3a'?: Type;
  'type1-3b'?: Type;
  'type2-1'?: Type;
  'type2-2'?: Type;
  'type2-3'?: Type;
  'type2-2a'?: Type;
  'type2-2b'?: Type;
  'type2-3a'?: Type;
  'type2-3b'?: Type;
  family?: 'Baby' | 'Normal';
  breed?: string;
  evo1?: string;
  evo2?: string;
  evotype1?: EvolutionMethod;
  evotype1a?: EvolutionMethod;
  evotype1b?: EvolutionMethod;
  evotype2?: EvolutionMethod;
  evotype2a?: EvolutionMethod;
  evotype2b?: EvolutionMethod;
  evostone1?: EvoStone;
  evostone1a?: EvoStone;
  evostone1b?: EvoStone;
  evostone2?: EvoStone;
  evostone2a?: EvoStone;
  evostone2b?: EvoStone;
  held1?: string;
  held2?: string;
}

export interface EvoMethodTemplate {
  template: 'ms' | 'bag' | 'color2' | 'tt';
  list: [string] | ['000', EvoMethodTemplate, MethodDetail];
}

type MethodDetail = string;
type EvoMethodTemplate = 'Friendship' | 'Stone' | 'Level' | 'Trade';
type EvoStone = 'Water Stone' | 'Fire Stone' | 'Leaf Stone' | 'Thunder Stone' | 'Sun Stone' | 'Shiny Stone';

type Template =
  | 'evobox'
  | 'evobox-1'
  | 'evobox-2'
  | 'evobox-3'
  | 'evobox/1branch2'
  | 'evobox/1branch3'
  | 'evobox/1branch7'
  | 'evobox/feebas'
  | 'evobox/meowth-alola'
  | 'evobox/grubbin'
;

/** examples of evoboxData:
 * {
 *   template: "evobox-3"
 *   name1: "Grookey"
 *   name2: "Thwackey"
 *   name3: "Rillaboom"
 *   no1: "810"
 *   no2: "811"
 *   no3: "812"
 *   type1: "Grass"
 *   type1-1: "Grass"
 *   type1-2: "Grass"
 *   type1-3: "Grass"
 * }
 * {
 *   template: "evobox"
 *   name1: "Pichu"
 *   name2: "Pikachu"
 *   name3: "Raichu"
 *   name3a: "Raichu"
 *   form3a: "Alolan Form"
 *   family: "Baby"
 *   evotype1: "Friendship"
 *   evotype2: "Stone"
 *   evotype2a: "Stone"
 *   evostone2: "Thunder Stone"
 *   evostone2a: "Thunder Stone"
 *   type1-1: "Electric"
 *   type1-2: "Electric"
 *   type1-3: "Electric"
 *   type1-3a: "Electric"
 *   type2-3a: "Psychic"
 *   sprite1: "172Pichu"
 *   sprite2: "025Pikachu"
 *   sprite3: "026Raichu"
 *   sprite3a: "026Raichu-Alola"
 * }
 * {
 *   name1: "Dracovish"
 *   no1: "882"
 *   pictype: "art"
 *   template: "evobox-1"
 *   type1: "Water"
 *   type1-1: "Water"
 *   type2: "Dragon"
 *   type2-1: "Dragon"
 * }
 * {
 *   name1: "Applin"
 *   name2a: "Flapple"
 *   name2b: "Appletun"
 *   no1: "840"
 *   no2a: "841"
 *   no2b: "842"
 *   template: "evobox/1branch2"
 *   type1: "Grass"
 *   type1-1: "Grass"
 *   type1-2a: "Grass"
 *   type1-2b: "Grass"
 *   type2: "Dragon"
 *   type2-1: "Dragon"
 *   type2-2a: "Dragon"
 *   type2-2b: "Dragon"
 * }
*/
