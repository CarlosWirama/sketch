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
  let name = params.pokemon;
  let isAlolan = false;
  useEffect(() => {
    getPokemonDetail(name)
    .then(learnset => setLearnset(learnset));
  }, [ params ]);
  const [ regularName, nameForAlolan ] = name.split('_');
  if (nameForAlolan) {
    name = nameForAlolan;
    isAlolan = true;
  }
  return (
    <DetailPageLayout
      name={name}
      types={['Water', 'Dragon']}
      isAlolan={isAlolan}
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
