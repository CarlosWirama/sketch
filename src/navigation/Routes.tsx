import React, { useState, useEffect } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';
import Party from '../pages/Party';
import Search from '../pages/Search';
import Detail from '../pages/Detail';
import SwipeableViews from 'react-swipeable-views';
import { PATH, TAB } from './constants';

export default function WithRouter() {
  // enabling useLocation and useHistory
  return <HashRouter><Routes /></HashRouter>;
}

function Routes() {
  const { pathname } = useLocation();
  const { replace } = useHistory();
  const currentTab = pathname === PATH.Party ? TAB.Party : TAB.Search;
  const [activeTab, setActiveTab] = useState(currentTab);

  function onChangeTab(_: any, index: TAB) {
    replace(index === TAB.Party ? PATH.Party : PATH.Search);
    setActiveTab(index);
  }

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SwipeableViews
        index={activeTab}
        containerStyle={{ height: '100%' }}
        disabled
      >
        <Switch>
          <Route component={Party}/>
          <Route path="/party" component={Party}/>
        </Switch>
        <Switch>
          <Redirect exact from="/" to="/party" />
          <Route path="/search" component={Search}/>
          <Route path="/pokemon/:pokemon" component={Detail}/>
          <Route path="/:generation/search" component={Search}/>
          <Route path="/:generation/pokemon/:pokemon" component={Detail}/>
          <Route component={NotFound}/>
        </Switch>
      </SwipeableViews>
      <Tabs
        value={activeTab}
        onChange={onChangeTab}
        variant="fullWidth"
        textColor="primary"
        aria-label="navigation tab"
      >
        <Tab component="a" label="Party" href={`#${PATH.Party}`}/>
        <Tab component="a" label="Search" href={`#${PATH.Search}`}/>
      </Tabs>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ margin: '40px auto'}}>404 Not Found</div>
  );
}
