import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  SpriteContainer,
  PokemonSprite,
  Texts,
  Name,
  Types,
  Type,
} from './PokemonInfo.styled.js';
import getTypeColor from './pokemonTypeColor';
import getImageUrl from './spriteApi';

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
          src={getImageUrl(name, isAlolan)}
        />
      </SpriteContainer>
      <Texts>
        <Name titleColor={titleColor}>{name}</Name>
        <Types>
          {types.map((type, index) => (
            <Type key={index} color={getTypeColor(type)}>
              {type}
            </Type>
          ))}
        </Types>
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
