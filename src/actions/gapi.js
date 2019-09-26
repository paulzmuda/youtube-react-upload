import { initGapi } from '../utils/gapi-client';

export function handleInitGapi() { // HOW DO I INVALIDATE TOKEN AT AUTH0???
    return (dispatch) => {
        console.log('initializing google api')
        initGapi();
    };
  }