import { GoogleAuth, revokeAccess, signInWithGoogle, scopes } from '../utils/google-auth';
// import { addAlert } from './alerts';

function loginPending(creds) {
  return {
    type: 'LOGIN_REQUESTED_PENDING',
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
    type: 'LOGOUT_REQUESTED_PENDING',
  };
}

export function logoutSuccess() {
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

export function handleSignIn() {
  return async (dispatch) => {
    dispatch(loginPending());
    GoogleAuth.signIn().then(()=>{
      dispatch(updateSigninStatus()); // dispatch(handleReceivedUser());
    }).catch((error)=>{
      dispatch(loginError(error)); // dispatch(handleNonUser());
    });
  };
}


//////////////////////////////////////////////////  MOVE THESE GOOGLE ACTIONS BACK TO GOOGLE-AUTH.JS
export function updateSigninStatus() {
  return async (dispatch) => {
    const user = GoogleAuth.currentUser.get();
    const scopeCheck = user.hasGrantedScopes(scopes);
    const signedIn = GoogleAuth.isSignedIn.get();
    // GoogleAuth.isSignedIn.listen(this.props.dispatch(updateSigninStatus()));
      if(scopeCheck && signedIn) {
        await dispatch(initUser());
        dispatch({type: 'LOGIN_SUCCESS'});
    } else {
      dispatch(handleSignOut());  
    }
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

export function handleNonUser() {
  return (dispatch) => {
    // logout app reset cleanup here
    dispatch(logoutSuccess());
  }
}

// Logs the user out
export function handleSignOut() { // HOW DO I INVALIDATE TOKEN AT AUTH0???
  return (dispatch) => {
    dispatch(logoutPending()); // UI changes only
    return GoogleAuth.signOut().then(()=> {
      dispatch(handleNonUser());      
    }).catch((error) => {
      dispatch(handleNonUser());
      dispatch(loginError(error));
    });
  };
}

export function handleInvalidateAccess() {
  return (dispatch) => {
    // invalidation API call
    revokeAccess();
    // handle sign out
    dispatch(handleNonUser());
    // logout success with invalidation successful message?

  }
}

export function handleReceivedUser() {
  return async (dispatch) => {
    try {
      // dispatch({type: 'USER_LOADING', loading: true});
      await dispatch(initUser()); // get user info from Google
      dispatch(loginSuccess());
    }
    catch (e) {
      console.log(e);
      dispatch(handleSignOut());
      dispatch(loginError('There was a problem loading your information, please try signing in again.'));
      throw e;
    }
  }
}
