// https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html
    // Enter an API key from the Google API Console:
    //   https://console.developers.google.com/apis/credentials
    var apiKey = 'AIzaSyBrYISf21784Nl1wPa59-niBAXslvljlBE';
    // Enter the API Discovery Docs that describes the APIs you want to
    // access. In this example, we are accessing the People API, so we load
    // Discovery Doc found here: https://developers.google.com/people/api/rest/
    // var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];
    var discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
    // Enter a client ID for a web application from the Google API Console:
    //   https://console.developers.google.com/apis/credentials?project=_
    // In your API Console project, add a JavaScript origin that corresponds
    //   to the domain where you will be running the script.
    var clientId = '613548846296-bibj9e8f2l1flltfp76gb5l5u8juq42u.apps.googleusercontent.com';
    // Enter one or more authorization scopes. Refer to the documentation for
    // the API or https://developers.google.com/people/v1/how-tos/authorizing
    // for details.
    var scopes = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.login';
    var authorizeButton = document.getElementById('googleNotAuth');
    var signoutButton = document.getElementById('signout-button');
    var uploadDisplay = document.getElementById('dropView');
    function handleClientLoad() {
      // Load the API client and auth2 library
      gapi.load('client:auth2', initClient);
    }
    function initClient() {
      gapi.client.init({
          apiKey: apiKey,
          discoveryDocs: discoveryDocs,
          clientId: clientId,
          scope: scopes
      }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
      });
    }
    function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        uploadDisplay.style.display = 'block';
        makeApiCall();
      } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        uploadDisplay.style.display = 'none';
      }
    }
    function handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    }
    function handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }
    // Load the API and make an API call.  Display the results on the screen.
    // function makeApiCall() {
    //   gapi.client.people.people.get({
    //     resourceName: 'people/me'
    //   }).then(function(resp) {
    //     var p = document.createElement('p');
    //     var name = resp.result.names[0].givenName;
    //     p.appendChild(document.createTextNode('Hello, '+name+'!'));
    //     document.getElementById('content').appendChild(p);
    //   });
    // }
    function makeApiCall() {
      // gapi.client.load('youtube', 'v3', function() {
      //     console.log('youtube API loaded...');
      //     var request = gapi.client.youtube.channels.list({
      //         part: 'snippet',
      //         mine: true
      //     });
      //     // Step 6: Execute the API request
      //     request.execute(function(resp) {
      //       console.log('do nothing here');
      //     });
      //   });

        gapi.client.load('plus', 'v1', function() {
          console.log('youtube API loaded...');
            gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(resp) {
            // Shows profile information
            // console.log(resp);
            var name = resp.displayName; // console.log(resp.items[0].snippet.title);
            $('#account-name').html(name);

            var img = new Image();
              img.src = resp.image.url;
            // document.getElementById('account-image').appendChild(img);
            $('#account-image').html(img);
            })
        });
        gapi.client.load('oauth2', 'v2', function() {
            // console.log('youtube API loaded again...');
            gapi.client.oauth2.userinfo.get().execute(function(resp) {
              // console.log(resp.email);

                var email = resp.email; // console.log(resp.items[0].snippet.title);

              // document.getElementById('account-email').appendChild(p);
              $('#account-email').html(email);
            });
        });
    }