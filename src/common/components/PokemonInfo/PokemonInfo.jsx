import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  PokemonImage,
  Texts,
  Name,
  Types,
  Type,
} from './PokemonInfo.styled.js';

export default function PokemonInfo({ name, types, titleColor }) {
  return (
    <Container>
      <PokemonImage />
      <Texts>
        <Name titleColor={titleColor}>{name}</Name>
        <Types>
          {types.map((type, index) => (
            <Type key={index}>{type}</Type>
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
};
