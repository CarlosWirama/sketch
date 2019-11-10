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

export default function PokemonInfo({
  name,
  types,
  titleColor,
  isAlolan,
}: {
  name: string;
  types: [string] | [string, string];
  titleColor?: string;
  isAlolan?: boolean;
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
