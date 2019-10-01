import request from 'superagent';
import { gapi, GoogleAuth } from '../utils/google-auth.js';

// export const getGoogleUser = async () => {
//   const user = GoogleAuth.currentUser.get();
//   const accessToken = user.getAuthResponse().access_token;
//   try {
//     return await request.get('https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names')
//       .set('Content-Type', 'application/json')
//       .set('authorization', 'Bearer ' + accessToken)
//       .set('Accept', 'application/json')
//       .send()
//       .accept('application/json');
//   }
//   catch (err) {
//     throw err;
//   }
// };

export const getGoogleUser = async () => {
  const user = GoogleAuth.currentUser.get();


  try {
    return await user.getBasicProfile();
  }
  catch (err) {
    throw err;
  }
};



// export const getGoogleProfilePicture = async (userId) => {
//   const user = GoogleAuth.currentUser.get();
//   const accessToken = user.getAuthResponse().access_token;
//   try {
//     return await request.get('https://www.googleapis.com/plus/v1/people/' + userId + '?key=' + process.env.GOOGLE_API_KEY)
//       .set('Content-Type', 'application/json')
//       .set('authorization', 'Bearer ' + accessToken)
//       .set('Accept', 'application/json')
//       .send()
//       .accept('application/json');
//   }
//   catch (err) {
//     throw err;
//   }
// }


//         // https://www.html5rocks.com/en/tutorials/cors/
//         // https://blog.416serg.me/building-an-app-using-google-sheets-api-react-d69681d22ce1
//         // https://blog.hasura.io/best-practices-of-using-jwt-with-graphql/
//         // https://firebase.google.com/docs/auth/web/google-signin
//         // https://www.npmjs.com/package/@types/gapi
//         // https://github.com/google/google-api-javascript-client/blob/master/docs/samples.md
//         // https://github.com/google/google-api-javascript-client/blob/master/docs/cors.md
//         // https://github.com/google/google-api-javascript-client/blob/master/docs/start.md#setup
//         // https://github.com/google/google-api-javascript-client


// export function getGoogleUser() {
//       var user = GoogleAuth.currentUser.get();
//       var oauthToken = user.getAuthResponse().access_token;
      
//       var xhr = new XMLHttpRequest();
//       xhr.open('GET',
//         'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names');
//       xhr.setRequestHeader('Authorization',
//         'Bearer ' + oauthToken);
//       xhr.send();

//       xhr.onload = function() {
//         var responseText = xhr.responseText;
//         console.log(responseText);
//         // 
//         // {
//         //   "resourceName": "people/110878525516078574128",
//         //   "etag": "%EgUBAj03LhoEAQIFByIMSnFlS0YyTG9rNzg9",
//         //   "names": [
//         //     {
//         //       "metadata": {
//         //         "primary": true,
//         //         "source": {
//         //           "type": "PROFILE",
//         //           "id": "110878525516078574128"
//         //         }
//         //       },
//         //       "displayName": "Paul Zmuda",
//         //       "familyName": "Zmuda",
//         //       "givenName": "Paul",
//         //       "displayNameLastFirst": "Zmuda, Paul"
//         //     }
//         //   ]
//         // }
//        };
       
//        xhr.onerror = function() {
//          console.log('There was an error!');
//        };
//   }