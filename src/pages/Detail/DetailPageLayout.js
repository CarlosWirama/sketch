import React from 'react';
import PropTypes from 'prop-types';
import PokemonInfo from '../../common/components/PokemonInfo';
import Navbar from '../../common/components/Navbar';
import LayoutContainer from '../../common/components/LayoutContainer';
import Learnset from './Learnset';

export default function DetailPageLayout({
  name,
  types,
  learnset,
  onClickBack,
}) {
  return (
    <LayoutContainer>
      <Navbar onClickBack={onClickBack}>
        <PokemonInfo name={name} types={types} titleColor="black" />
      </Navbar>
      <Learnset learnset={learnset} />
    </LayoutContainer>
  );
}

DetailPageLayout.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  learnset: PropTypes.arrayOf(
    PropTypes.shape({
      list: PropTypes.array.isRequired,
    }).isRequired
  ).isRequired,
  onClickBack: PropTypes.func.isRequired,
};
