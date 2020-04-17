import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Store } from '../store';
import {
  GoogleAuth,
  revokeAccess,
  checkSigninStatus,
} from '../utils/google-auth';


function authReady() {
  return {
    type: 'AUTH_READY',
  };
}

function loginLogoutPending() {
  return {
    type: 'LOGIN_LOGOUT_PENDING',
  };
}

export function loginSuccess(successMessage: string = '') {
  return {
    type: 'LOGIN_SUCCESS',
    login: { successMessage },
  };
}

function loginError(errorMessage: string = '') {
  return {
    type: 'LOGIN_FAILURE',
    login: { errorMessage },
  };
}

export function logoutComplete() {
  return {
    type: 'LOGOUT_COMPLETE',
  };
}

export function userLoading(loading: Boolean) {
  return {
    type: 'USER_LOADING',
    loading,
  };
}

export function handleSignIn() {
  return async (dispatch: Dispatch) => {
    dispatch(loginLogoutPending());
    await GoogleAuth.signIn().catch((error: Error) => {
      dispatch(loginError(error.message));
    });
  };
}

export function handleSignOut() {
  return async (dispatch: Dispatch) => {
    dispatch(loginLogoutPending());
    await GoogleAuth.signOut()
      .then(() => {
        dispatch(logoutComplete());
      })
      .catch((error: Error) => {
        dispatch(loginError(error.message));
      });
  };
}

export function initUser() {
  return async (dispatch: ThunkDispatch<Store, void, Action>) => {
    try {
      dispatch({ type: 'USER_INIT_LOADING', loading: true });
      const GoogleUser = GoogleAuth.currentUser.get();
      const BasicProfile = GoogleUser.getBasicProfile();
      // https://developers.google.com/identity/sign-in/web/reference#googleusergetbasicprofile
      const userObject = {
        userId: BasicProfile.getId(),
        firstName: BasicProfile.getGivenName(),
        lastName: BasicProfile.getFamilyName(),
        email: BasicProfile.getEmail(),
        avatar: BasicProfile.getImageUrl(),
      };
      // user store
      dispatch({ type: 'USER_INIT_SUCCESS', ...userObject });
      dispatch({ type: 'LOGIN_MESSAGES_RESET' });
    } catch (e) {
      // @TODO
      console.log(e);
      dispatch(handleSignOut());
      // show an alert showing there was a problem loading the user
      // already doing that in the calling function, need to re-write this entire flow.
      throw e;
    } finally {
      dispatch({ type: 'USER_INIT_LOADING', loading: false });
    }
  };
}

export function updateSigninStatus() {
  return async (dispatch: ThunkDispatch<Store, void, Action>) => {
    const isAuthorized = await checkSigninStatus();
    if (isAuthorized) {
      await dispatch(initUser()); // get user profile before proceeding
      dispatch(loginSuccess());
    } else {
      dispatch(logoutComplete());
    }
  };
}

export function initAuth() {
  return async (dispatch: ThunkDispatch<Store, void, Action>) => {
    // need to run on first time page load incase already logged in
    await dispatch(updateSigninStatus());
    // flags AppRouter to continue
    dispatch(authReady());
    // listen for changes to auth
    GoogleAuth.isSignedIn.listen(() => {
      dispatch(updateSigninStatus());
    });
  };
}

export function handleInvalidateAccess() {
  return (dispatch: ThunkDispatch<Store, void, Action>) => {
    // invalidation API call
    revokeAccess();
    // handle sign out
    dispatch(logoutComplete());
  };
}
