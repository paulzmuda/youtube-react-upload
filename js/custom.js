
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
    autoProcessQueue: true,
    parallelUploads: 1,
    addRemoveLinks: true,
    //
    accept: function(file, done) {
    //   console.log('accepted ' + file.name);
    //   // $(dropYoutube).trigger('fileReady');
    //   // replace contents of view with upload dialog where you can add meta fields.  this may have to go under template
    //
    //   // hand-off file to google api
    //   // uploadVideo.uploadFile(file);
    return done();
  }
  // ,
  //   uploadFile: function(file) {
  //     console.log(file);
  //   }
  });

  Dropzone.prototype.uploadFiles = function (files) {
    console.log(files[0]);

    // connect youtube api
    // Prepare Video Uploads
    result = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
    uploadVideo = new UploadVideo();
    uploadVideo.ready(result.access_token);
    console.log(result.access_token);

    // get progress from youtube and update file object.upload.bytesSent object.upload.progress etc
    // updateProgress = (function(_this) {
    //     return function(e) {
    //       var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;
    //       if (e != null) {
    //         progress = 100 * e.loaded / e.total;
    //         for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
    //           file = files[_j];
    //           file.upload = {
    //             progress: progress,
    //             total: e.total,
    //             bytesSent: e.loaded
    //           };
    //         }
    //       } else {
    //         allFilesFinished = true;
    //         progress = 100;
    //         for (_k = 0, _len2 = files.length; _k < _len2; _k++) {
    //           file = files[_k];
    //           if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {
    //             allFilesFinished = false;
    //           }
    //           file.upload.progress = progress;
    //           file.upload.bytesSent = file.upload.total;
    //         }
    //         if (allFilesFinished) {
    //           return;
    //         }
    //       }
    //       _results = [];
    //       for (_l = 0, _len3 = files.length; _l < _len3; _l++) {
    //         file = files[_l];
    //         _results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));
    //       }
    //       return _results;
    //     };
    //   })(this);





    // on complete?

    // for (_i = 0, _len = files.length; _i < _len; _i++) {
    //   file = files[_i];
    //   file.status = Dropzone.SUCCESS;
    //   this.emit("success", file, 'test', 'test');
    //   this.emit("complete", file);
    // }


    // call _finished or....?  return this.processQueue();










    return;
  }

  $('<input>').attr({
      type: 'hidden',
      id: 'title',
      name: 'title',
      value: 'dyn title'
  }).appendTo('body');
  $('<input>').attr({
      type: 'hidden',
      id: 'description',
      name: 'description',
      value: 'dyn description'
  }).appendTo('body');

// get value of dropdown // $('#privacyChosen').val();
$(function(){
$(".dropdown-menu li a").click(function(){
   $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
   $(this).parents(".dropdown").find('.btn').val($(this).text());
});
});
