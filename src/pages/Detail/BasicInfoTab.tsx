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

import { MoveItem } from '../../common/types/partyType';
import Type from '../../common/constants/Type';

import { getSpeciesNameAndForm } from '../../common/utilities/pokemonForm';
import Effectiveness from '../../common/types/effectiveness';
import EvolutionStage from '../../common/types/evolutionStage';
import { useHistory, useParams } from 'react-router-dom';

interface BasicInfoTabProps {
  baseStats: {
    attack: number;
    defense: number;
    hp: number;
    spatk: number;
    spdef: number;
    speed: number;
  };
  abilities: { nonHidden: string[]; hidden?: string };
  genderRatio: number;
  eggGroups: string[];
  typeEffectiveness: Effectiveness;
  evolutionaryLine: EvolutionStage[];
}

export default function BasicInfoTab({
  baseStats,
  abilities,
  genderRatio,
  eggGroups,
  typeEffectiveness,
  evolutionaryLine,
}: BasicInfoTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    types: [Type['???']] as [Type] | [Type, Type],
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
    const generation = (generationParams === 'gen_VII') ? 7 : 8;
    getPokemonDetail(speciesName, generation, form)
      .then(setDetails as any) // TODO
      .finally(() => setIsLoading(false));
    givenName && setChoosenMoves(getChoosenMove(givenName));
    name && updateRecentlyViewed(name);
  }, [ name ]);

  function onClickEvolutionStage(pokemonName: string) {
    pokemonName.replace(' ', '_'); // for alolan
    push(`/pokemon/${pokemonName}`);
  }

  return (
    <>
      <TypeEffectiveness {...typeEffectiveness} />
      <BaseStats {...baseStats} />
      <Abilities {...abilities} />
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
