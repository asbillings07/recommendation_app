import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withContext from './Context';
import Home from './components/Home';
import Navigation from './components/Navigation';
import UserSignIn from './components/Users/UserSignIn';
import UserSignUp from './components/Users/UserSignUp';
import UserSignOut from './components/Users/UserSignOut';
import Confirm from './components/Users/Confirm';
import Notifications from 'react-notify-toast';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './components/Users/ForgotPassword';
import ResetPassword from './components/Users/ResetPassword';

const App = () => {
  const NavigationWithContext = withContext(Navigation);
  const HomeWithContext = withContext(Home);
  const SignInWithContext = withContext(UserSignIn);
  const SignUpWithContext = withContext(UserSignUp);
  const SignOutWithContext = withContext(UserSignOut);
  const ForgotPasswordWithContext = withContext(ForgotPassword);
  const ResetPasswordWithContext = withContext(ResetPassword);
  const ConfirmWithContext = withContext(Confirm);

  return (
    <Router>
      <Notifications />
      <NavigationWithContext />
      <Switch>
        <Route exact path="/" component={HomeWithContext} />

        {/* <Route exact path="/home" component /> */}
        <Route path="/signup" component={SignUpWithContext} />
        <Route path="/confirm/:id" component={ConfirmWithContext} />
        <Route path="/signin" component={SignInWithContext} />
        <Route path="/signout" component={SignOutWithContext} />
        <Route path="/forgotpassword" component={ForgotPasswordWithContext} />
        <Route path="/reset/:token" component={ResetPasswordWithContext} />
      </Switch>
    </Router>
  );
};

export default App;
