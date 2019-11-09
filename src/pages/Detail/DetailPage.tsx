import React, { useEffect, useState } from 'react';
import {
  getPokemonDetail,
  updateRecentlyViewed,
  checkFavorite,
  toggleFavorite,
  getChoosenMove,
  saveToParty,
} from '../../api';

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
import Menu from '../../common/components/Menu';
import LearnsetItem from './LearnsetItem';
import TypeEffectiveness from './TypeEffectiveness';
import EvolutionaryLine from './EvolutionaryLine';
import EditOverviewModal from './EditOverviewModal';
import { SectionTitle } from './DetailPage.styled';

import { Move } from '../../common/types/partyType';

export default function DetailPageContainer({
  match: { params },
  history: { push },
}: {
  match: {
    params: {
      pokemon: string;
    };
  };
  history: {
    push: Function;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    types: ['???'] as [string] | [string, string],
    learnset: [],
    typeEffectiveness: {
      normal: [],
      weak: [],
      resistant: [],
      immune: [],
    },
    evolutionaryLine: [],
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [choosenMoves, setChoosenMoves] = useState<Move[]>([]);
  const [markings, setMarkings] = useState([0,0,0,0,0,0,0]); // TODO make enum
  const name = params.pokemon;

  function toggleChoosenMove(move: Move) {
    const newChoosenMoves = choosenMoves
      .filter(({ name }) => name !== move.name);
    if (newChoosenMoves.length === choosenMoves.length) {
      newChoosenMoves.unshift(move);
    }
    setChoosenMoves(newChoosenMoves.slice(0, 4)); // get the latest 4;
  }

  const alolanSeparatorIndex = name.indexOf('_');
  let nameForAlolan = '';
  if (alolanSeparatorIndex !== -1) {
    nameForAlolan = name.substr(alolanSeparatorIndex + 1);
  }

  // TODO: should be user-generated
  const givenName = name;

  useEffect(() => {
    setIsLoading(true);
    getPokemonDetail(name)
      .then(setDetails as any) // TODO
      .finally(() => setIsLoading(false));
      checkFavorite(name).then(setIsFavorite);
    setChoosenMoves(getChoosenMove(givenName));
    updateRecentlyViewed(name);
  }, [ params ]);

  function onMark(markingIndex: number) {
    const newMarkings = markings;
    newMarkings[markingIndex] = (newMarkings[markingIndex] + 1) % 3;
    setMarkings(newMarkings);
  }

  function onClickBack() {
    push('/search');
  }

  function onClickFloatingButton() {
    toggleFavorite(name, !isFavorite);
    setIsFavorite(!isFavorite);
  }

  function onClickEvolutionStage(pokemonName: string) {
    pokemonName.replace(' ', '_'); // for alolan
    push(`/pokemon/${pokemonName}`);
  }

  function setEditingOn() {
    setIsEditingActive(true);
  }

  function saveEditing() {
    setIsEditingActive(false);
    saveToParty({
      givenName,
      species: name,
      moves: choosenMoves,
    });
  }

  const RightButton = (
    <IconButton
      onClick={isEditingActive ? saveEditing : setEditingOn}
      aria-label="edit"
      style={{ position: 'absolute', right: 0 }}
    >
      {isEditingActive ? <DoneIcon /> : <AddIcon />
        // : <PokeballIcon size={254} color="gray" background={color.primary} />
      }
    </IconButton>
  );

  const pokemonName = nameForAlolan || name;

  return (
    <LayoutContainer>
      <Navbar onClickBack={onClickBack} right={RightButton}>
        <PokemonInfo
          name={pokemonName}
          types={details.types}
          isAlolan={nameForAlolan !== ''}
        />
        {isEditingActive && <EditOverviewModal choosenMoves={choosenMoves} />}
      </Navbar>
      {isLoading ? <LoadingIndicator/> : (
        <>
          <Menu markings={markings} onMark={onMark} />
          <TypeEffectiveness {...details.typeEffectiveness} />
          <EvolutionaryLine
            pokemonName={pokemonName}
            stages={details.evolutionaryLine}
            onClickStage={onClickEvolutionStage}
          />
          <SectionTitle>Moves by leveling up</SectionTitle>
          <div>
            {details.learnset.map(({ list }, i) => (
              <LearnsetItem
                key={i}
                list={list}
                isEditingActive={isEditingActive}
                // list[1] contains move's name
                isMoveChoosen={choosenMoves.reduce<boolean>(
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
