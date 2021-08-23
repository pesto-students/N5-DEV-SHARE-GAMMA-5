const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAG88-J2aYQgUZvOaRFP9F366V8Dw6V-jU",
    authDomain: "devshare-89972.firebaseapp.com",
    projectId: "devshare-89972",
  });
  
var db = firebase.firestore();
module.exports = db;