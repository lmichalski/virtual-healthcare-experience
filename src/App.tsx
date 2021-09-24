import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Main from './Main'

import logo from './logo.svg';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="fullscreen">
        <div className="view" role="application">
        <Switch>
            <Route path="/main">
              <Main />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
