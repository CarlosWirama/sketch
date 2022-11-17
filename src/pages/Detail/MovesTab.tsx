import React, { useEffect, useState } from 'react';
import { getChoosenMove } from '../../api';

import Learnset from './Learnset';

// types
import { MoveItem, PokemonDetail } from '../../common/types';

export default function MovesTab({
  learnset,
  match: { params },
}: {
  learnset: PokemonDetail['moves'];
  match: {
    params: {
      pokemon: string;
      generation?: string;
    };
  };
}) {
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [choosenMoves, setChoosenMoves] = useState<MoveItem[]>([]);
  const name = params.pokemon;

  // TODO: should be user-generated
  const givenName = name;
  // const isPartyPokemon = Boolean(givenName) // !== name; // TODO

  useEffect(() => {
    setChoosenMoves(getChoosenMove(givenName));
  }, [params]);

  return (
    <Learnset
      learnset={learnset}
      choosenMoves={choosenMoves}
      setChoosenMoves={setChoosenMoves}
      isEditingActive={isEditingActive}
    />
  );
}
