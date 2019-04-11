import styled from 'styled-components';
import getTypeColor from './pokemonTypeColor';

export const Container = styled.div`
  display: inline-flex;
`;

export const PokemonImage = styled.div`
  width: 72px;
  height: 72px;
  background-color: rgba(0,0,0,.05);
`;

export const Texts = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Name = styled.div`
  color: white;
  text-align: left;
  line-height: 20px;
`;

export const Types = styled.div`
  display: flex;
  color: white;
  padding-top: 8px;
`;

export const Type = styled.div`
  font-family: "Roboto Mono";
  display: flex;
  color: white;
  text-transform: uppercase;
  background-color: ${props => getTypeColor(props.children)};
  font-size: 12px;
  padding: 4px 8px 6px;
  letter-spacing: -0.3px;
  border-radius: 5px;
  box-shadow: inset 0px -2px rgba(0,0,0,0.2), inset 0px 1px rgba(255,255,255,0.2);

  &:last-child {
    margin-left: 4px;
  }
`;
