// import { GoogleAuth, gapi, scopes } from '../utils/gapi-client';
import store from '../store';
export let GoogleAuth;
export let gapi;
export const scopes = 'https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.login';


export function setSigninStatus() {
  return async (dispatch) => {
    console.log(';aksjdf;lakjsdfajksdfjkask;fdasfads;fk;fkas;lkfasdljklkllkll')
    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(scopes);
    console.log('sign in status listener hit');
    console.log(user);
    // 
    // if (isAuthorized) {
      if(GoogleAuth.isSignedIn.get()) {
        console.log('login')
      dispatch({type: 'LOGIN_SUCCESS'});
      // let first = user.w3.ofa
      // let last = user.w3.wea
      // let full = first+last
      // let display = user.w3.ig
      // let fullName = full.toLowerCase();
      // this.setState({ 
      //   isAuthorized: true,
      //   user: fullName,
      //   userDisplay: display
      // })
      // console.log(this.state.isAuthorized)
      // document.getElementById('sign-in-or-out-button').innerHTML = 'Sign out'
      // document.getElementById('revoke-access-button').style.display = 'inline-block'
      // document.getElementById('auth-status').innerHTML = `Welcome ${user.w3.ofa}, you are currently signed in and have granted access to this app.`
    } else {
      console.log('log out')
      dispatch({type: 'LOGOUT_SUCCESS'});
      // this.setState({
      //   isAuthorized: false,
      //   user: '',
      //   userDisplay: ''
      // })
      // console.log(this.state.isAuthorized)
      // document.getElementById('sign-in-or-out-button').innerHTML = 'Sign in'
      // document.getElementById('revoke-access-button').style.display = 'none'
      // document.getElementById('auth-status').innerHTML = 'You have not authorized this app or you are signed out.'
    }
  }
}

  
export function loadApi() {
  return async (dispatch) => {
    window.gapi.load('client:auth2', _ => {
      dispatch(initClient());
    });
  }
}

export function initClient() {
  return async (dispatch) => {
    window.gapi.client.init({
      client_id: process.env.GOOGLE_CLIENT_ID,
      fetch_basic_profile: false,
      scope: 'profile'
      // 'apiKey': 'YOUR_API_KEY',
      // 'clientId': 'YOUR_CLIENT_ID',
      // 'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      // 'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    }).then(() => {
      GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.isSignedIn.listen(dispatch(updateSigninStatus));
      dispatch(setSigninStatus());
      // document.getElementById('sign-in-or-out-button').addEventListener('click', () => {
      //   this.handleAuthClick();
      // });
      // document.getElementById('revoke-access-button').addEventListener('click', () => {
      //   this.revokeAccess();
      // });
    });
  }
}
export function handleAuthClick() {
  return async (dispatch) => {
    if (GoogleAuth.isSignedIn.get()) {
      GoogleAuth.signOut();
    } else {
      GoogleAuth.signIn();
    }
  }
}
export function revokeAccess() {
  return async (dispatch) => {
    GoogleAuth.disconnect();
  }
}
export function updateSigninStatus() {
  return async (dispatch) => {
    store.dispatch(setSigninStatus());
  }
}

export function testGapi() {
  return async (dispatch) => {
    var user = GoogleAuth.currentUser.get();
    var oauthToken = user.getAuthResponse().access_token;
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names');
    xhr.setRequestHeader('Authorization',
      'Bearer ' + oauthToken);
    xhr.send();
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
}

// export const initGapi = () => {
//     console.log('init GAPI called');
//     window.gapi.client.init({
//         'apiKey': process.env.GOOGLE_API_KEY,
//         // clientId and scope are optional if auth is not required.
//         'clientId': process.env.GOOGLE_CLIENT_ID,
//         'scope': 'profile',
//       }).then(function() {
//         // 3. Initialize and make the API request.
//         console.log('step 3');
//         return window.gapi.client.request({
//           'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
//         })
//       }).then(function(response) {
//           console.log('error note here')
//         console.log(response.result);
//       }, function(reason) {
//         console.log('Error: ' + reason.result.error.message);
//       });
//     // 1. Load the JavaScript client library.
//     // window.gapi.load('client', start);
// }



// class GoogleAuth {
//   constructor() {
//       // this.gapi = windowgapi;
//       // this.auth2 = null;
//       // this.id = null;
//   }

//   initGapi() {
//     this.gapi.load('auth2', () => {
//       this.gapi.auth2.init({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//       }).then((auth2) => {
//         this.auth2 = auth2;
//       });
//     });
//   }

//   isAuthenticated() {
//     this.id = auth2.currentUser.get().getId();
//     return this.id;
//   }

//   if(auth2.isSignedIn.get()) {
//     console.log('Auth: User is logged in...');
//     console.log(auth2.currentUser.get().getId());
//     // await this.props.dispatch(handleReceivedUser(user));
//   } else {
//     // await this.props.dispatch(handleNonUser());
//     history.push('/login');
//   }

// }

// module.exports = GoogleAuth;