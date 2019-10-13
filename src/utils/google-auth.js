export let GoogleAuth;
export let gapi;

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
  // 'apiKey': 'process.env.GOOGLE_API_KEY',
}

// The Google API library is imported directly from the main index.html file
// Called when AppRouter component is loaded in DOM
export const loadGoogleApi = () => {
  return new Promise((resolve, reject) => {
    gapi = window.gapi; // dont want to use globals
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
}

// revokes all accepted permissions and needs to re-accept
export function revokeAccess() {
  GoogleAuth.disconnect();
}

export async function checkSigninStatus() {
    if(typeof GoogleAuth === 'undefined') {
      try {
        const apiStatus = await loadGoogleApi();
        if(apiStatus) {
          return await GoogleAuth.isSignedIn.get();
        } else {
          return false;
        }
      } catch(e) {
        console.log(e);
        return false;
      }
    }
    const user = GoogleAuth.currentUser.get();
    const isAuthorized = user.hasGrantedScopes(scopes);
    return (GoogleAuth.isSignedIn.get() && isAuthorized);
}
