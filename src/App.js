import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
          <BrowserRouter>
            <Switch>
              <Route path={process.env.PUBLIC_URL + '/search'} component={Search}/>
              <Route path={process.env.PUBLIC_URL + '/pokemon/:pokemon'} component={Detail}/>
              {/* <Route path={process.env.PUBLIC_URL + '/'} component={Home}/> */}
              <Route path={process.env.PUBLIC_URL + '/'} component={Search}/>
              <Route component={NotFound}/>
            </Switch>
          </BrowserRouter>
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
  min-height: 100vh;
  flex-direction: column;
  @media only screen and (min-width: ${SCREEN_MIN_WIDTH}) {
    width: 100vw;
    position: relative;
    background-color: #14aaa0;
  }
`;

const Body = styled.div`
  flex: 1 0 auto;
  background: ${backgroundTile};
  color: ${props => props.theme.text.color.black};
  @media only screen and (min-width: ${SCREEN_MIN_WIDTH}) {
    position: absolute;
    right: ${CONTENT_RIGHT_CALC};
    max-width: ${CONTENT_MAX_WIDTH};
    width: 100%;
    top: ${FRAME_VERTICAL_PADDING};
    height: calc(100% - 2 * ${FRAME_VERTICAL_PADDING});
    overflow: scroll;
    box-shadow: inset 1px 2px 3px 1px grey;
  }
`;
