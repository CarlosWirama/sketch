import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getPokemonDetail,
  updateRecentlyViewed,
  checkFavorite,
  toggleFavorite,
} from '../../api';
import DetailPageLayout from './DetailPageLayout';

export default function DetailPageContainer({
  match: { params },
  history: { push },
}) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ details, setDetails ] = useState({
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
  const [ isFavorite, setIsFavorite ] = useState(false);
  const [ markings, setMarkings ] = useState(new Array(7).fill(0));
  const [, forceUpdate] = useState();
  const name = params.pokemon;

  useEffect(() => {
    setIsLoading(true);
    getPokemonDetail(name)
      .then(setDetails)
      .finally(() => setIsLoading(false));
    checkFavorite(name).then(setIsFavorite);
    updateRecentlyViewed(name);
  }, [ params ]);

  function onMark(markingIndex) { // markingIndex: number
    const newMarkings = markings;
    newMarkings[markingIndex] = (newMarkings[markingIndex] + 1) % 3;
    setMarkings(newMarkings);
    forceUpdate();
  }

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

  const alolanSeparatorIndex = name.indexOf('_');
  let nameForAlolan = '';
  if (alolanSeparatorIndex !== -1) {
    nameForAlolan = name.substr(alolanSeparatorIndex + 1);
  }
  return (
    <DetailPageLayout
      isLoading={isLoading}
      name={nameForAlolan || name}
      isAlolan={nameForAlolan !== ''}
      details={details}
      isFavorite={isFavorite}
      markings={markings}
      onMark={onMark}
      onClickBack={onClickBack}
      onClickFloatingButton={onClickFloatingButton}
      onClickEvolutionStage={onClickEvolutionStage}
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
