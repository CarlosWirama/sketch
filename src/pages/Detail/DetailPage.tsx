import React, { useEffect, useState } from 'react';
import {
  getPokemonDetail,
  updateRecentlyViewed,
  checkFavorite,
  toggleFavorite,
  getChoosenMove,
  addToParty,
} from '../../api';

import SwipeableViews from 'react-swipeable-views';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import PokeballIcon from '../../common/components/Pokeball';
import { color } from '../../common/theme';
import PokemonInfo from '../../common/components/PokemonInfo';
import Navbar from '../../common/components/Navbar';
import LoadingIndicator
  from '../../common/components/PokeballLoadingIndicator';
// import Marking from '../../common/components/Marking';
import Learnset from './Learnset';
import BasicInfoTab from './BasicInfoTab';
import EditOverviewModal from './EditOverviewModal';
import AddPartyModal from './AddPartyModal';

import { MoveItem } from '../../common/types/partyType';
import Type from '../../common/constants/Type';

import { getSpeciesNameAndForm } from '../../common/utilities/pokemonForm';
import EvolutionStage from '../../common/types/evolutionStage';
import { useParams, useHistory } from 'react-router-dom';
import { DetailPageContent, PageContainer, Tabs, Tab } from './DetailPage.styled';

export default function DetailPageContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    types: [Type['???']] as [Type] | [Type, Type],
    moves: {
      leveling: [],
      machine: [],
      breed: [],
      tutor: [],
      prior: [],
    },
    typeEffectiveness: {
      immune: [],
      doubleResistant: [],
      resistant: [],
      weak: [],
      doubleWeak: [],
    },
    evolutionaryLine: [] as EvolutionStage[],
    baseStats: { attack: 0, defense: 0, hp: 0, spatk: 0, spdef: 0, speed: 0 },
    abilities: { nonHidden: [] },
    genderRatio: 0,
    eggGroups: [],
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [choosenMoves, setChoosenMoves] = useState<MoveItem[]>([]);
  const [activeTab, setActiveTab] = useState(DetailPageTab.BasicInfo);
  const { push } = useHistory();
  const { pokemon: pokemonName, generation } = useParams<DetailRouteParams>();
  const name = pokemonName;

  const { speciesName, form } = getSpeciesNameAndForm(name);

  // TODO: should be user-generated
  const givenName = name;
  // const isPartyPokemon = Boolean(givenName) // !== name; // TODO

  useEffect(() => {
    setIsLoading(true);
    const generationNumber = (generation === 'gen_VII') ? 7 : 8;
    getPokemonDetail(speciesName, generationNumber, form)
      .then(setDetails as any) // TODO
      .finally(() => setIsLoading(false));
    checkFavorite(name).then(setIsFavorite);
    setChoosenMoves(getChoosenMove(givenName));
    updateRecentlyViewed(name);
  }, [ name, generation ]);

  function onClickBack() {
    push('/search');
  }

  function onClickFloatingButton() {
    toggleFavorite(name, !isFavorite);
    setIsFavorite(!isFavorite);
  }

  function setEditingOn() {
    setIsModalVisible(true); // TODO
    setIsEditingActive(true);
  }

  function saveEditing() {
    setIsEditingActive(false);
    addToParty({
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
      {isEditingActive
        ? <DoneIcon />
        : <PokeballIcon size={24} background={color.primary} />
      }
    </IconButton>
  );

  return (
    <PageContainer>
      <Navbar onClickBack={onClickBack} right={RightButton}>
        <PokemonInfo
          name={speciesName}
          types={details.types}
          form={form}
        />
        {isEditingActive && <EditOverviewModal choosenMoves={choosenMoves} />}
      </Navbar>
      <Tabs
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
        variant="fullWidth"
        indicatorColor="none"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab label="Basic Info" />
        <Tab label="Moves" />
      </Tabs>
      {isLoading ? <LoadingIndicator/> : (
        <SwipeableViews
          index={activeTab}
          onChangeIndex={setActiveTab}
          resistance
          containerStyle={{ height: '100%' }}
        >
          <DetailPageContent>
            <BasicInfoTab
              baseStats={details.baseStats}
              abilities={details.abilities}
              genderRatio={details.genderRatio}
              eggGroups={details.eggGroups}
              typeEffectiveness={details.typeEffectiveness}
              evolutionaryLine={details.evolutionaryLine}
            />
          </DetailPageContent>
          <DetailPageContent>
            <Learnset
              learnset={details.moves}
              choosenMoves={choosenMoves}
              setChoosenMoves={setChoosenMoves}
              isEditingActive={isEditingActive}
            />
          </DetailPageContent>
        </SwipeableViews>
      )}
      <AddPartyModal
        isVisible={isModalVisible}
        species={name}
        form={form}
        onClose={() => setIsModalVisible(false)}
      />
    </PageContainer>
  );
}

interface DetailRouteParams {
  pokemon: string;
  generation?: string;
}

enum DetailPageTab {
  BasicInfo,
  Moves,
}
