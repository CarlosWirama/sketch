
import React, { useEffect, useState } from 'react';
import { saveToParty } from '../../api';

import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import PokemonInfo from '../../common/components/PokemonInfo';
import Navbar from '../../common/components/Navbar';
import LayoutContainer from '../../common/components/LayoutContainer';
import Modal from '../../common/components/Modal';
import Marking from '../../common/components/Marking';
import LearnsetItem from './LearnsetItem';
import TypeEffectiveness from './TypeEffectiveness';
import EditOverviewModal from './EditOverviewModal';

import { Move } from '../../common/types/partyType';
import { PokemonSprite } from '../../common/components/PokemonInfo/PokemonInfo.styled';
import { getAnimatedPokemonImage } from '../../api/spriteApi';

interface AddPartyModalProps {
  isVisible: boolean;
  speciesName: string;
  isAlolan?: boolean;
  onClose: (event: React.SyntheticEvent<{}, Event>) => void
}

export default function AddPartyModal({
  speciesName,
  isAlolan = false,
  ...props
}: AddPartyModalProps) {
  return (
    <Modal {...props}>
      <h3>Adding to party</h3>
      <div>{speciesName}</div>
      <PokemonSprite src={getAnimatedPokemonImage(speciesName, isAlolan)} />
    </Modal>
  );
}
