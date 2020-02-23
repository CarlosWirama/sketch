import styled from 'styled-components';
import { BorderedCard } from '../../../common/components/Card';

export const EffectivenessCategory = styled.div<{ active: boolean }>`
  transition: flex 0.3s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
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
  padding: 8px 0;
`;

export const AnimatedWidth = styled.div`
  transition: width .3s cubic-bezier(0.15, 0.3, 0.25, 1);
  min-width: 28px;
  width: 88px;
  &.short {
    width: 0;
  }
`;
