import React, { useEffect, useState } from 'react';
import {
  getPokemonDetail,
  updateRecentlyViewed,
  checkFavorite,
  toggleFavorite,
  getChoosenMove,
  saveToParty,
} from '../../api';

import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
// import PokeballIcon from '../../common/components/Pokeball';
// import { color } from '../../common/theme';
import PokemonInfo from '../../common/components/PokemonInfo';
import Navbar from '../../common/components/Navbar';
import LayoutContainer from '../../common/components/LayoutContainer';
import LoadingIndicator
from '../../common/components/PokeballLoadingIndicator';
// import Marking from '../../common/components/Marking';
import Learnset from './Learnset';
import BasicInfoTab from './BasicInfoTab';
import EditOverviewModal from './EditOverviewModal';

import { MoveItem } from '../../common/types/partyType';
import Type from '../../common/constants/Type';

import { getSpeciesNameAndForm } from '../../common/utilities/pokemonForm';
import EvolutionStage from '../../common/types/evolutionStage';

export default function DetailPageContainer({
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
    types: [Type['???']] as [Type] | [Type, Type],
    moves: {
      leveling: [],
      machine: [],
      breed: [],
      tutor: [],
      prior: [],
    },
    typeEffectiveness: {
      immune: [],
      doubleResistant: [],
      resistant: [],
      weak: [],
      doubleWeak: [],
    },
    evolutionaryLine: [] as EvolutionStage[],
    baseStats: { attack: 0, defense: 0, hp: 0, spatk: 0, spdef: 0, speed: 0 },
    abilities: { nonHidden: [] },
    genderRatio: 0,
    eggGroups: [],
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [choosenMoves, setChoosenMoves] = useState<MoveItem[]>([]);
  const name = params.pokemon;

  const { speciesName, form } = getSpeciesNameAndForm(name);

  // TODO: should be user-generated
  const givenName = name;
  // const isPartyPokemon = Boolean(givenName) // !== name; // TODO

  useEffect(() => {
    setIsLoading(true);
    const generation = (params.generation === 'gen_VII') ? 7 : 8;
    getPokemonDetail(speciesName, generation, form)
      .then(setDetails as any) // TODO
      .finally(() => setIsLoading(false));
    checkFavorite(name).then(setIsFavorite);
    setChoosenMoves(getChoosenMove(givenName));
    updateRecentlyViewed(name);
  }, [ params ]);

  function onClickBack() {
    push('/search');
  }

  function onClickFloatingButton() {
    toggleFavorite(name, !isFavorite);
    setIsFavorite(!isFavorite);
  }

  function setEditingOn() {
    setIsEditingActive(true);
  }

  function saveEditing() {
    setIsEditingActive(false);
    saveToParty({
      givenName,
      species: name,
      moves: choosenMoves,
    });
  }

  const RightButton = (
    <IconButton
      onClick={isEditingActive ? saveEditing : setEditingOn}
      aria-label="edit"
      style={{ position: 'absolute', right: 0 }}
    >
      {isEditingActive ? <DoneIcon /> : <AddIcon />
        // : <PokeballIcon size={254} color="gray" background={color.primary} /> // TODO
      }
    </IconButton>
  );

  return (
    <LayoutContainer>
      <Navbar onClickBack={onClickBack} right={RightButton}>
        <PokemonInfo
          name={speciesName}
          types={details.types}
          form={form}
        />
        {isEditingActive && <EditOverviewModal choosenMoves={choosenMoves} />}
      </Navbar>
      {isLoading ? <LoadingIndicator/> : (
        <>
          <BasicInfoTab
            baseStats={details.baseStats}
            abilities={details.abilities}
            genderRatio={details.genderRatio}
            eggGroups={details.eggGroups}
            typeEffectiveness={details.typeEffectiveness}
            evolutionaryLine={details.evolutionaryLine}
          />
          <Learnset
            learnset={details.moves}
            choosenMoves={choosenMoves}
            setChoosenMoves={setChoosenMoves}
            isEditingActive={isEditingActive}
          />
        </>
      )}
      </LayoutContainer>
  );
}
