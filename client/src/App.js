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
import CategoryDetail from './components/Categories/CategoryDetail';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './components/Users/ForgotPassword';
import ResetPassword from './components/Users/ResetPassword';
import RecommendationDetail from './components/Recommendation/RecommendationDetail';
import UpdateRecommendation from './components/Recommendation/UpdateRecommendation';
import CreateRecommendation from './components/Recommendation/CreateRecommendation';
import NotFound from './components/Errors/NotFound';
import UnhandledError from './components/Errors/UnhandledError';
import Forbidden from './components/Errors/Forbidden';
import GMap from './components/Map/GMap';

const App = () => {
  const NavigationWithContext = withContext(Navigation);
  const HomeWithContext = withContext(Home);
  const SignInWithContext = withContext(UserSignIn);
  const SignUpWithContext = withContext(UserSignUp);
  const SignOutWithContext = withContext(UserSignOut);
  const ForgotPasswordWithContext = withContext(ForgotPassword);
  const ResetPasswordWithContext = withContext(ResetPassword);
  const ConfirmWithContext = withContext(Confirm);
  const CategoryDetailWithContext = withContext(CategoryDetail);
  const RecommendationDetailWithContext = withContext(RecommendationDetail);
  const UpdateRecommendationWithContext = withContext(UpdateRecommendation);
  const CreateRecommendationWithContext = withContext(CreateRecommendation);

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
        <Route
          exact
          path="/category/:id"
          component={CategoryDetailWithContext}
        />
        <Route
          exact
          path="/rec/:id"
          component={RecommendationDetailWithContext}
        />
        <Route path="/map" component={GMap} />
        <PrivateRoute
          path="/rec/:id/update"
          component={UpdateRecommendationWithContext}
        />
        <PrivateRoute
          path="/category/:id/rec-create"
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
