import React from 'react';
import PropTypes from 'prop-types';
import PokemonInfo from '../../common/components/PokemonInfo';
import Navbar from '../../common/components/Navbar';
import LayoutContainer from '../../common/components/LayoutContainer';
import Learnset from './Learnset';
import TypeEffectiveness from './TypeEffectiveness';

export default function DetailPageLayout({
  name,
  isAlolan,
  details: {
    types,
    learnset,
    typeEffectiveness,
  },
  onClickBack,
}) {
  return (
    <LayoutContainer>
      <Navbar onClickBack={onClickBack}>
        <PokemonInfo
          name={name}
          types={types}
          isAlolan={isAlolan}
          titleColor="black"
        />
      </Navbar>
      <TypeEffectiveness {...typeEffectiveness} />
      <Learnset learnset={learnset} />
    </LayoutContainer>
  );
}

DetailPageLayout.propTypes = {
  name: PropTypes.string.isRequired,
  isAlolan: PropTypes.bool,
  details: PropTypes.shape({
    types: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
    learnset: PropTypes.arrayOf(
      PropTypes.shape({
        list: PropTypes.array.isRequired,
      }).isRequired
    ).isRequired,
    typeEffectiveness: PropTypes.shape({}).isRequired,
  }).isRequired,
  onClickBack: PropTypes.func.isRequired,
};
