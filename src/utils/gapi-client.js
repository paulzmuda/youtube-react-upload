export const initGapi = () => {
    console.log('init GAPI called');
    window.gapi.client.init({
        'apiKey': process.env.GOOGLE_API_KEY,
        // clientId and scope are optional if auth is not required.
        'clientId': process.env.GOOGLE_CLIENT_ID,
        'scope': 'profile',
      }).then(function() {
        // 3. Initialize and make the API request.
        console.log('step 3');
        return window.gapi.client.request({
          'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
        })
      }).then(function(response) {
          console.log('error note here')
        console.log(response.result);
      }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
      });
    // 1. Load the JavaScript client library.
    // window.gapi.load('client', start);
}