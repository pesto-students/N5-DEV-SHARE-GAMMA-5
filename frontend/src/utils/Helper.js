import app from '../firebase';

export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const checkIfUsernameExists = (username) => {
  return app.firestore().collection('usernames').doc(username).get();
};

export const checkIfEmailExists = (email) => {
  return app.auth().fetchSignInMethodsForEmail(email);
};
