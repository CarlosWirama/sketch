import React from 'react';
// import { Home, Search } from './pages';
import Home from './pages/Home';
import Search from './pages/Search';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/search' component={Search}/>
        {/* <Route path='/' component={Detail}/> */}
        <Route path='/' component={Home}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div>404 Not Found</div>
  );
}
