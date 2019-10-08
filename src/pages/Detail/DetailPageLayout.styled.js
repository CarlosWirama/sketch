import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import { color } from '../../common/theme';

export const SectionTitle = styled.div`
  margin: 24px 0 16px;
  font-weight: bold;
`;

export const FixedActionButton = styled(Fab)`
  right: 24px;
  bottom: -28px;
  && {
    position: absolute;
  }
  &&& {
    background-color: ${color.primary};
  }
`;
