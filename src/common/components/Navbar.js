import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import {
  SCREEN_MIN_WIDTH,
  CONTENT_MAX_WIDTH,
  CONTENT_RIGHT_CALC,
  FRAME_VERTICAL_PADDING,
} from '../constants/pokedexCssCalculation.js';


export default function Navbar({ left, children, right, onClickBack }) {
  const leftButton = left || (
    onClickBack ? <BackButton onClick={onClickBack} /> : null
  );
  const styledChildren = typeof children === 'string'
    ? <Typography variant="h2" color="inherit">{children}</Typography>
    : children;
  return (
    <NavbarContainer>
      <EmptySpace/>
      <AppBarWithPokedex color="inherit">
        <StyledToolbar>
          {leftButton}
          <FullWidth>{styledChildren}</FullWidth>
          {right}
        </StyledToolbar>
      </AppBarWithPokedex>
    </NavbarContainer>
  );
}

Navbar.propTypes = {
  left: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  children: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]).isRequired,
  right: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  onClickBack: PropTypes.func,
};

const NavbarContainer = styled.div`
  && {
    color: black;
    font-weight: bold;
  }
`;

const EmptySpace = styled.div`
  height: calc(104px - 16px);
`;

const AppBarWithPokedex = styled(AppBar)`
  @media only screen and (min-width: ${SCREEN_MIN_WIDTH}) {
    max-width: ${CONTENT_MAX_WIDTH};
    && {
      top: ${FRAME_VERTICAL_PADDING};
      right: ${CONTENT_RIGHT_CALC};
      & > div {
        box-shadow: inset 1px 2px 3px 1px grey;
      }
    }
  }
`;

const StyledToolbar = styled(Toolbar)`
  background-color: #4eedfa;
  padding: 16px;
  font-size: 20px;
`;

const FullWidth = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function BackButton(props) {
  return(
    <IconButton color="inherit" aria-label="Back" {...props} >
      <ArrowBack />
    </IconButton>
  );
}
