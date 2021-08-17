import React, { useEffect, useState, createContext } from 'react';
import app from '../firebase';
import Spinner from '../components/spinner/Spinner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const fetchUserData = async () => {
    const userData = await app
      .firestore()
      .collection('users')
      .doc(currentUser.email)
      .get();

    setUserDetails(userData.data());
  };

  const fetchUserNotifications = async () => {
    await app
      .firestore()
      .collection('requests')
      .where('userEmail', '==', currentUser.email)
      .onSnapshot((data) => {
        if (data.docs && data.docs.length > 0) {
          setShowNotification(true);
        }
      });
  };
  const fetchMentorNotifications = async () => {
    await app
      .firestore()
      .collection('requests')
      .where('mentorEmail', '==', currentUser.email)
      .onSnapshot((data) => {
        if (data.docs && data.docs.length > 0) {
          setShowNotification(true);
        }
      });
  };
  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (currentUser) {
      fetchUserData();
      fetchUserNotifications();
      fetchMentorNotifications();
    }
  }, [currentUser]);
  const loginUser = (email, password) => {
    return app.auth().signInWithEmailAndPassword(email, password);
  };

  const registerUser = (workEmail, password) => {
    return app.auth().createUserWithEmailAndPassword(workEmail, password);
  };

  const logout = () => {
    app.auth().signOut();
    window.location.href = '/';
  };

  if (pending) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginUser,
        registerUser,
        logout,
        userDetails,
        fetchUserData,
        setShowNotification,
        showNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
