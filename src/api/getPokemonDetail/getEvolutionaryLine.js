import specificEvolution from './specificEvolution';

// TODO: eevee, alolan, secondary evolution, item-holding trade, babies
export default function getEvolutionaryLine(parsed, form) {
  const GENERATION_I = 1;
  const isAlolan = form === 'Alolan';
  // evolution data structure will be vary from here
  // e.g. Squirtle will be different from Eevee, Gloom, Slowking etc.
  let evolutionData = parsed.sections('Evolution').json().templates;
  const hasAlolanForm = evolutionData === undefined;
  if (hasAlolanForm) {
    let sectionIndex = parsed.sections('Evolution').index() + 1;
    isAlolan && sectionIndex++;
    evolutionData = parsed.sections(sectionIndex).json().templates;
  }
  const lastNode = evolutionData.pop();
  switch (lastNode.template) {
    // case 'evobox-1': return []; // no evolutionary line. e.g: Tauros
    case 'evobox/1branch7': return specificEvolution['Eevee'];
    case 'evobox/meowth-alola': return specificEvolution['Alolan Meowth'];
    case 'evobox': // custom evo, all evo info will present in this node
    default: // 'evobox-2' | 'evobox-3' normal evolutionary line
  }

  const evolutionaryLine = [];
  let i = 1; // vary from 1-3 (sometimes 3a, etc)
  do {
    let evolutionMethod = getEvotype(i-1); // later should handle '2a', etc.

    if (evolutionMethod.includes('Breed')) {
      // rearrange stages, set Breed method to basic stage (previous stage)
      if (evolutionaryLine[0]) {
        evolutionaryLine[0].evolutionMethod = evolutionMethod;
      }
      evolutionMethod = getEvotype(i-1); // invoke once again
    }
    // filter whether this evolution stage applicable for current Generation
    const type1 = lastNode[`type1-${i}`];
    const type2 = lastNode[`type2-${i}`];
    evolutionaryLine.push({
      evolutionMethod,
      name: lastNode[`name${i}`],
      types: [type1, type2].filter(a => a), // removes undefineds
      isAlolan: hasAlolanForm && isAlolan, // exclude Cubone, Exeggcute
    });
    i++;
  } while (lastNode[`name${i}`] !== undefined);
  return evolutionaryLine.filter(({ evolutionMethod }, i) =>
    filterApplicableEvolution(GENERATION_I, evolutionMethod, evolutionaryLine, i),
  );

  function getAdditionalMethodItem(i, isBreeded) {
    return isBreeded
      ? lastNode.breed ? ` ${lastNode.breed} ` : ''
      : lastNode[`evo${i}`] ? ` ${lastNode[`evo${i}`]} ` : '';
  }
  
  function composeEvolutionMethod(i) {
    const currEvolutionDataNode = evolutionData.shift();
    if (currEvolutionDataNode.template === 'tt') {
      return currEvolutionDataNode.list.shift();
    } else if (currEvolutionDataNode.template !== 'color2') {
      return composeEvolutionMethod(i); // try popping again
    }
  
    let method = currEvolutionDataNode.list.pop();
    if (method === 'Alola Form') return ''; // bypass Exeggutor defects

    const isBreeded = method === 'Breed';
    method += getAdditionalMethodItem(i, isBreeded);
  
    const addition = evolutionData.shift();
    if (addition && addition.template === 'color2') {
      // have additional condition like specific holdItem or region
      method += addition.list.pop();
    }
    return method;
  }
  
  function getEvotype(i) {
    const isBreeded = (lastNode.family === 'Baby');
    /*  if (i === 0) and (lastNode.family !== 'Baby') means
          the evo data will be inside the remaining evolutionData array
          it'll be handled in the next iteration
        if (i === 0) but (lastNode.family === 'Baby') means
          we just have to get all data from lastNode object in this iteration
    */
    if (i < 1 && !isBreeded) return ''; // basic stage;
    let additionConditionForAlolan = null;
    if (evolutionData.length) {
      const methodFromArray = composeEvolutionMethod(i);
      if (isNaN(methodFromArray)) return methodFromArray;
      additionConditionForAlolan = methodFromArray;
    }
    let method = '';
    switch (lastNode[`evotype${i}`]) {
      case undefined: break; // basic stage
      case 'Level': {
        if (additionConditionForAlolan) { // for cubone
          method = `Level ${additionConditionForAlolan}`;
        } else {
          method = `Level ${lastNode[`level${i}`]}`;
        }
        break;
      }
      case 'Stone': method = lastNode[`evostone${i}`]; break;
      case 'Trade': {
        const holdItem = lastNode[`held${i}`];
        method = holdItem ? `Trade holding ${holdItem}` : 'Trade';
        break;
      }
      // case 'Friendship': ;
      default: method = lastNode[`evotype${i}`];
    }
    if (isBreeded && i === 0) method = 'Breed';
    method += getAdditionalMethodItem(i, isBreeded);
    if (lastNode[`gender${i}`]) method += lastNode[`gender${i}`];
    return method;
  }
  
  function filterApplicableEvolution(generation, method, evolutionaryLine, i) {
    function handleBreedMethod() {
      if (generation < supportedGeneration) { // not supported
        // removing breed method means we should
        // also remove evolutionMethod from next stage
        evolutionaryLine[i+1].evolutionMethod = '';
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
