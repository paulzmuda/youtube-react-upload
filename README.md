## YouTube Upload Client using Dropzone.js and Google API v3 (Javascript)

Simplified client-only upload to Youtube.  This is an ugly, work-in-progress and not to be considered for production use.

Preview: https://paulzmuda.github.io/youtube-client/

### To-Do List
- Finish user drop-down menu 
- Refactor
- ReactJS Version
- WordPress Plug-in

### Browser Support

- Chrome 7+
- Firefox 4+
- IE 10+
- Opera 12+ (Version 12 for MacOS is disabled because their API is buddy)
- Safari 6+

### YouTube Data API v3

For more information, see:
- https://developers.google.com/youtube/v3/
- https://developers.google.com/apis-explorer/#p/youtube/v3/

Note: You will need to create authorization credentials on the Google Developers Console, please check the documentation prior to using this repo.

## Google Recommends Using CORS for Resumable Uploads

https://github.com/youtube/api-samples/tree/master/javascript

## Adopted YouTube's API Samples upload_video.js and cors_upload.js and reduced to a general method library

You may fork these files specifically to use with your own application. These were suggestions created by them but I've exported the style specific elements and reduced these files down to a simple function library.

## Why use the Javascript YouTube API?

The most common uses of the YouTube API are with server-side languages such as PHP.  This poses a problem when trying to upload large video files since your web server is forced to act as the middle between the end-user and YouTube.  Uploads buffer these video files into your server's memory before passing them along to YouTube.  Using the Javascript API eliminates this process, no longer taxing the resources of your web server and clears a bottleneck.  The reason I originally had to create this was because I had to upload large video files to a high traffic website. Our server only had 1 gigabyte of memory which is what most low-cost hosts provide, and trying to upload videos larger than 300mb was causing the server to overload it's memory resources and crash.  This would be a great tool for files of any size not only because of the increased upload speeds, but also because of it's simplicity of implementation into any existing system.  If you're using a pay-as-you-go service such as Amazon Web Services, this saves you money.

### MIT License

See LICENSE file
