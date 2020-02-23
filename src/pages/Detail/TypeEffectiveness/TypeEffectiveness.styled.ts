import styled from 'styled-components';
import { BorderedCard } from '../../../common/components/Card';

export const EffectivenessCategory = styled.div<{ active: boolean }>`
  transition: flex 0.3s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
  flex: ${props => props.active ? 2.25 : 1};
  display: flex;
  flex-direction: column;
  min-width: 80px;
`;

export const TypeListContainer = styled(BorderedCard)`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 8px 4px 0;
  padding: 8px;
`;

export const AnimatedWidth = styled.div`
  transition: width .3s cubic-bezier(0.15, 0.3, 0.25, 1);
  width: 88px;
  overflow: hidden;
  &.short {
    width: 28px;
  }
`;
