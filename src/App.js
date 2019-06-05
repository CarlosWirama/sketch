import React from 'react';
import styled from 'styled-components';
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
import PokedexFrame from './common/components/PokedexFrame';

export default function App() {
  return (
    <Container>
      <PokedexFrame/>
      <Body>
        <BrowserRouter>
          <Switch>
            <Route path='/search' component={Search}/>
            <Route path='/pokémon/:pokemon' component={Detail}/>
            {/* <Route path='/' component={Home}/> */}
            <Route path='/' component={Search}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </Body>
    </Container>
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
  background-image:
    repeating-linear-gradient(90deg,
      transparent 0 10px,
      rgba(0, 0, 121, 0.03) 12px 14px,
      transparent 16px 26px
    ),
    repeating-linear-gradient(0deg,
      transparent 0 10px,
      rgba(0, 0, 121, 0.03) 12px 14px,
      transparent 16px 26px
    ),
    radial-gradient(circle at 50% 0, #2cffff, #69fffe 35%, #008dee);
  background-attachment: fixed;
`;
