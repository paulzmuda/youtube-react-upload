## YouTube Upload Client using Dropzone.js and Google API v3 (Javascript)

Work in progress. Simplified client-only upload to Youtube.

Preview: http://....io or something

### Getting Started
- Create Firebase Project
- Create Google Console Project (the above created firebase project should appear at time of writing this doc)
    - https://github.com/google/google-api-javascript-client/blob/master/docs/start.md#setup
    - Browser key was auto generated by firebase!


### To-Do List
- Restrict that GAPI API KEY found in Console
- Finish user drop-down menu 
- auto-save input values and send to youtube api
- tagging
- custom thumbnail upload
- add progress spinner in place of template image
- Refactor
- Helper function that stores youtube metadata in your own database
- ReactJS Version
- Then replace Dropzone with React Drag and Drop

### YouTube Data API v3

For more information, see:
- https://developers.google.com/youtube/v3/
- https://developers.google.com/apis-explorer/#p/youtube/v3/

Note: You will need to create authorization credentials on the Google Developers Console, please check the documentation prior to using this repo.

## Google Recommends Using CORS for Resumable Uploads

https://github.com/youtube/api-samples/tree/master/javascript

## [WIP] Used Google's API sample upload_video.js and cors_upload.js and combine into a general library

Removed styling from original samples and combined them to create a reusable library of functions.

## Why use the Javascript YouTube API?

All examples I could find of the Google YouTube API were server-side in languages like PHP, Java, C#, etc.  It didnt make sense to me that one would upload to their own server before sending it to Google's servers, so I wanted to eliminate that bottleneck.  Especially helpful when uploading large video files.

### MIT License

See LICENSE file
