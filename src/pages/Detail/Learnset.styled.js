import styled from 'styled-components';
import { lighten } from 'polished';
import Card from '../../common/components/Card';
import getTypeColor from '../../common/components/PokemonInfo/pokemonTypeColor';

export const MoveSetTab = styled.div`
  margin-top: 16px;
  font-weight: bold;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  :not(:last-child):before {
    content: " ";
    position: absolute;
    border: 2px solid black;
    bottom: -17px;
    top: 17px;
    left: 14px;
  }
`;

export const Move = styled(Card)`
  flex-direction: column;
  text-align: left;
  && {
    background-image: linear-gradient(white -64px, ${({ type }) => lighten(0.1, getTypeColor(type))} 32px);
    box-shadow: 0 0 8px 10px rgba(182, 237, 255, 0.3);
    border: solid 3px rgba(176, 235, 255, 0.8);
    margin: 12px 0;
    padding: 12px 24px;
    align-items: normal;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Level = styled.div`
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: black;
  font-size: 16px;
  color: white;
  margin: 16px 8px 0 0;
  z-index: 1;
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const Name = styled.div`
  font-size: 20px;
  flex: 3;
`;

export const Details = styled.div`
  display: ${props => props.isExpanded ? 'block' : 'none'};
  margin-top: 4px;
`;
