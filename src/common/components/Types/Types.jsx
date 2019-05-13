import React from 'react';
import PropTypes from 'prop-types';
import { Container, TypeBaloon } from './Types.styled.js';
import getTypeColor from './pokemonTypeColor';

export default function Types({ types }) {
  return (
    <Container>
      {types.map((type, index) => (
        <TypeBaloon
          key={index}
          color={getTypeColor(type)}
        >
          {type}
        </TypeBaloon>
      ))}
    </Container>
  );
}

Types.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
};
