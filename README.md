## YouTube Upload Client using Dropzone.js and Google API v3 (Javascript)

You can use the [editor on GitHub](https://github.com/paulzmuda/youtube-client/edit/master/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Usage

### Examples

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Browser Support

- Chrome 7+
- Firefox 4+
- IE 10+
- Opera 12+ (Version 12 for MacOS is disabled because their API is buddy)
- Safari 6+

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/paulzmuda/youtube-client/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### API Being Used - YouTube Data API v3

For more information, see:
- https://developers.google.com/youtube/v3/
- https://developers.google.com/apis-explorer/#p/youtube/v3/

Note: You will need to create authorization credentials on the Google Developers Console, please check the documentation prior to using this repo.

## Google Recommends Using CORS for Resumable Uploads

https://github.com/youtube/api-samples/tree/master/javascript

## Adopted YouTube's API Samples upload_video.js and cors_upload.js and reduced to a general method library

You may fork these files specifically to use with your own application. These were suggestions created by them but I've exported the style specific elements and reduced these files down to a simple function library.

## Why use this take on the YouTube API?

The most common uses of the YouTube API are with server-side languages such as PHP.  This poses a problem when trying to upload large video files since your web server is forced to act as the middleman between the end-user and YouTube.  Uploads buffer these video files into your server's memory before passing them along to YouTube.  Using the Javascript API eliminates this process, no longer taxing the resources of your web server and clears a bottleneck.  The reason I originally had to create this was because I had to upload large video files to a high traffic website. Our server only had 1 gigabyte of memory which is what most low-cost hosts provide, and trying to upload videos larger than 300mb was causing the server to overload it's memory resources and crash.  This would be a great tool for files of any size not only because of the increased upload speeds, but also because of it's simplicity of implementation into any existing system.  If you're using a pay-as-you-go service such as Amazon Web Services, this saves you money.

### MIT License

See LICENSE file
