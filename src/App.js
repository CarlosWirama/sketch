import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { HashRouter, Switch, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import {
  SCREEN_MIN_WIDTH,
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
          <HashRouter>
            <Switch>
              <Route path="/search" component={Search}/>
              <Route path="/pokemon/:pokemon" component={Detail}/>
              {/* <Route path="/" component={Home}/> */}
              <Route path="/" component={Search}/>
              <Route component={NotFound}/>
            </Switch>
          </HashRouter>
        </Body>
      </Container>
    </ThemeProvider>
  );
}

function NotFound() {
  return (
    <div>404 Not Found</div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: ${SCREEN_MIN_WIDTH}) {
    width: 100vw;
    min-height: 100vh;
    position: relative;
    background-color: #14aaa0;
  }
`;

const Body = styled.div`
  color: ${props => props.theme.color.black};
  @media only screen and (max-width: calc(${SCREEN_MIN_WIDTH} - 1px)) {
    &:before {
      content: "";
      position: fixed;
      width: 100vw;
      height: 100vh;
      background: ${backgroundTile};
      z-index: -1;
    }
  }
  @media only screen and (min-width: ${SCREEN_MIN_WIDTH}) {
    position: absolute;
    top: ${FRAME_VERTICAL_PADDING};
    right: ${CONTENT_RIGHT_CALC};
    height: calc(100% - 2 * ${FRAME_VERTICAL_PADDING});
    width: 100%;
    max-width: ${CONTENT_MAX_WIDTH};
    overflow: scroll;
    box-shadow: inset 1px 2px 3px 1px grey;
    background: ${backgroundTile};
  }
`;
