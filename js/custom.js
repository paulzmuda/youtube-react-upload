
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
    url: "/",
    //previewsContainer: ".dropzone-previews",
    clickable: "#upload_icon",
    paramName: "video",
    method: "post",
    acceptedFiles: "video/*",
    autoProcessQueue: true,
    parallelUploads: 1,
    addRemoveLinks: true,
    accept: function(file, done) {
      // console.log('accepted ' + file.name);
      // replace contents of view with upload dialog where you can add meta fields.  this may have to go under template
      return done();
    }
  });

  Dropzone.prototype.uploadFiles = function (file) {  // Override Function. Original - https://github.com/enyo/dropzone/blob/master/dist/dropzone.js#L1236
    uploadVideo = new UploadVideo();
    uploadVideo.accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    uploadVideo.uploadFile(file[0]);
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
