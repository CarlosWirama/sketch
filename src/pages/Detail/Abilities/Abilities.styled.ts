import styled from 'styled-components';
import { BorderedCard } from '../../../common/components/Card';

export const AbilityBox = styled.div<{isHiddenAbility?: boolean}>`
  background: rgb(19, 153, 240);
  border-radius: 4px 9px;
  padding: 2px 8px;
  margin-right: 8px;
  color: white;
  border: 2px solid #95ddfe;
  box-sizing: border-box;
  ${props => props.isHiddenAbility && `
    opacity: 0.8;
    color: #fffa;
  `}
`;


export const Description = styled(BorderedCard)`
  color: white;
  margin: 8px 0;
  padding: 8px 16px;
`;
