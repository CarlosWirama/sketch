import styled from 'styled-components';
import { BorderedCard } from '../../../common/components/Card';

export const EffectivenessCategory = styled.div<{ active: boolean }>`
  transition: flex 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
  flex: ${props => props.active ? 3 : 1};
  display: flex;
  flex-direction: column;
  min-width: 80px;
`;

export const TypeListContainer = styled(BorderedCard)`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  margin: 8px 4px 0;
`;
