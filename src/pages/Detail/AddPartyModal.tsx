// Libraries
import React, { useState } from 'react';
import styled from 'styled-components';

// Functions
import { addToParty } from '../../api';
import { getAnimatedPokemonImage } from '../../api/spriteApi';

// Components
import { Button, Input } from '@material-ui/core';
import Modal from '../../common/components/Modal';
import { PokemonSprite } from '../../common/components/PokemonInfo/PokemonInfo.styled';

// Enums
import Form from '../../common/constants/Form';

interface AddPartyModalProps {
  isVisible: boolean;
  onClose: () => void;
  species: string;
  form: Form;
}

export default function AddPartyModal({
  species,
  form,
  onClose,
  ...props
}: AddPartyModalProps) {
  const [name, setName] = useState(species);

  function onSubmit() {
    addToParty({
      species,
      givenName: name,
      moves: [],
      // [{ name: "Haze", type: "ice" }, { name: "Bite", type: "dark"}]
    });
    onClose();
    setName(species);
  }

  function onChangeName (e: { target: { value: string } }) {
    setName(e.target.value);
  }

  return (
    <Modal onClose={onClose} {...props}>
      <h3>Adding to party</h3>
      <PokemonSprite src={getAnimatedPokemonImage(species, form)} />
      <div>
        <NameInput value={name} onChange={onChangeName} autoFocus />
      </div>
      <AddToPartyButton onClick={onSubmit}>
        Add to Party
      </AddToPartyButton>
    </Modal>
  );
}

const NameInput = styled(Input)`
  & input {
    text-align: center;
  }
`;

const AddToPartyButton = styled(Button).attrs({
  color: 'primary',
  variant: 'contained',
})`
  margin: 16px 0;
`;
