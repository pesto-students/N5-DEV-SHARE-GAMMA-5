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
import { AuthProvider } from '../../context/context';

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
          <PrivateRoute exact path='/onboarding-setup' component={OneTimeSetup} />
          <PrivateRoute exact path='/verify' component={VerifyEmail} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
