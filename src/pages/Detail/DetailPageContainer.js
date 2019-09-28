import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPokemonDetail } from '../../api';
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
  function onClickBack() {
    push('/search');
  }
  function onClickEvolutionStage(pokemonName) {
    pokemonName.replace(' ', '_'); // for alolan
    push(`/pokemon/${pokemonName}`);
  }
  const name = params.pokemon;
  useEffect(() => {
    setIsLoading(true);
    getPokemonDetail(name).then(details => {
      setDetails(details);
      setIsLoading(false);
    });
    updateRecentlyViewed(name);
  }, [ params ]);
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
      onClickBack={onClickBack}
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

async function updateRecentlyViewed(name) {
  const rawPrevList = await localStorage.getItem('recentlyViewed') || '';
  const prevList = rawPrevList.split(',').filter(e => e);
  const existingIndexForThisPokemon = prevList.indexOf(name);
  if (existingIndexForThisPokemon !== -1) {
    // remove this pokemon from list
    prevList.splice(existingIndexForThisPokemon, 1);
  }
  prevList.unshift(name); // add to the most recent
  const result = prevList.slice(0, 4).join(','); // get the first 5
  localStorage.setItem('recentlyViewed', result.toLowerCase());
}
