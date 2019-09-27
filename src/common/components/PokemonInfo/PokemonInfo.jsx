import React from 'react';
import PropTypes from 'prop-types';
import Types from '../Types';
import {
  Container,
  SpriteContainer,
  PokemonSprite,
  Texts,
  Name,
} from './PokemonInfo.styled.js';
import { getAnimatedPokemonImage } from '../../../api/spriteApi';

export default function PokemonInfo({
  name,
  types,
  titleColor,
  isAlolan,
}) {
  return (
    <Container>
      <SpriteContainer>
        <PokemonSprite
          src={getAnimatedPokemonImage(name, isAlolan)}
        />
      </SpriteContainer>
      <Texts>
        <Name titleColor={titleColor}>{name}</Name>
        <Types types={types} />
      </Texts>
    </Container>
  );
}

PokemonInfo.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  titleColor: PropTypes.string,
  isAlolan: PropTypes.bool,
};
