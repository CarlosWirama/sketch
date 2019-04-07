import styled from 'styled-components';
import { ListItem } from '@material-ui/core';
import getTypeColor from './pokemonTypeColor';

export const StyledListItem = styled(ListItem)`
  color: white;
  font-size: 20px;
  && {
    background-color: rgba(32, 129, 255, 0.3);
    border-radius: 10px 28px;
    margin: 24px 0;
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
`;

export const Type = styled.div`
  display: flex;
  color: white;
  text-transform: uppercase;
  background-color: ${props => getTypeColor(props.children)};
  font-size: 12pt;
  // line-spacing: .5px;
`;
