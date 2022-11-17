import React, { useEffect, useState } from 'react';
import {
  getPokemonDetail,
  updateRecentlyViewed,
  getChoosenMove,
} from '../../api';

import BaseStats from './BaseStats';
import Abilities from './Abilities';
import BreedingInfo from './BreedingInfo';
import TypeEffectiveness from './TypeEffectiveness';
import EvolutionaryLine from './EvolutionaryLine';
import EvYield from './EvYield';

import Type from '../../common/constants/Type';

import { getSpeciesNameAndForm } from '../../common/utilities/pokemonForm';
import { useHistory, useParams } from 'react-router-dom';

// types
import {
  EvolutionStage,
  MoveItem,
  PokemonDetail,
  Types,
} from '../../common/types';

  type BasicInfoTabProps = Pick<PokemonDetail, 'baseStats' | 'abilities' | 'genderRatio' | 'eggGroups' | 'typeEffectiveness' | 'evYield'> & {
  evolutionaryLine: EvolutionStage[];
  };

export default function BasicInfoTab({
  baseStats,
  abilities,
  genderRatio,
  eggGroups,
  typeEffectiveness,
  evolutionaryLine,
  evYield,
}: BasicInfoTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    types: [Type['???']] as Types,
  });
  const { push } = useHistory();
  const [choosenMoves, setChoosenMoves] = useState<MoveItem[]>([]);
  const { pokemon: name, generation: generationParams } = useParams();

  const { speciesName, form } = getSpeciesNameAndForm(name || '');

  // TODO: should be user-generated
  const givenName = name;
  // const isPartyPokemon = Boolean(givenName) // !== name; // TODO

  useEffect(() => {
    setIsLoading(true);
    const generation = (generationParams === 'gen_VIII') ? 8 : 7;
    getPokemonDetail(speciesName, generation, form)
      .then(setDetails as any) // TODO
      .finally(() => setIsLoading(false));
    givenName && setChoosenMoves(getChoosenMove(givenName));
    name && updateRecentlyViewed(name);
  }, [name]);

  function onClickEvolutionStage(pokemonName: string) {
    pokemonName.replace(' ', '_'); // for alolan
    push(`/pokemon/${pokemonName}`);
  }

  return (
    <>
      <TypeEffectiveness {...typeEffectiveness} />
      <BaseStats {...baseStats} />
      <Abilities {...abilities} />
      <EvYield yields={evYield} />
      <EvolutionaryLine
        pokemonName={speciesName}
        stages={evolutionaryLine}
        onClickStage={onClickEvolutionStage}
      />
      <BreedingInfo
        genderRatio={genderRatio}
        eggGroups={eggGroups}
      />
    </>
  );
}
