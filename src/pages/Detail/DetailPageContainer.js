import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPokemonDetail } from '../../api';
import DetailPageLayout from './DetailPageLayout';

export default function DetailPageContainer({
  match: { params },
  history: { push, goBack },
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
    goBack();
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
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
