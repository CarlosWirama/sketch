import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

export default function Navbar({ left, children, right, onClickBack }) {
  const leftButton = left || (
    onClickBack ? <CloseButton onClick={onClickBack} /> : null
  );
  const styledChildren = typeof children !== 'string'
    ? children // if typeof children === component
    : <Typography variant="h2" color="inherit">{children}</Typography>;
  return (
    <NavbarContainer>
      <EmptySpace/>
      <AppBar color="black">
        <StyledToolbar>
          {leftButton}
          <FullWidth>{styledChildren}</FullWidth>
          {right}
        </StyledToolbar>
      </AppBar>
    </NavbarContainer>
  );
}

Navbar.propTypes = {
  left: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  children: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]).isRequired,
  right: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  onClickBack: PropTypes.func,
};

const FullWidth = styled.div`
  flex: 1;
`;

const EmptySpace = styled.div`
  height: calc(110px - 32px);
`;

const NavbarContainer = styled.div`
  && {
    color: black;
    font-weight: bold;
  }
`;

const StyledToolbar = styled(Toolbar)`
  background-color: #4eedfa;
  padding: 16px;
  font-size: 20px;
`;

function CloseButton() {
  return(
    <IconButton color="inherit" aria-label="Menu">
      <Close />
    </IconButton>
  );
}
