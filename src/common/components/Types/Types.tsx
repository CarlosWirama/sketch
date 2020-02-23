import React from 'react';
import { Container, TypeBalloon, TypeIcon, TypeText } from './Types.styled';
import Type from '../../constants/Type';
import getTypeColor from './pokemonTypeColor';
import TypeIcons from './typeIcons';

interface TypesProps {
  types: [Type] | [Type, Type];
  hideText?: boolean;
}

export default function Types({ types, hideText }: TypesProps) {
  return (
    <Container>
      {types.map((type, index) => {
        const color = getTypeColor(type);
        return (
          <TypeBalloon color={color} key={index}>
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
