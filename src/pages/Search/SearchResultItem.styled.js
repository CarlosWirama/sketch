import styled from 'styled-components';
import { ListItem } from '@material-ui/core';
import getTypeColor from './pokemonTypeColor';

export const StyledListItem = styled(ListItem)`
  color: white;
  font-size: 20px;
  && {
    background-color: rgba(32, 129, 255, 0.3);
    border-radius: 10px 28px;
    margin: 16px 0;
    padding: 4px 8px;
    box-shadow: 0 0 8px 10px rgba(182, 237, 255, 0.3);
    border: solid 3px rgba(176, 235, 255, 0.8);
  }
  &&:before {
    content: " ";
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border: 3px solid rgba(32, 129, 255, 0.3);
    border-radius: 10px 30px;
  }
`;

export const PokemonImage = styled.div`
  width: 72px;
  height: 72px;
`;

export const Texts = styled.div`
`;

export const Name = styled.div`
  color: white;
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
