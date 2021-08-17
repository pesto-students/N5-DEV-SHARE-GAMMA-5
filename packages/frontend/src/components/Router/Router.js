import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from '../sign-up/SignUp';
import Landing from '../Landing/Landing';
import VerifyEmail from '../email-verification/VerifyEmail';
import Navbar from '../Layout/Navbar/Navbar';
import Footer from '../Layout/Footer/Footer';
import PrivateRoute from './PrivateRoute';
import NotFound from '../Not-Found/NotFound';
import Dashboard from '../Dashboard/Dashboard';
import PostVerification from '../email-verification/PostVerification';
import OneTimeSetup from '../One-time-setup/OneTimeSetup';
import Settings from '../settings/Settings';
import UserProfile from '../user-profile/UserProfile';
import CompanyDetail from '../company-detail/CompanyDetail';
import { AuthProvider } from '../../context/context';
import QuestionDetail from '../question-details/QuestionDetail';
import Notifications from '../notifications/Notifications';

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <PrivateRoute
            exact
            path='/post-verify'
            component={PostVerification}
          />
          <Route exact path='/register' component={SignUp} />
          <Route exact path='/company/:company' component={CompanyDetail} />
          <PrivateRoute
            exact
            path='/onboarding-setup'
            component={OneTimeSetup}
          />
          <PrivateRoute exact path='/verify' component={VerifyEmail} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/settings' component={Settings} />
          <PrivateRoute exact path='/notifications' component={Notifications} />
          <Route exact path='/user/:nickName' component={UserProfile} />
          <Route exact path='/question/:id' component={QuestionDetail} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
