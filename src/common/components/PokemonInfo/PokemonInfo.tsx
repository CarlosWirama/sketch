import React from 'react';
import Types from '../Types';
import {
  Container,
  SpriteContainer,
  PokemonSprite,
  Texts,
  Name,
} from './PokemonInfo.styled';
import { getAnimatedPokemonImage } from '../../../api/spriteApi';
import Form from '../../constants/Form';
import Type from '../../constants/Type';

export default function PokemonInfo({
  name,
  types,
  titleColor,
  form,
}: {
  name: string;
  types: [Type] | [Type, Type];
  titleColor?: string;
  form: Form;
}) {
  return (
    <Container>
      <SpriteContainer>
        <PokemonSprite
          src={getAnimatedPokemonImage(name, form)}
        />
      </SpriteContainer>
      <Texts>
        <Name titleColor={titleColor}>{name}</Name>
        <Types types={types} />
      </Texts>
    </Container>
  );
}
