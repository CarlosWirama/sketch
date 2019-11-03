import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getPokemonDetail,
  updateRecentlyViewed,
  checkFavorite,
  toggleFavorite,
  getChoosenMove,
  saveToParty,
} from '../../api';
import DetailPageLayout from './DetailPageLayout';

export default function DetailPageContainer({
  match: { params },
  history: { push },
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    types: [],
    learnset: [],
    typeEffectiveness: {
      normal: [],
      weak: [],
      resistant: [],
      immune: [],
    },
    evolutionaryLine: [],
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [choosenMoves, setChoosenMoves] = useState([]);
  // [
  //   {
  //     name: 'Bite',
  //     type: 'dark',
  //   },
  //   {
  //     name: 'Double-Edge',
  //     type: 'normal',
  //   },
  //   {
  //     name: 'Dig',
  //     type: 'ground',
  //   },
  //   {
  //     name: 'Extreme Speed',
  //     type: 'normal',
  //   },
  // ]
  const name = params.pokemon;

  function toggleChoosenMove(move) {
    const newChoosenMoves = choosenMoves
      .filter(({ name }) => name !== move.name);
    if (newChoosenMoves.length === choosenMoves.length) {
      newChoosenMoves.unshift(move);
    }
    setChoosenMoves(newChoosenMoves.slice(0, 4)); // get the latest 4;
  }

  const alolanSeparatorIndex = name.indexOf('_');
  let nameForAlolan = '';
  if (alolanSeparatorIndex !== -1) {
    nameForAlolan = name.substr(alolanSeparatorIndex + 1);
  }

  // TODO: should be user-generated
  const givenName = name;

  useEffect(() => {
    setIsLoading(true);
    getPokemonDetail(name)
      .then(setDetails)
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

  function onClickEvolutionStage(pokemonName) {
    pokemonName.replace(' ', '_'); // for alolan
    push(`/pokemon/${pokemonName}`);
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

  return (
    <DetailPageLayout
      isLoading={isLoading}
      name={nameForAlolan || name}
      isAlolan={nameForAlolan !== ''}
      details={details}
      isEditingActive={isEditingActive}
      onClickBack={onClickBack}
      choosenMoves={choosenMoves}
      onClickEdit={setEditingOn}
      onClickEvolutionStage={onClickEvolutionStage}
      onSubmitEditing={saveEditing}
      toggleChoosenMove={toggleChoosenMove}
    />
  );
}

DetailPageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pokemon: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
