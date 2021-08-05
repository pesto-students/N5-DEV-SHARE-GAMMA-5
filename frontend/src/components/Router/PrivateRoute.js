/* eslint-disable*/
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/context';
import VerifyEmail from '../email-verification/VerifyEmail';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser && !currentUser.emailVerified ? (
          <VerifyEmail />
        ) : currentUser && currentUser.emailVerified ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export default PrivateRoute;
