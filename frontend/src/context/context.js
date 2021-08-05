import React, { useEffect, useState, createContext } from 'react';
import app from '../firebase';
import Spinner from '../components/spinner/Spinner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
    return () => unsubscribe();
  }, []);

  const loginUser = (email, password) => {
    return app.auth().signInWithEmailAndPassword(email, password);
  };

  const registerUser = (workEmail, password) => {
    return app.auth().createUserWithEmailAndPassword(workEmail, password);
  };

  const logout = () => app.auth().signOut();

  if (pending) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider
      // eslint-disable-next-line
      value={{ currentUser, loginUser, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
