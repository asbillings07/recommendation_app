import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withContext from './Context';
import Home from './components/Home';
import Navigation from './components/Navigation';
import UserSignIn from './components/Users/UserSignIn';
import UserSignUp from './components/Users/UserSignUp';
import UserSignOut from './components/Users/UserSignOut';

import './css/App.css';

const App = () => {
  const NavigationWithContext = withContext(Navigation);
  const HomeWithContext = withContext(Home);
  const SignInWithContext = withContext(UserSignIn);
  const SignUpWithContext = withContext(UserSignUp);
  const SignOutWithContext = withContext(UserSignOut);

  return (
    <Router>
      <NavigationWithContext />
      <Switch>
        <Route exact path="/" component={HomeWithContext} />

        {/* <Route exact path="/home" component /> */}
        <Route path="/signup" component={SignUpWithContext} />
        <Route path="/signin" component={SignInWithContext} />
        <Route path="/signout" component={SignOutWithContext} />
      </Switch>
    </Router>
  );
};

export default App;
