import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withContext from './Context';
import Home from './components/MainPage/Home';
import Navigation from './components/MainPage/Navigation';
import UserSignIn from './components/Users/UserSignIn';
import UserSignUp from './components/Users/UserSignUp';
import UserSignOut from './components/Users/UserSignOut';
import Confirm from './components/Users/Confirm';
import Notifications from 'react-notify-toast';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './components/Users/ForgotPassword';
import ResetPassword from './components/Users/ResetPassword';
import UpdateRecommendation from './components/Recommendation/UpdateRecommendation';
import { CreateRecommendation } from './components/Recommendation/CreateRecommendation';
import NotFound from './components/Errors/NotFound';
import UnhandledError from './components/Errors/UnhandledError';
import Forbidden from './components/Errors/Forbidden';
import RecDetail from './components/Recommendation/RecDetail';
import { Profile } from './components/Profile/Profile';
import ProfileEdit from './components/Profile/ProfileEdit';

const App = () => {
  const NavigationWithContext = withContext(Navigation);
  const HomeWithContext = withContext(Home);
  const SignInWithContext = withContext(UserSignIn);
  const SignUpWithContext = withContext(UserSignUp);
  const SignOutWithContext = withContext(UserSignOut);
  const ForgotPasswordWithContext = withContext(ForgotPassword);
  const ResetPasswordWithContext = withContext(ResetPassword);
  const ConfirmWithContext = withContext(Confirm);
  const UpdateRecommendationWithContext = withContext(UpdateRecommendation);
  const CreateRecommendationWithContext = withContext(CreateRecommendation);
  const RecDetailWithContext = withContext(RecDetail);
  const ProfileWithContext = withContext(Profile);
  const ProfileEditWithContext = withContext(ProfileEdit);

  return (
    <Router>
      <Notifications />
      <NavigationWithContext />
      <Switch>
        <Route exact path="/" component={HomeWithContext} />
        <Route path="/signup" component={SignUpWithContext} />
        <Route path="/confirm/:id" component={ConfirmWithContext} />
        <Route path="/signin" component={SignInWithContext} />
        <Route path="/signout" component={SignOutWithContext} />
        <Route path="/forgotpassword" component={ForgotPasswordWithContext} />
        <Route path="/reset/:token" component={ResetPasswordWithContext} />
        <PrivateRoute exact path="/profile" component={ProfileWithContext} />
        <PrivateRoute path="/profile/edit" component={ProfileEditWithContext} />
        <Route
          exact
          path="/category/:id/recs"
          component={RecDetailWithContext}
        />
        <PrivateRoute
          exact
          path="/category/:id/recs/update"
          component={UpdateRecommendationWithContext}
        />
        <PrivateRoute
          exact
          path="/category/:id/recs/create"
          component={CreateRecommendationWithContext}
        />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
