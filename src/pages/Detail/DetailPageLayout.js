import React from 'react';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UnfavoriteIcon from '@material-ui/icons/FavoriteBorder';
import PokemonInfo from '../../common/components/PokemonInfo';
import Navbar from '../../common/components/Navbar';
import LayoutContainer from '../../common/components/LayoutContainer';
import { default as LoadingIndicator }
  from '../../common/components/PokeballLoadingIndicator';
import LearnsetItem from './LearnsetItem';
import TypeEffectiveness from './TypeEffectiveness';
import EvolutionaryLine from './EvolutionaryLine';
import { SectionTitle, FixedActionButton } from './DetailPageLayout.styled';

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
  isFavorite,
  onClickBack,
  onClickFloatingButton,
  onClickEvolutionStage,
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
          <EvolutionaryLine
            pokemonName={name}
            stages={evolutionaryLine}
            onClickStage={onClickEvolutionStage}
          />
          <SectionTitle>Moves by leveling up</SectionTitle>
          <div>
            {learnset.map(({ list }, i) =>
              <LearnsetItem key={i} list={list} />
            )}
          </div>
          <FixedActionButton onClick={onClickFloatingButton} aria-label="add" >
            {isFavorite ? <FavoriteIcon /> : <UnfavoriteIcon />}
          </FixedActionButton>
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
