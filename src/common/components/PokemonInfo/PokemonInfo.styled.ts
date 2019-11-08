import styled from 'styled-components';
import { Color } from 'csstype';

export const Container = styled.div`
  display: inline-box;
`;

export const SpriteContainer = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PokemonSprite = styled.img`
  max-width: calc(72px / .65);
  max-height: calc(72px / .65);
  transform: scale(.65);
  image-rendering: auto;
`;

export const Texts = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Name = styled.div<{ titleColor?: Color }>`
  color: ${props => props.titleColor || props.theme.color.black};
  text-align: left;
  line-height: 20px;
  padding-bottom: 8px;
`;
