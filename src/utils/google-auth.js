export let GoogleAuth;
export let gapi;
export const scopes = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

// https://www.googleapis.com/auth/contacts.readonly 
//  https://www.googleapis.com/auth/plus.login

// async function initClient() {
//   return await gapi.client.init({
//     client_id: process.env.GOOGLE_CLIENT_ID,
//     fetch_basic_profile: false,
//     scope: 'profile'
//     // 'apiKey': 'YOUR_API_KEY',
//     // 'clientId': 'YOUR_CLIENT_ID',
//     // 'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
//     // 'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
//   });
// }

const settings = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  // fetch_basic_profile: false,
  scope: scopes
  // 'apiKey': 'YOUR_API_KEY',
  // 'clientId': 'YOUR_CLIENT_ID',
  // 'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
  // 'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
}

// function initClient() {
//     console.log('init client google');
//     return gapi.client.init(settings);
//     // .then(() => {
//     //   GoogleAuth = gapi.auth2.getAuthInstance();
//     //   console.log('hhhheeerrreee');
//     //   console.log(GoogleAuth.isSignedIn.get());
//     //   return GoogleAuth.isSignedIn.get();
//     //   // need to dispatch this from within user actions and reducer...
//     //   // GoogleAuth.isSignedIn.listen(dispatch(updateSigninStatus));
//     //   // dispatch(setSigninStatus());
//     //   // /

//     //               // document.getElementById('sign-in-or-out-button').addEventListener('click', () => {
//     //               //   this.handleAuthClick();
//     //               // });
//     //               // document.getElementById('revoke-access-button').addEventListener('click', () => {
//     //               //   this.revokeAccess();
//     //               // });
//     // });
// }

// async function loadGoogleApi() {
//     gapi = window.gapi;
//     return await gapi.load('client:auth2', async _ => {
//       await initClient();
//       GoogleAuth = await gapi.auth2.getAuthInstance();
//       return await GoogleAuth.isSignedIn.get();
//     });
// }

export async function loadGoogleApi(_callback) {
    gapi = window.gapi;
    return await gapi.load('client:auth2', async () => {
      return await gapi.client.init(settings).then(() => {
        GoogleAuth = gapi.auth2.getAuthInstance();
        return _callback(true);
      });
    // GoogleAuth = await gapi.auth2.getAuthInstance();
    // return await GoogleAuth.isSignedIn.get();
  });
};

export async function checkSigninStatus() {
    console.log('checkSigninStatus')
    if(typeof GoogleAuth === 'undefined') {
      console.log('1')
      return await loadGoogleApi(async (status)=>{
        return await GoogleAuth.isSignedIn.get();
      });
    }
    console.log('2')
    return await GoogleAuth.isSignedIn.get();

    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(scopes);
    console.log('sign in status listener hit');
    console.log(user);
    // 
    // if (isAuthorized) {
      if(GoogleAuth.isSignedIn.get()) {
        console.log('logged in')
        return true;
      // document.getElementById('sign-in-or-out-button').innerHTML = 'Sign out'
      // document.getElementById('revoke-access-button').style.display = 'inline-block'
      // document.getElementById('auth-status').innerHTML = `Welcome ${user.w3.ofa}, you are currently signed in and have granted access to this app.`
    } else {
      console.log('logged out')
      return false;
      // document.getElementById('sign-in-or-out-button').innerHTML = 'Sign in'
      // document.getElementById('revoke-access-button').style.display = 'none'
      // document.getElementById('auth-status').innerHTML = 'You have not authorized this app or you are signed out.'
    }
}




// const config = {
//   apiKey: process.env.GOOGLE_API_KEY,
//     authDomain: process.env.GOOGLE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.GOOGLE_PROJECT_ID,
//     storageBucket: "",
//     messagingSenderId: process.env.GOOGLE_MESSAGING_SENDER_ID,
//     appId: process.env.GOOGLE_APP_ID
// }

// Google Auth Provider
// export const provider = new firebase.auth.GoogleAuthProvider();
// // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// provider.addScope('https://www.googleapis.com/auth/youtube');
// provider.addScope('https://www.googleapis.com/auth/userinfo.email');
// provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
// provider.addScope('https://www.googleapis.com/auth/plus.login');

// export const auth2 = () => 
//   window.gapi.auth2.init({
//     client_id: process.env.GOOGLE_CLIENT_ID,
//     fetch_basic_profile: false,
//     scope: 'profile'
//   });

// export const isAuthenticated = () => {
//   return window.gapi.auth2.isSignedIn.get();
// };

// export const signInWithGoogle = () => {
//   // firebase.auth().signInWithRedirect(provider);
//     // const auth2 = window.gapi.auth2.init({
//     //   client_id: process.env.GOOGLE_CLIENT_ID,
//     //   fetch_basic_profile: false,
//     //   scope: 'profile'
//     // });
//     // Sign the user in, and then retrieve their ID.
//     auth2().signIn().then(function() {
//       console.log(auth2().currentUser.get().getId());
//     });
// }


// export const handleGoogleToken = () => {
//   auth.getRedirectResult().then(function(result) {
//     if (result.credential) {
//       console.log('yep')
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = result.credential.accessToken;
//       // console.log(result.credential);
//       var xhr = new XMLHttpRequest();
//       xhr.open('GET',
//         'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names');
//       xhr.setRequestHeader('Authorization',
//         'Bearer ' + token);
//       xhr.send();
//       // ...
//       xhr.onload = function() {
//         var responseText = xhr.responseText;
//         console.log(responseText);

//         // https://eamoses.github.io/blog/2019/06/18/oauth-react.html
// //https://medium.com/@augustinekwong/google-sign-in-for-reactjs-tutorial-1eb5d78ea2e6

// // https://blog.hasura.io/best-practices-of-using-jwt-with-graphql/#refresh_token_persistance

//         // https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse
// //https://developers.google.com/identity/sign-in/web/people

// //https://stackoverflow.com/questions/49929134/how-to-get-refresh-token-for-google-api-using-firebase-authentication 

// // https://usehooks.com/useScript/

//         // https://www.html5rocks.com/en/tutorials/cors/
//         // https://blog.416serg.me/building-an-app-using-google-sheets-api-react-d69681d22ce1
//         // https://blog.hasura.io/best-practices-of-using-jwt-with-graphql/
//         // https://firebase.google.com/docs/auth/web/google-signin
//         // https://www.npmjs.com/package/@types/gapi
//         // https://github.com/google/google-api-javascript-client/blob/master/docs/samples.md
//         // https://github.com/google/google-api-javascript-client/blob/master/docs/cors.md
//         // https://github.com/google/google-api-javascript-client/blob/master/docs/start.md#setup
//         // https://github.com/google/google-api-javascript-client








//         // 
//         // {
//         //   "resourceName": "people/110878525516078574128",
//         //   "etag": "%EgUBAj03LhoEAQIFByIMSnFlS0YyTG9rNzg9",
//         //   "names": [
//         //     {
//         //       "metadata": {
//         //         "primary": true,
//         //         "source": {
//         //           "type": "PROFILE",
//         //           "id": "110878525516078574128"
//         //         }
//         //       },
//         //       "displayName": "Paul Zmuda",
//         //       "familyName": "Zmuda",
//         //       "givenName": "Paul",
//         //       "displayNameLastFirst": "Zmuda, Paul"
//         //     }
//         //   ]
//         // }
//        };
       
//        xhr.onerror = function() {
//          console.log('There was an error!');
//        };
//     }
//     // The signed-in user info.
//     var user = result.user;
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });
// }
