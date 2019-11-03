import React from 'react';
import PropTypes from 'prop-types';
import { Container, TypeBalloon } from './Types.styled.js';
import getTypeColor from './pokemonTypeColor';

export default function Types({ types }) {
  return (
    <Container>
      {types.map((type, index) => (
        <TypeBalloon
          key={index}
          color={getTypeColor(type)}
        >
          {type}
        </TypeBalloon>
      ))}
    </Container>
  );
}

Types.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
};
