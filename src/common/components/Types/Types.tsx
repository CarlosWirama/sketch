import React from 'react';
import { Container, TypeBalloon } from './Types.styled.js';
import getTypeColor from './pokemonTypeColor';
import Type from '../../constants/Type.js';

interface TypesProps {
  types: [Type] | [Type, Type];
}

export default function Types({ types }: TypesProps) {
  return (
    <Container>
      {types.map((type, index) => (
        <TypeBalloon key={index} color={getTypeColor(type)}>
          {type}
        </TypeBalloon>
      ))}
    </Container>
  );
}
