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

export const Types = styled.div`
  display: flex;
  color: white;
  padding-top: 8px;
`;

export const Type = styled.div`
  display: flex;
  color: white;
  text-transform: uppercase;
  background-color: ${props => props.color};
  font-size: 12px;
  padding: 2px 8px 4px;
  letter-spacing: -0.3px;
  border-radius: 5px;
  border: 2px solid rgba(255,255,255,0.4);

  &:last-child {
    margin-left: 4px;
  }
`;
