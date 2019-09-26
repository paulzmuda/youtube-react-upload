import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.GOOGLE_API_KEY,
    authDomain: process.env.GOOGLE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.GOOGLE_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.GOOGLE_MESSAGING_SENDER_ID,
    appId: process.env.GOOGLE_APP_ID
}

export const app = firebase.initializeApp(config);
export const auth = app.auth();
export const storageKey = 'pz-yt-ul';

// Google Auth Provider
export const provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.addScope('https://www.googleapis.com/auth/youtube');
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
provider.addScope('https://www.googleapis.com/auth/plus.login');

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
};
export const emailAuthProvider = firebase.auth.EmailAuthProvider;

export const signInWithGoogle = () => {
  firebase.auth().signInWithRedirect(provider);
}

export const handleGoogleToken = () => {
  auth.getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log(token);
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
