import React from 'react';
import styled from 'styled-components';
import { AppBar } from '@material-ui/core';

export default function Navbar({ left, middle, right }) {
  return (
    <React.Fragment>
      <StyledAppBar>
        <Left>{left}</Left>
        <Middle>{middle}</Middle>
        <Right>{right}</Right>
      </StyledAppBar>
      <EmptySpace />
    </React.Fragment>
  );
}

const StyledAppBar = styled(AppBar)`
  display: flex;
  height: 64px;
  padding: 16px;
  align-items: center;
`;

const Left = styled.div`
`;

const Middle = styled.h3`
  flex: 1;
  // text-align: center;
`;

const Right = styled.div`
`;

const EmptySpace = styled.div`
  height: 64px;
`;
