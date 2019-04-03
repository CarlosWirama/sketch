import React from 'react';
import styled from 'styled-components';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function() {
  return (
    <Body>
      <BrowserRouter>
        <Switch>
          <Route path='/search' component={Search}/>
          <Route path='/pokémon/:pokemon' component={Detail}/>
          <Route path='/' component={Home}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </Body>
  );
}

function NotFound() {
  return (
    <div>404 Not Found</div>
  );
}

const Body = styled.div`
  overflow: scroll;
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(circle at 50% 0, #2cffff, #69fffe 35%, #008dee);
`;
