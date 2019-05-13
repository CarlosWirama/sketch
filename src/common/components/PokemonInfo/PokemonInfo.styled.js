import styled from 'styled-components';

export const Container = styled.div`
  display: inline-flex;
`;

export const SpriteContainer = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PokemonSprite = styled.img`
  max-width: 72px;
  max-height: 72px;
`;

export const Texts = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Name = styled.div`
  color: ${props => props.titleColor || 'white'};
  text-align: left;
  line-height: 20px;
`;
