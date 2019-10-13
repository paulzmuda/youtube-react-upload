import request from 'superagent';
import { GoogleAuth } from '../utils/google-auth.js';

export const getYourSubs = async () => {
  const user = GoogleAuth.currentUser.get();
  const accessToken = user.getAuthResponse().access_token;

  try {
    return await request.get('https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true')
      .set('Content-Type', 'application/json')
      .set('authorization', 'Bearer ' + accessToken)
      .set('Accept', 'application/json')
      .send()
      .accept('application/json');
  }
  catch (err) {
    throw err;
  }
};

export const getYourPlaylists = async () => {
    const user = GoogleAuth.currentUser.get();
    const accessToken = user.getAuthResponse().access_token;
  
    try {
      return await request.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true')
        .set('Content-Type', 'application/json')
        .set('authorization', 'Bearer ' + accessToken)
        .set('Accept', 'application/json')
        .send()
        .accept('application/json');
    }
    catch (err) {
      throw err;
    }
  };

  export const getYourLikedVideos = async () => {
    const user = GoogleAuth.currentUser.get();
    const accessToken = user.getAuthResponse().access_token;
  
    try {
      return await request.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&myRating=like')
        .set('Content-Type', 'application/json')
        .set('authorization', 'Bearer ' + accessToken)
        .set('Accept', 'application/json')
        .send()
        .accept('application/json');
    }
    catch (err) {
      throw err;
    }
  };

  

  export const getYourChannel = async () => {
    const user = GoogleAuth.currentUser.get();
    const accessToken = user.getAuthResponse().access_token;
  
    try {
      return await request.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true')
        .set('Content-Type', 'application/json')
        .set('authorization', 'Bearer ' + accessToken)
        .set('Accept', 'application/json')
        .send()
        .accept('application/json');
    }
    catch (err) {
      throw err;
    }
  };
