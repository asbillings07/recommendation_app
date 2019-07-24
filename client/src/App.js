import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withContext from './Context';
import Home from './components/Home';
import Navigation from './components/Navigation';

import './css/App.css';

const App = () => {
  const NavigationWithContext = withContext(Navigation);
  const HomeWithContext = withContext(Home);
  return (
    <Router>
      <NavigationWithContext />
      <Switch>
        {/* <Route path="/" component={} /> */}

        <Route exact path="/home" component={HomeWithContext} />
      </Switch>
    </Router>
  );
};

export default App;
