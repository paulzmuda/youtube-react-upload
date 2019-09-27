
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
    dispatch(setSigninStatus());
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