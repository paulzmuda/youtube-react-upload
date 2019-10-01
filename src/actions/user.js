import { handleAuthClick } from './gapi';
import { GoogleAuth, signInWithGoogle, scopes } from '../utils/google-auth';
import { getGoogleUser } from '../api/google-user';

// import { addAlert } from './alerts';

function requestLogin(creds) {
  return {
    type: 'LOGIN_REQUEST',
  };
}

export function receiveLogin() {
  return {
    type: 'LOGIN_SUCCESS',
  };
}

function loginError(message) {
  return {
    type: 'LOGIN_FAILURE',
    message,
  };
}

function requestLogout() {
  return {
    type: 'LOGOUT_REQUEST',
  };
}

export function successLogout() {
  return {
    type: 'LOGOUT_SUCCESS',
  };
}

export function userLoading(loading) {
  return {
    type: 'USER_LOADING',
    loading
  };
}

export function updateSigninStatus() {
  
  return async (dispatch) => {
    // let user = GoogleAuth.currentUser.get();
    // let isAuthorized = user.hasGrantedScopes(scopes);
    // if (isAuthorized) {
      if(GoogleAuth.isSignedIn.get()) {
        await dispatch(initUser());
        dispatch({type: 'LOGIN_SUCCESS'});
        
      // document.getElementById('revoke-access-button').style.display = 'inline-block'
      // document.getElementById('auth-status').innerHTML = `Welcome ${user.w3.ofa}, you are currently signed in and have granted access to this app.`
    } else {
      dispatch({type: 'LOGOUT_SUCCESS'});

      // document.getElementById('revoke-access-button').style.display = 'none'
      // document.getElementById('auth-status').innerHTML = 'You have not authorized this app or you are signed out.'
    }
  }
}

export function initUser() {
  return async (dispatch) => {
    console.log('RUNNING INITUSER NOW')
    try {

      dispatch({type: 'USER_INIT_LOADING', loading: true});

      const GoogleUser = GoogleAuth.currentUser.get();
      const BasicProfile = GoogleUser.getBasicProfile();

      // https://developers.google.com/identity/sign-in/web/reference#googleusergetbasicprofile
      const userObject = {
        userId: BasicProfile.getId(),
        firstName: BasicProfile.getGivenName(),
        lastName: BasicProfile.getFamilyName(),
        email: BasicProfile.getEmail(),
        avatar: BasicProfile.getImageUrl()
      }

      // user store
      dispatch({type: 'USER_INIT_SUCCESS', ...userObject});
      dispatch({type: 'LOGIN_MESSAGES_RESET'});
      dispatch({type: 'USER_INIT_LOADING', loading: false});

    } 
    catch(e){ 
      throw e;
    } 
    finally {
      // dispatch(carrierLoading(true));dispatch(carrierLoading(false));
    }
  }
}

export function handleNonUser() {
  return (dispatch) => {
    console.log('handle non user');
    // reset auth, something bad happened that led us here
    // GoogleAuth.signOut(); 
    dispatch(successLogout());
  }
}

// Logs the user out
export function handleSignOut() { // HOW DO I INVALIDATE TOKEN AT AUTH0???
  return (dispatch) => {
    console.log('handle sign out')
    dispatch(requestLogout()); // UI changes only
    GoogleAuth.signOut().then(()=> {
      console.log('signing out')
      dispatch(handleNonUser());      
    }).catch((error) => {
      dispatch(handleNonUser());
      console.log(error);
    });
  };
}

export function handleReceivedUser() {
  return async (dispatch) => {
    try {
      // dispatch({type: 'USER_LOADING', loading: true});
      await dispatch(initUser()); // get user info from Google
    }
    catch (e) {
      console.log(e);
      await dispatch(handleSignOut());
      throw e;
    }
    // window.localStorage.setItem(storageKey, user.uid);
    dispatch(receiveLogin());
    dispatch({type: 'USER_INIT_LOADING', loading: false});
  }
}

export function handleSignIn() {
  return async (dispatch) => {
    dispatch(requestLogin()); // UI changes only
    // auth server
    try {
      GoogleAuth.signIn().then(()=>{
        console.log('signing in');
        dispatch(updateSigninStatus());
        dispatch({type: 'LOGIN_SUCCESS'})
        // dispatch(handleReceivedUser());
      }).catch((error)=>{
        console.log(error);
      });
                // then basically dont do anything (none of the below) because
                // we have a listener for onAuthStateChanged in the AppRouter!!!
    } catch (e) {
      console.log(e);
      console.log('--------------------------------------------');
      console.log('need to DISPATCH AN ERROR MESSAGE');
      console.log(e.code);
      dispatch(loginError(e.code));
      console.log('--------------------------------------------');
      return e;
    }
  };
}
