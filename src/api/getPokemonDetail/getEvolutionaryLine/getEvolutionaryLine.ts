import specificEvolution from '../specificEvolution';
import { getSection } from '../../sectionHelper';
import { EvolutionSection, EvoboxTemplate, EvoMethodTemplate } from './evolution-wiki';
import Form from '../../../common/constants/Form';
import { EvolutionStages } from './types';
import wtf from 'wtf_wikipedia';
import Type from '../../../common/constants/Type';

export default function getEvolutionaryLine(parsed: wtf.Document, form: Form, generation: number) {
  // evolution data structure will be vary from here
  // e.g. Squirtle will be different from Eevee, Gloom, Slowking etc.

  console.log(getSection(parsed, 'Evolution', form));
  const evolutionSection: EvolutionSection = [...getSection(parsed, 'Evolution', form)];
  const evoboxData = evolutionSection.pop() as EvoboxTemplate;
  const evolutionDetails = evolutionSection as Array<EvoMethodTemplate>;
  // now evolutionDetails is EvoMethodTemplate[]

  // return specific evolution immediately 
  switch (evoboxData.template) {
    // case 'evobox-1': return []; // no evolutionary line. e.g: Tauros
    case 'evobox/meowth-alola': return specificEvolution['Alolan Meowth'];
    case 'evobox/feebas': return specificEvolution['Feebas'];
    case 'evobox/grubbin': return specificEvolution['Grubbin'];
    case 'evobox/1branch7': return specificEvolution['Eevee_GEN_VI'];
    case 'evobox/1branch3': return specificEvolution['Tyrogue'];
    case 'evobox/1branch2': // TODO // e.g.: Applin
    case 'evobox': // custom evo
    default: // 'evobox-2' | 'evobox-3' normal evolutionary line
  }

  const evolutionaryLine: EvolutionStages[] = [];
  let evolutionStage = 1; // vary from 1-3 (sometimes 3a, etc)

  while (evoboxData[`name${evolutionStage}` as 'name1' | 'name2' | 'name3'] !== undefined) {
    let evolutionMethod = getEvolutionMethod(evolutionStage - 1 as any); // later should handle '2a', etc.

    if (evolutionMethod.includes('Breed')) { // always happens in stage 1
      // rearrange stages, set Breed method to basic stage (previous stage)
      if (evolutionaryLine[0]) {
        evolutionaryLine[0].evolutionMethod = evolutionMethod;
      } 
      evolutionMethod = getEvolutionMethod(evolutionStage + 1 as any); // invoke once again
    }
    // filter whether this evolution stage applicable for current Generation
    const type1 = evoboxData[`type1-${evolutionStage}` as 'type1-1' | 'type1-2'];
    const type2 = evoboxData[`type2-${evolutionStage}` as 'type2-1' | 'type2-2'];
    const nDex = (evoboxData[`no${evolutionStage}` as 'no1' | 'no2' | 'no3'] || '').slice(0,3);
    evolutionaryLine.push({
      evolutionMethod,
      form,
      nDex,
      name: evoboxData[`name${evolutionStage}` as 'name1' | 'name2' | 'name3'] || '',
      types: [type1, type2].filter(a => a) as [Type] | [Type, Type],
    });
    evolutionStage++;
  };

  return evolutionaryLine.filter(({ evolutionMethod }, index) =>
    filterApplicableEvolution(generation, evolutionMethod, evolutionaryLine, index),
  );

  function getEvolutionItem(i: number, isBreeded: boolean) {
    const evolutionItem = isBreeded
      ? evoboxData.breed
      : evoboxData[`evo${i}` as keyof EvoboxTemplate]; // 'evo1' | 'evo2'
    return evolutionItem || '';
  }

  function composeEvolutionMethod(evolutionStage_zeroBased: 0 | 1 | 2): string {
    const currEvolutionStageNode = evolutionDetails.shift();
    const { template, list = [] } = currEvolutionStageNode || {};
    if (template === 'tt') {
      return list[list.length - 1].toString();
    } else if (template !== 'color2') {
      return composeEvolutionMethod(evolutionStage_zeroBased); // try popping again
    }
  
    let method = list[list.length - 1].toString();
    if (method === 'Alola Form') return ''; // bypass Exeggutor defects

    const isBreeded = method === 'Breed';
    const evolutionItem = getEvolutionItem(evolutionStage_zeroBased, isBreeded);
    if (evolutionItem) method += ` ${evolutionItem}`;
  
    const addition = evolutionDetails.shift(); // keep shifting until template !== 'color2'
    if (addition && addition.template === 'color2') {
      // have additional condition like specific holdItem or region
      method += ` ${addition.list[addition.list.length - 1]}`;
      
    }
    return method;
  }

  function getEvolutionMethod(evolutionStage_zeroBased: 0 | 1 | 2) {
    const hasBabyStage = (evoboxData.family === 'Baby');
    /*  if (i === 0) and (evoboxData.family !== 'Baby') means
          the evo data will be inside the remaining evolutionData array
          it'll be handled in the next iteration
        if (i === 0) but (evoboxData.family === 'Baby') means
          we just have to get all data from evoboxData object in this iteration
    */
    if (evolutionStage_zeroBased < 1 && !hasBabyStage) {
      return ''; // basic stage; doesnt have evo method
    }
    let additionConditionForAlolan = null;
    if (evolutionDetails.length) {
      const methodFromArray = composeEvolutionMethod(evolutionStage_zeroBased);
      if (isNaN(Number(methodFromArray))) return methodFromArray;
      additionConditionForAlolan = methodFromArray;
    }
    let method = '';
    const currentEvotype = evoboxData[`evotype${evolutionStage_zeroBased}` as 'evotype1' | 'evotype2'];
    switch (currentEvotype) {
      case undefined: break; // basic stage
      case 'Level': {
        if (additionConditionForAlolan) { // for cubone
          method = `Level ${additionConditionForAlolan}`;
        } else {
          method = `Level ${evoboxData[`level${evolutionStage_zeroBased}` as keyof EvoboxTemplate]}`;
        }
        break;
      }
      case 'Stone': method = evoboxData[`evostone${evolutionStage_zeroBased}` as keyof EvoboxTemplate] as string; break;
      case 'Trade': {
        const holdItem = evoboxData[`held${evolutionStage_zeroBased}` as keyof EvoboxTemplate];
        method = holdItem ? `Trade holding ${holdItem}` : 'Trade';
        break;
      }
      case 'Friendship': method = 'Friendship'; break;
      default: method = currentEvotype;
    }
    if (hasBabyStage && evolutionStage_zeroBased === 0) method = 'Breed';
    method += getEvolutionItem(evolutionStage_zeroBased, hasBabyStage);
    const currentGenderMethod = evoboxData[`gender${evolutionStage_zeroBased}` as keyof EvoboxTemplate];
    if (currentGenderMethod) {
      method += currentGenderMethod;
    }
    return method;
  }

  function filterApplicableEvolution(generation: number, method: string, evolutionaryLine: EvolutionStages[], index: number) {
    function handleBreedMethod(supportedGeneration: number) {
      if (generation < supportedGeneration) { // not supported
        // removing breed method means we should
        // also remove evolutionMethod from next stage
        evolutionaryLine[index+1].evolutionMethod = '';
      }
    }
    let supportedGeneration = 1;
    if (method.includes('Trade holding')) {
      supportedGeneration = 2;
    } else if (method.includes('knowing')) { // knowing certain move
      supportedGeneration = 4;
    } else if (method.includes('Breed holding')) { // Breeded with heldItem
      supportedGeneration = 4;
      handleBreedMethod(supportedGeneration);
    } else switch (method) {
      // case 'Sun Stone': supportedGeneration = 2; break; // bellossom
      // https://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution
      case 'Friendship': supportedGeneration = 2; break;
      case 'Breed': {
        supportedGeneration = 2;
        handleBreedMethod(supportedGeneration);
        break; // babies
      }
      case 'Galar': supportedGeneration = 8; break;
      default: break;
    }
    return generation >= supportedGeneration;
  }
}
