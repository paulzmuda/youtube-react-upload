export let GoogleAuth;
export let gapi;
// arrays are easier to manage but GAPI expects a space-separated string
// every change prompts a new authorization action by user.
const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtubepartner'
].join(' '); 

const settings = {
  // fetch_basic_profile: false,
  scope: scopes,
  client_id: process.env.GOOGLE_CLIENT_ID,
  // 'apiKey': 'YOUR_API_KEY',
  // 'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
}

// The Google API library is imported directly from the main index.html file
// This is called when AppRouter component is loaded in DOM
export const loadGoogleApi = () => {
  return new Promise((resolve, reject) => {
    gapi = window.gapi; // we dont like globals
    if(typeof gapi === 'undefined') reject(new Error('There was a problem loading the Google API'));

    gapi.load('client:auth2', () => {
      gapi.client.init(settings).then(() => {
        GoogleAuth = gapi.auth2.getAuthInstance(); // set our auth2 instance to re-use on future requests
        resolve(true);
      }).catch((e) => {
        reject(new Error('There was a problem initializing the Google API'));
      });
    });
    
  });

};

// revokes all accepted permissions and needs to re-accept
export function revokeAccess() {
  GoogleAuth.disconnect();
}

export async function checkSigninStatus() {
    if(typeof GoogleAuth === 'undefined') {
      return await loadGoogleApi(async (status)=>{
        return await GoogleAuth.isSignedIn.get();
      });
    }
    return await GoogleAuth.isSignedIn.get();

    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(scopes);
    // if (isAuthorized) {
      if(GoogleAuth.isSignedIn.get()) {
        console.log('logged in')
        return true;
    } else {
      console.log('logged out')
      return false;
    }
}

// Inspired by and adopted from:
// https://eamoses.github.io/blog/2019/06/18/oauth-react.html
// https://medium.com/@augustinekwong/google-sign-in-for-reactjs-tutorial-1eb5d78ea2e6
// https://blog.hasura.io/best-practices-of-using-jwt-with-graphql/#refresh_token_persistance
// https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse
// https://developers.google.com/identity/sign-in/web/people
// https://stackoverflow.com/questions/49929134/how-to-get-refresh-token-for-google-api-using-firebase-authentication 
// https://usehooks.com/useScript/
// https://www.html5rocks.com/en/tutorials/cors/
// https://blog.416serg.me/building-an-app-using-google-sheets-api-react-d69681d22ce1
// https://blog.hasura.io/best-practices-of-using-jwt-with-graphql/
// https://firebase.google.com/docs/auth/web/google-signin
// https://www.npmjs.com/package/@types/gapi
// https://github.com/google/google-api-javascript-client
// https://github.com/google/google-api-javascript-client/blob/master/docs/samples.md
// https://github.com/google/google-api-javascript-client/blob/master/docs/cors.md
// https://github.com/google/google-api-javascript-client/blob/master/docs/start.md#setup

