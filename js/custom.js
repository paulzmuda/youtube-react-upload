
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

// Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
previewNode = document.querySelector("#dzTemplate");
previewNode.id = "";
previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

activeDropzone = function() {
  dropYoutube = new Dropzone(document.body, {
    url: "/",
    //previewsContainer: ".dropzone-previews",
    clickable: "#upload_icon",
    previewTemplate: previewTemplate,
    previewsContainer: '#previews',
    paramName: "video",
    method: "post",
    acceptedFiles: "video/*",
    autoProcessQueue: true,
    parallelUploads: 1,
    addRemoveLinks: false,
    init: function() {
      console.log('dz init');
    },
    accept: function(file, done) {

      $('#dropView').hide();

      file.previewTemplate.querySelector(".headerFileName").innerHTML = file.name;


      var d = new Date();
      var n = d.getTime();
      file.fileId = file.name.replace(/\s|\./g, "")+n; // may need to regex this to remove spaces
      file.previewTemplate.querySelector(".video-upload-heading").id = "Heading-" + file.fileId;
      $(file.previewTemplate.querySelector(".video-upload-heading")).attr("aria-controls", "Body-" + file.fileId);
      $(file.previewTemplate.querySelector(".video-upload-heading")).attr("href", "#Body-" + file.fileId);
      // $(file.previewTemplate.querySelector(".video-upload-heading h4 a")).attr("aria-controls", "Body-" + file.fileId);
      // $(file.previewTemplate.querySelector(".video-upload-heading h4 a")).attr("href", "#Body-" + file.fileId);
      file.previewTemplate.querySelector(".video-collapse").id = "Body-" + file.fileId;
      $(file.previewTemplate.querySelector(".video-collapse")).attr("aria-labelledby", "#Heading-" + file.fileId);

      if(this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
        // this is the first file dropped or first file since everything already completed
      } else {
        $('#Body-'+file.fileId).collapse("hide");
      }

      // testing
      //$(file.previewTemplate.querySelector('.panel-footer')).show();
      //file.previewTemplate.querySelector(".progress-bar").style.width = 50 + "%";
      return done();
    },
    sending: function(file) {
      // make footer appear
    }
  });
}; // end activeDropzone
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

function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-minus glyphicon-plus');
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);
