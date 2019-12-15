import styled from 'styled-components';
import Card from '../../../common/components/Card';
import { getPixelImage } from '../../../api/spriteApi';

export const SectionContent = styled.div`
  display: flex;
  text-align: center;
`;

export const PixelImage = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => getPixelImage(props.pokemonName)};
`;

export const StageCard = styled(Card)`
  flex: 1;
  margin: 0 4px;
  cursor: pointer;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  && {
    background-image: linear-gradient(
      white -64px,
      ${props => props.color} 32px
      ${props => props.color2 ? `, ${props.color2} 48px` : ''}
    );
    box-shadow: 0 0 8px 10px rgba(182, 237, 255, 0.3);
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 8px 0;
  }
`;
