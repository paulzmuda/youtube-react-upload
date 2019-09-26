import { initGapi } from '../utils/gapi-client';
import { auth, storageKey, signInWithGoogle } from '../utils/auth';
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


export function initUser() {
  return async (dispatch) => {
    console.log('RUNNING INITUSER NOW')
    try {

      dispatch({type: 'USER_INIT_LOADING', loading: true});
      // const response = await initGapi(); // const {user, carriers} = response.body;
      const testData = { firstName: 'test1', lastName: 'test2', email: 'test3' };
      // user store
      dispatch({type: 'USER_INIT_SUCCESS', firstName: testData.firstName, lastName: testData.lastName, email: testData.email});
      dispatch({type: 'LOGIN_MESSAGES_RESET'});
      dispatch({type: 'USER_INIT_LOADING', loading: false});

      // await dispatch(carrierInit(response.body.carriers));
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
    console.log('handle non user')
    window.localStorage.removeItem(storageKey);
    dispatch(successLogout());
  }
}

// Logs the user out
export function handleSignOut() { // HOW DO I INVALIDATE TOKEN AT AUTH0???
  return (dispatch) => {
    console.log('handle sign out')
    dispatch(requestLogout()); // UI changes only
    auth.signOut().then(() => {
      dispatch(handleNonUser()); // this.setState({ uid: null }); // DISPATCH DISPATCH convert this into redux store
    }).catch((error)=> {
      dispatch(handleNonUser());
      console.log(error);
    });
    
  };
}

export function handleReceivedUser(user) {
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
    window.localStorage.setItem(storageKey, user.uid);
    dispatch(receiveLogin());
    dispatch({type: 'USER_INIT_LOADING', loading: false});
  }
}

export function handleSignIn(creds) {
  return async (dispatch) => {
    dispatch(requestLogin()); // UI changes only
    // auth server
    try {
      await signInWithGoogle();
      // then basically dont do anything (none of the below) because
      // we have a listener for onAuthStateChanged in the AppRouter!!!
    } catch (e) {
      console.log('--------------------------------------------');
      console.log('need to DISPATCH AN ERROR MESSAGE');
      console.log(e.code);
      dispatch(loginError(e.code));
      console.log('--------------------------------------------');
      return e;
    }
  };
}
