import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default function Navbar({ left, middle, right }) {
  const styledMiddle = typeof middle !== 'string'
    ? middle // if typeof middle === component
    : <Typography variant="h6" color="inherit">{middle}</Typography>;
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          {left}
          <Middle>{styledMiddle}</Middle>
          {right}
        </Toolbar>
      </AppBar>
      <EmptySpace />
    </React.Fragment>
  );
}

Navbar.propTypes = {
  left: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  middle: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  right: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
};

const Middle = styled.h3`
  flex: 1;
`;

const EmptySpace = styled.div`
  height: 64px;
`;
