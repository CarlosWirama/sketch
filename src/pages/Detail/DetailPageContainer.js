import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPokemonDetail } from '../../api';
import DetailPageLayout from './DetailPageLayout';

export default function DetailPageContainer({
  match: { params },
  history: { push },
  // history: { goBack },
}) {
  const [ details, setDetails ] = useState({
    types: [],
    learnset: [],
    typeEffectiveness: {
      normal: [],
      weak: [],
      resistant: [],
      immune: [],
    },
  });
  function onClickBack() {
    push('/search');
  }
  const name = params.pokemon;
  useEffect(() => {
    getPokemonDetail(name).then(details => setDetails(details));
  }, [ params ]);
  const alolanSeparatorIndex = name.indexOf('_');
  let nameForAlolan = '';
  if (alolanSeparatorIndex !== -1) {
    nameForAlolan = name.substr(alolanSeparatorIndex + 1);
  }
  return (
    <DetailPageLayout
      name={nameForAlolan || name}
      isAlolan={nameForAlolan !== ''}
      details={details}
      onClickBack={onClickBack}
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
    // goBack: PropTypes.func.isRequired,
  }).isRequired,
};
