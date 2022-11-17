import React from 'react';

import BaseStats from './BaseStats';
import Abilities from './Abilities';
import BreedingInfo from './BreedingInfo';
import TypeEffectiveness from './TypeEffectiveness';
import EvolutionaryLine from './EvolutionaryLine';
import EvYield from './EvYield';

import { getSpeciesNameAndForm } from '../../common/utilities/pokemonForm';
import { useHistory, useParams } from 'react-router-dom';

// types
import { PokemonDetail } from '../../common/types';

type BasicInfoTabProps = Pick<
  PokemonDetail,
  | 'baseStats'
  | 'abilities'
  | 'genderRatio'
  | 'eggGroups'
  | 'typeEffectiveness'
  | 'evYield'
  | 'evolutionaryLine'
>;

export default function BasicInfoTab({
  baseStats,
  abilities,
  genderRatio,
  eggGroups,
  typeEffectiveness,
  evolutionaryLine,
  evYield,
}: BasicInfoTabProps) {
  const { push } = useHistory();
  const { pokemon: name } = useParams();

  const { speciesName } = getSpeciesNameAndForm(name || '');

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
