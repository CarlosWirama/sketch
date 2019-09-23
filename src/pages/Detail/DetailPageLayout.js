import React from 'react';
import PropTypes from 'prop-types';
import PokemonInfo from '../../common/components/PokemonInfo';
import Navbar from '../../common/components/Navbar';
import LayoutContainer from '../../common/components/LayoutContainer';
import { default as LoadingIndicator }
  from '../../common/components/PokeballLoadingIndicator';
import LearnsetItem from './LearnsetItem';
import TypeEffectiveness from './TypeEffectiveness';
import { SectionTitle } from './DetailPageLayout.styled';

export default function DetailPageLayout({
  isLoading,
  name,
  isAlolan,
  details: {
    types,
    learnset,
    typeEffectiveness,
    evolutionaryLine,
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
        />
      </Navbar>
      {isLoading ? <LoadingIndicator/> : (
        <>
          <TypeEffectiveness {...typeEffectiveness} />
          {evolutionaryLine.map(({ name, evolutionMethod, type }, key) => (
            <div key={key}>{name} {evolutionMethod} {type}</div>
          ))}
          <SectionTitle>Moves by leveling up</SectionTitle>
          {learnset.map(({ list }, i) =>
            <LearnsetItem key={i} list={list} />
          )}
        </>
      )}
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
