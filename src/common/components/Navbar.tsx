import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import {
  isPokedexLayout,
  CONTENT_MAX_WIDTH,
  CONTENT_RIGHT_CALC,
  FRAME_VERTICAL_PADDING,
} from '../constants/pokedexCssCalculation';
import { color } from '../theme';

export default function Navbar({ left, children, right, onClickBack }: {
  left?: ReactNode;
  children: ReactNode;
  right?: ReactNode;
  onClickBack?: () => void;
}) {
  const leftButton = left || (
    onClickBack ? <BackButton onClick={onClickBack} /> : null
  );
  const styledChildren = typeof children === 'string'
    ? <Typography variant="h2" color="inherit">{children}</Typography>
    : children;
  return (
    <NavbarContainer>
      <AppBarWithPokedex color="inherit">
        <StyledToolbar>
          {leftButton}
          <FullWidth haveMarginLeft={!!left || !!onClickBack}>
            {styledChildren}
          </FullWidth>
          {right}
        </StyledToolbar>
      </AppBarWithPokedex>
    </NavbarContainer>
  );
}

function BackButton(props: IconButtonProps) {
  return (
    <BackButtonContainer
      color="inherit"
      aria-label="Back"
      {...props}
    >
      <ArrowBack />
    </BackButtonContainer>
  );
}

const NavbarContainer = styled.div`
  && {
    color: black;
    font-weight: bold;
  }
`;

// not using top: 0; because we will have 2 navbar in 2 side-by-side layers
const AppBarWithPokedex = styled(AppBar)`
  && {
    top: auto;
    right: auto;
    position: relative;
  }
  ${isPokedexLayout} {
    max-width: ${CONTENT_MAX_WIDTH};
    && > div {
      box-shadow: inset 1px 2px 3px 1px grey;
    }
  }
`;

const StyledToolbar = styled(Toolbar)`
  background-color: ${color.primary};
  padding: 16px;
  font-size: 20px;
`;

const FullWidth = styled.div<{ haveMarginLeft: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${props => props.haveMarginLeft && 'margin-left: 24px;'}
`;

const BackButtonContainer = styled(IconButton)`
  left: 0;
  && {
    position: absolute;
  }
`;
