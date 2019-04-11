import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPokemonDetail } from '../../api';
import DetailPageLayout from './DetailPageLayout';

export default function DetailPageContainer({
  match: { params },
  history: { push },
  // history: { goBack },
}) {
  const [ learnset, setLearnset ] = useState([]);
  function onClickBack() {
    push('/search');
  }
  useEffect(() => {
    getPokemonDetail(params.pokemon)
    .then(learnset => setLearnset(learnset));
  });
  return (
    <DetailPageLayout
      name={params.pokemon}
      // types={params.types}
      types={['Water', 'Dragon']}
      learnset={learnset}
      onClickBack={onClickBack}
    />
  );
}

DetailPageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pokemon: PropTypes.string.isRequired,
      // types: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    // goBack: PropTypes.func.isRequired,
  }).isRequired,
};
