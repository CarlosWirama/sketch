import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
// import PokeballIcon from '../../common/components/Pokeball';
// import { color } from '../../common/theme';
import PokemonInfo from '../../common/components/PokemonInfo';
import Navbar from '../../common/components/Navbar';
import LayoutContainer from '../../common/components/LayoutContainer';
import LoadingIndicator
  from '../../common/components/PokeballLoadingIndicator';
import LearnsetItem from './LearnsetItem';
import TypeEffectiveness from './TypeEffectiveness';
import EvolutionaryLine from './EvolutionaryLine';
import EditOverviewModal from './EditOverviewModal';
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
  isEditingActive = false,
  onClickBack,
  onClickEvolutionStage,
  onClickEdit,
  choosenMoves,
  onSubmitEditing,
  toggleChoosenMove,
}) {
  const RightButton = (
    <IconButton
      onClick={isEditingActive ? onSubmitEditing : onClickEdit}
      aria-label="edit"
      style={{ position: 'absolute', right: 0 }}
    >
      {isEditingActive ? <DoneIcon /> : <AddIcon />
        // : <PokeballIcon size={254} color="gray" background={color.primary} />
      }
    </IconButton>
  );
  return (
    <LayoutContainer>
      <Navbar onClickBack={onClickBack} right={RightButton} >
        <PokemonInfo
          name={name}
          types={types}
          isAlolan={isAlolan}
        />
        {isEditingActive && <EditOverviewModal choosenMoves={choosenMoves} />}
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
                isMoveChoosen={choosenMoves.reduce(
                  (result, choosenMove) => choosenMove.name === list[1] || result,
                  false,
                )}
                toggleChoosenMove={toggleChoosenMove}
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
  onSubmitEditing: PropTypes.func.isRequired,
  toggleChoosenMove: PropTypes.func.isRequired,
};
