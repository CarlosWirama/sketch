import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import { color } from '../../common/theme';
import {
  isPokedexLayout,
  CONTENT_RIGHT_CALC,
  FRAME_VERTICAL_PADDING,
} from '../../common/constants/pokedexCssCalculation';

export const SectionTitle = styled.div`
  margin: 24px 0 16px;
  font-weight: bold;
`;

export const FixedActionButton = styled(Fab)`
  && {
    position: fixed;
  }
  &&& {
    background-color: ${color.primary};
  }
  bottom: 16px;
  right: 16px;
  ${isPokedexLayout} {
    bottom: calc(${FRAME_VERTICAL_PADDING} + 16px);
    right: calc(${CONTENT_RIGHT_CALC} + 16px);
  }
  /* for pokedex-frame layout */
`;
