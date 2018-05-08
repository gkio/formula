import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Driver from './Pages/Driver';
import Drivers from './Pages/Drivers';
import './style.scss';

const App = () => (
  <div className="app">
    <Switch>
      <Route path="/drivers" component={Drivers} />
      <Route path="/driver/:driver" component={Driver} />
      <Redirect from="/" to="/drivers" />
    </Switch>
  </div>
);

export default App;
