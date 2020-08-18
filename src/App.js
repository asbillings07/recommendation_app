import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/MainPage/Home'
import Navigation from './components/MainPage/Navigation'
import UserSignIn from './components/Users/UserSignIn'
import UserSignUp from './components/Users/UserSignUp'
import UserSignOut from './components/Users/UserSignOut'
import Confirm from './components/Users/Confirm'
import Notifications from 'react-notify-toast'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './components/Users/ForgotPassword'
import ResetPassword from './components/Users/ResetPassword'
import UpdateRecommendation from './components/Recommendation/UpdateRecommendation'
import { CreateRecommendation } from './components/Recommendation/CreateRecommendation'
import NotFound from './components/Errors/NotFound'
import UnhandledError from './components/Errors/UnhandledError'
import Forbidden from './components/Errors/Forbidden'
import RecDetail from './components/Recommendation/RecDetail'
import { Profile } from './components/Profile/Profile'
import ProfileEdit from './components/Profile/ProfileEdit'

const App = () => {
  return (
    <Router>
      <Notifications />
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={UserSignUp} />
        <Route path='/confirm/:id' component={Confirm} />
        <Route path='/signin' component={UserSignIn} />
        <Route path='/signout' component={UserSignOut} />
        <Route path='/forgotpassword' component={ForgotPassword} />
        <Route path='/reset/:token' component={ResetPassword} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute path='/profile/edit' component={ProfileEdit} />
        <Route exact path='/category/:id/recs' component={RecDetail} />
        <PrivateRoute exact path='/category/:id/recs/update' component={UpdateRecommendation} />
        <PrivateRoute exact path='/category/:id/recs/create' component={CreateRecommendation} />
        <Route path='/forbidden' component={Forbidden} />
        <Route path='/error' component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
