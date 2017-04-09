

var STATUS_POLLING_INTERVAL_MILLIS = 60 * 1000; // One minute.


/**
 * YouTube video uploader class
 *
 * @constructor
 */
var UploadVideo = function() {
  this.tags = ['paulzmuda/youtube-client'];
  this.categoryId = 22;
  this.videoId = '';
  this.uploadStartTime = 0;
  this.gapi = gapi;
};

UploadVideo.prototype.uploadFile = function(file) {
  var metadata = {
    snippet: {
      title: $('#title').val(),
      description: $('#description').text(),
      tags: this.tags,
      categoryId: this.categoryId
    },
    status: {
      // privacyStatus: $('#privacy-status option:selected').text()
      privacyStatus: $('#privacyChosen').val()
    }
  };
  var uploader = new MediaUploader({
    baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
    file: file,
    token: this.accessToken,
    metadata: metadata,
    params: {
      part: Object.keys(metadata).join(',')
    },
    onError: function(data) {
      var message = data;
      // Assuming the error is raised by the YouTube API, data will be
      // a JSON string with error.message set. That may not be the
      // only time onError will be raised, though.
      try {
        var errorResponse = JSON.parse(data);
        message = errorResponse.error.message;


        file.status = Dropzone.ERROR;
        dropYoutube.emit("error", file, 'message', 'xhr');
        dropYoutube.emit("complete", file);



      } finally {
        alert(message);
      }
    }.bind(this),
    onProgress: function(data) {
      var currentTime = Date.now();
      var bytesUploaded = data.loaded;
      var totalBytes = data.total;
      // The times are in millis, so we need to divide by 1000 to get seconds.
      var bytesPerSecond = bytesUploaded / ((currentTime - this.uploadStartTime) / 1000);
      var estimatedSecondsRemaining = (totalBytes - bytesUploaded) / bytesPerSecond;
      var percentageComplete = (bytesUploaded * 100) / totalBytes;

      $('#upload-progress').attr({
        value: bytesUploaded,
        max: totalBytes
      });

      file.upload.progress = percentageComplete;
      file.upload.bytesSent = bytesUploaded;

      // console.log(percentageComplete);
      // $('#total-bytes').text(totalBytes);

      $(file.previewTemplate.querySelector('.panel-footer')).show();
      file.previewTemplate.querySelector(".progress-bar").style.width = percentageComplete + "%";
      file.previewTemplate.querySelector(".progressText").innerHTML = "Uploading " + Math.round(percentageComplete) + "%";

      $('.during-upload').show();
    }.bind(this),
    onComplete: function(data) {
      var uploadResponse = JSON.parse(data);
      this.videoId = uploadResponse.id;
      file.status = Dropzone.SUCCESS;
      dropYoutube.emit("success", file, 'responseText', 'e');    // this.emit("success", file, responseText, e);
      dropYoutube.emit("complete", file);
      file.previewTemplate.querySelector(".progressText").innerHTML = "Finished Uploading (Processing)";
      dropYoutube.processQueue();
      this.pollForVideoStatus(file);
    }.bind(this)
  });
  // This won't correspond to the *exact* start of the upload, but it should be close enough.
  this.uploadStartTime = Date.now();
  uploader.upload();
};


UploadVideo.prototype.pollForVideoStatus = function(file) {
  this.gapi.client.request({
    path: '/youtube/v3/videos',
    params: {
      part: 'status,player',
      id: this.videoId
    },
    callback: function(response) {
      if (response.error) {
        // The status polling failed.
        console.log(response.error.message);
        setTimeout(this.pollForVideoStatus.bind(this), STATUS_POLLING_INTERVAL_MILLIS);
      } else {
        var uploadStatus = response.items[0].status.uploadStatus;
        switch (uploadStatus) {
          // This is a non-final status, so we need to poll again.
          case 'uploaded':
            // no change in text
            console.log(uploadStatus);
            setTimeout(this.pollForVideoStatus.bind(this), STATUS_POLLING_INTERVAL_MILLIS);
            console.log(response);
            updateFileId(file, response.items[0].id);
            break;
          // The video was successfully transcoded and is available.
          case 'processed':
            for (var i = 0, len = dropYoutube.files.length; i < len; i++) {
                if (dropYoutube.files[i].fileId === response.items[0].id) {
            		    dropYoutube.files[i].previewTemplate.querySelector(".progressText").innerHTML = "Complete";
                    dropYoutube.files[i].previewTemplate.querySelector(".player").innerHTML = response.items[0].player.embedHtml;
                    dropYoutube.files[i].previewTemplate.querySelector(".progress-bar").style.width = 0 + "%";
                  break;
                }
            }
            break;
          // All other statuses indicate a permanent transcoding failure.
          default:
            for (var i = 0, len = dropYoutube.files.length; i < len; i++) {
                if (dropYoutube.files[i].fileId === response.items[0].id) {
                    dropYoutube.files[i].previewTemplate.querySelector(".progressText").innerHTML = "Transcoding failed - Check YouTube Video Manager for More Details";
                  break;
                }
            }
            break;
        }
      }
    }.bind(this)
  });
};
