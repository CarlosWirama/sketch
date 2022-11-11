import React, { useEffect, useState } from 'react';
import {
  getPokemonDetail,
  updateRecentlyViewed,
  getChoosenMove,
} from '../../api';

import Learnset from './Learnset';
import { getSpeciesNameAndForm } from '../../common/utilities/pokemonForm';

// types
import { MoveItem } from '../../common/types';


export default function MovesTab({
  match: { params },
  history: { push },
}: {
  match: {
    params: {
      pokemon: string;
      generation?: string;
    };
  };
  history: {
    push: Function;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    moves: {
      leveling: [],
      machine: [],
      breed: [],
      tutor: [],
      prior: [],
    },
  });
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [choosenMoves, setChoosenMoves] = useState<MoveItem[]>([]);
  const name = params.pokemon;

  const { speciesName, form } = getSpeciesNameAndForm(name);

  // TODO: should be user-generated
  const givenName = name;
  // const isPartyPokemon = Boolean(givenName) // !== name; // TODO

  useEffect(() => {
    setIsLoading(true);
    const generation = (params.generation === 'gen_VIII') ? 8 : 7;
    getPokemonDetail(speciesName, generation, form)
      .then(setDetails as any) // TODO
      .finally(() => setIsLoading(false));
    setChoosenMoves(getChoosenMove(givenName));
    updateRecentlyViewed(name);
  }, [params]);

  function onClickEvolutionStage(pokemonName: string) {
    pokemonName.replace(' ', '_'); // for alolan
    push(`/pokemon/${pokemonName}`);
  }

  return (
    <>
      <Learnset
        learnset={details.moves}
        choosenMoves={choosenMoves}
        setChoosenMoves={setChoosenMoves}
        isEditingActive={isEditingActive}
      />
    </>
  );
}
