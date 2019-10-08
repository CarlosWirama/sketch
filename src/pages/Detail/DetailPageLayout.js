import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import PokemonInfo from '../../common/components/PokemonInfo';
import Navbar from '../../common/components/Navbar';
import LayoutContainer from '../../common/components/LayoutContainer';
import { default as LoadingIndicator }
  from '../../common/components/PokeballLoadingIndicator';
import LearnsetItem from './LearnsetItem';
import TypeEffectiveness from './TypeEffectiveness';
import EvolutionaryLine from './EvolutionaryLine';
import EditOverviewModal from './EditOverviewModal';
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
  isEditingActive = false,
  onClickBack,
  onClickEvolutionStage,
  onClickEdit,
  savedMoves,
  onSubmitEditing,
  toggleSaveMove,
}) {    
  return (
    <LayoutContainer>
      <Navbar onClickBack={onClickBack}>
        <PokemonInfo
          name={name}
          types={types}
          isAlolan={isAlolan}
        />
        {isEditingActive ? (
          <EditOverviewModal
            savedMoves={savedMoves}
            onSave={onSubmitEditing}
          />
        ) : (
          <>
            <FixedActionButton onClick={onClickEdit} aria-label="edit">
              <AddIcon />
            </FixedActionButton>
          </>
        )}
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
            {learnset.map(({ list }, i) => (
              <LearnsetItem
                key={i}
                list={list}
                isEditingActive={isEditingActive}
                // list[1] contains move's name
                isMoveSaved={savedMoves.reduce(
                  (result, savedMove) => savedMove.name === list[1] || result,
                  false,
                )}
                toggleSaveMove={toggleSaveMove}
              />
            ))}
          </div>
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
  isLoading: PropTypes.bool,
  isEditingActive: PropTypes.bool,
  isFavorite: PropTypes.bool,
  onClickBack: PropTypes.func.isRequired,
  onClickEvolutionStage: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickFloatingButton: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  toggleSaveMove: PropTypes.func.isRequired,
};
