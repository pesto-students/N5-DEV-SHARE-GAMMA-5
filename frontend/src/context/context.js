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

  const loginUser = async (email, password) => {
    return app.auth().signInWithEmailAndPassword(email, password);
  };

  const registerUser = async (workEmail, password) => {
    return app.auth().createUserWithEmailAndPassword(workEmail, password);
  };

  if (pending) {
    return <Spinner />;
  }
  return (
    <AuthContext.Provider value={{ currentUser, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
