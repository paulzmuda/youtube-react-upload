<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Youtube Uploader Beta</title>

  	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
  	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.css" rel="stylesheet">

	<style>
	/* Space out content a bit */
body {
	background: #f1f1f1;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Everything but the jumbotron gets side spacing for mobile first views */
.header,
.marketing,
.footer {
  padding-right: 15px;
  padding-left: 15px;
}

/* Custom page header */
.header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
}
/* Make the masthead heading the same height as the navigation */
.header h3 {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}

/* Custom page footer */
.footer {
  padding-top: 19px;
  color: #777;
  border-top: 1px solid #e5e5e5;
}

/* Customize container */
@media (min-width: 768px) {
  .container {
    max-width: 730px;
  }
}
.container-narrow > hr {
  margin: 30px 0;
}

/* Main marketing message and sign up button */
.jumbotron {
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
  background-color: #FFF;
  border-radius: 0px !important;
}
/*.jumbotron .btn {
  padding: 14px 24px;
  font-size: 21px;
}*/

/* Supporting marketing content */
.marketing {
  margin: 40px 0;
}
.marketing p + h4 {
  margin-top: 28px;
}

/* Responsive: Portrait tablets and up */
@media screen and (min-width: 768px) {
  /* Remove the padding we set earlier */
  .header,
  .marketing,
  .footer {
    padding-right: 0;
    padding-left: 0;
  }
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
  /* Remove the bottom border on the jumbotron for visual effect */
  .jumbotron {
    border-bottom: 0;
  }
}

#upload_icon {
font-size: 102px;
color: #CCCCCC;
}
#upload_icon:hover {
color: #E62117;
cursor: pointer;
}
</style>


	<body>
	<div class="container">
      <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills pull-right">
            <li role="presentation" class="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="#">Settings</a></li>
            <li role="presentation"><a href="#">Contact</a></li>
          </ul>
        </nav>
        <h3 class="text-muted">Youtube Uploader - Javascript API</h3>
      </div>

      <div id="googleAuth">
        <!--Add buttons to initiate auth sequence and sign out-->
        <button id="authorize-button" style="display: none;">Authorize</button>
        <button id="signout-button" style="display: none;">Sign Out</button>
        <div id="test"></div>
      </div>
      <div id="dropView" class="jumbotron">
      	<i class="material-icons" id="upload_icon">cloud_upload</i>
        <h4>Select files to upload</h4>
        <p style="font-size: 12px; font-weight: normal; color: #667;">Or drag and drop video files</p>
        <!-- <p><a class="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p> -->


        <div class="btn-group">
        	<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-color: #d3d3d3;
                                                                                                                                                  background: #f8f8f8;
                                                                                                                                                  color: #333;
                                                                                                                                                  border-radius:0px !important;
                                                                                                                                                  font-size:11px;
                                                                                                                                                  font-weight:500;
                                                                                                                                                  line-height: normal;">Public <span class="caret"></span>
        	</button>
      		<ul class="dropdown-menu">
      			<li><a href="#">Public</a></li>
      			<li><a href="#">Unlisted</a></li>
      			<li><a href="#">Private</a></li>
      		</ul>
        </div>


      </div>

<!--       <div class="row marketing">
        <div class="col-lg-6">
        </div>
        <div class="col-lg-6">
        </div>
      </div> -->

      <footer class="footer">
        <p>&copy; MIT GNU License</p>
        <p><small><i>Note: Google will prompt you to login.  Any videos uploaded using this tool will go to the Youtube channel associated with your account.  This is will be in a pop-up window directly from Google using a secure OAuth2 authentication.  No personal information is stored.</i></small></p>
      </footer>

    </div> <!-- /container -->

	</body>






	<script src="https://code.jquery.com/jquery-2.2.3.min.js"   integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo="   crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.js"></script>
  <script type="text/javascript">
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
      var scopes = 'https://www.googleapis.com/auth/youtube';
      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');
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
          makeApiCall();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
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
        gapi.client.load('youtube', 'v3', function() {
            console.log('youtube API loaded...');
            var request = gapi.client.youtube.channels.list({

                part: 'snippet',
                mine: true

            });
            // Step 6: Execute the API request
            request.execute(function(resp) {
              // document.getElementById('vid').value = resp.items[1].id.videoId;
              console.log('saved video id successfully');
              var p = document.createElement('p');
              var img = new Image();

              var name = resp.items[0].snippet.title;
              console.log(resp.items[0].snippet.title);
              p.appendChild(document.createTextNode('Uploading to Youtube as '+name));


              var userThumb = resp.items[0].snippet.thumbnails.medium.url;
              console.log(resp.items[0].snippet.thumbnails.medium.url);
              img.src = resp.items[0].snippet.thumbnails.medium.url
              p.appendChild(img);


              document.getElementById('test').appendChild(p);


            });
          });
      }
  </script>
  <script async defer src="https://apis.google.com/js/api.js"
    onload="this.onload=function(){};handleClientLoad()"
    onreadystatechange="if (this.readyState === 'complete') this.onload()">
  </script>

	<script>
  	$('form').on('submit', function(e) {
  		e.preventDefault();

  		console.log(e.currentTarget.action);

  		$.ajax({
  			url: e.currentTarget.action,
  			type: e.currentTarget.method,
  			dataType: 'json',
  			data: $(this).serialize()
  		})
  		.done(function(data) {
  			if(data.success == true) {
  				console.log('login successful');
  			}
  		})
  		.fail(function() {
  			console.log('error');
  		})
  		.always(function() {
  			console.log('complete');
  		});
  	});



  	dropYoutube = new Dropzone('#dropView', {
  		url: "/dummy/url/because/ajax/hand-off",
  		//previewsContainer: ".dropzone-previews",
  		clickable: "#upload_icon",
  		paramName: "video",
  		method: "post",
  		acceptedFiles: "video/*",
  		autoProcessQueue: false,

  		accept: function(file, done) {
  			console.log('accepted!');
  			// replace contents of view with upload dialog where you can add meta fields.  this may have to go under template
  			// hand-off file to google api
  		}
  	});
	</script>




</html>
