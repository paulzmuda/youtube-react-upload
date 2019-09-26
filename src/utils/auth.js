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
      console.log('yep')
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log(token);
      var xhr = new XMLHttpRequest();
      xhr.open('GET',
        'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names');
      xhr.setRequestHeader('Authorization',
        'Bearer ' + token);
      xhr.send();
      // ...
      xhr.onload = function() {
        var responseText = xhr.responseText;
        console.log(responseText);
        // https://www.html5rocks.com/en/tutorials/cors/
        // https://blog.416serg.me/building-an-app-using-google-sheets-api-react-d69681d22ce1
        // https://blog.hasura.io/best-practices-of-using-jwt-with-graphql/
        // https://firebase.google.com/docs/auth/web/google-signin
        // https://www.npmjs.com/package/@types/gapi
        // https://github.com/google/google-api-javascript-client/blob/master/docs/samples.md
        // https://github.com/google/google-api-javascript-client/blob/master/docs/cors.md
        // https://github.com/google/google-api-javascript-client/blob/master/docs/start.md#setup
        // https://github.com/google/google-api-javascript-client
        // 
        // {
        //   "resourceName": "people/110878525516078574128",
        //   "etag": "%EgUBAj03LhoEAQIFByIMSnFlS0YyTG9rNzg9",
        //   "names": [
        //     {
        //       "metadata": {
        //         "primary": true,
        //         "source": {
        //           "type": "PROFILE",
        //           "id": "110878525516078574128"
        //         }
        //       },
        //       "displayName": "Paul Zmuda",
        //       "familyName": "Zmuda",
        //       "givenName": "Paul",
        //       "displayNameLastFirst": "Zmuda, Paul"
        //     }
        //   ]
        // }
       };
       
       xhr.onerror = function() {
         console.log('There was an error!');
       };
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
