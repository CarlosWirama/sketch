import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes } from './navigation';
import {
  isPokedexLayout,
  isMobileLayout,
  CONTENT_MAX_WIDTH,
  CONTENT_RIGHT_CALC,
  FRAME_VERTICAL_PADDING,
} from './common/constants/pokedexCssCalculation';
import theme from './assets/theme';
import PokedexFrame from './common/components/PokedexFrame';
import backgroundTile from './common/components/backgroundTile';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PokedexFrame/>
        <Body>
          <Routes />
        </Body>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${isPokedexLayout} {
    width: 100vw;
    min-height: 100vh;
    position: relative;
    background-color: #14aaa0;
  }
`;

const Body = styled.div`
  color: ${props => props.theme.color.black};
  height: ${isMobileLayout ? '100vh' : '100%'};
  ${isMobileLayout} {
    &:before {
      content: "";
      position: fixed;
      width: 100vw;
      height: 100vh;
      background: ${backgroundTile};
      z-index: -1;
    }
  }
  ${isPokedexLayout} {
    position: absolute;
    top: ${FRAME_VERTICAL_PADDING};
    right: ${CONTENT_RIGHT_CALC};
    height: calc(100% - 2 * ${FRAME_VERTICAL_PADDING});
    width: 100%;
    max-width: ${CONTENT_MAX_WIDTH};
    box-shadow: inset 1px 2px 3px 1px grey;
    background: ${backgroundTile};
    overflow: hidden;
  }
`;
