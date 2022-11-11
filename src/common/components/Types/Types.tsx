import React from 'react';
import { Container, TypeBalloon, TypeIcon, TypeText } from './Types.styled';
import getTypeColor from './pokemonTypeColor';
import TypeIcons from './typeIcons';

// types
import { Types as TTypes } from '../../types';

interface TypesProps {
  types: TTypes;
  hideText?: boolean;
}

export default function Types({ types, hideText }: TypesProps) {
  return (
    <Container>
      {types.map((type, index) => {
        const color = getTypeColor(type);
        return (
          <TypeBalloon key={index}>
            <TypeIcon color={color} src={TypeIcons[type]} />
            <TypeText color={color} hidden={Boolean(hideText)}>
              {type}
            </TypeText>
          </TypeBalloon>
        );
      })}
    </Container>
  );
}
