import { GoogleAuth, revokeAccess, checkSigninStatus } from '../utils/google-auth';
import store from '../store';
// import { addAlert } from './alerts';

function authReady() {
  return {
    type: 'AUTH_READY',
  };
}

function loginPending() {
  return {
    type: 'LOGIN_PENDING',
  };
}

export function loginSuccess() {
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

function logoutPending() {
  return {
    type: 'LOGOUT_PENDING',
  };
}

export function logoutComplete() {
  return {
    type: 'LOGOUT_COMPLETE',
  };
}

export function userLoading(loading) {
  return {
    type: 'USER_LOADING',
    loading
  };
}

export function handleSignIn() {
  return async (dispatch) => {
    dispatch(loginPending());   
    GoogleAuth.signIn().catch((error) => {
      dispatch(loginError(error));
    });
  };
}

export function updateSigninStatus() {
  return async (dispatch) => {
    const isAuthorized = await checkSigninStatus();
    if(isAuthorized) {
      await dispatch(initUser()); // get user profile before proceeding
      dispatch(loginSuccess());
    } else {
      dispatch(logoutComplete());
    }
  }
}

export function initAuth() {
  return async (dispatch) => {
    // need to run on first time page load incase already logged in
    await dispatch(updateSigninStatus());
    // flags AppRouter to continue
    dispatch(authReady());
    // listen for changes to auth
    GoogleAuth.isSignedIn.listen(() => { store.dispatch(updateSigninStatus()) });
  }
}

export function initUser() {
  return async (dispatch) => {
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
    } 
    catch(e){ 
      dispatch(handleSignOut()); 
      // show an alert showing there was a problem loading the user
      // already doing that in the calling function, need to re-write this entire flow.
      throw e;
    } 
    finally {
      dispatch({type: 'USER_INIT_LOADING', loading: false});
    }
  }
}

// Logs the user out
export function handleSignOut() {
  return (dispatch) => {
    dispatch(logoutPending());
    return GoogleAuth.signOut().then(()=> {
      dispatch(logoutComplete());
    }).catch((error) => {
      dispatch(logoutComplete());
      dispatch(loginError(error));
    });
  };
}

export function handleInvalidateAccess() {
  return (dispatch) => {
    // invalidation API call
    revokeAccess();
    // handle sign out
    dispatch(logoutComplete());
  }
}
