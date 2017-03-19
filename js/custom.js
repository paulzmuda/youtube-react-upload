
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

// get value of dropdown // $('#privacyChosen').val();
$(function(){
$(".dropdown-menu li a").click(function(){
   $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
   $(this).parents(".dropdown").find('.btn').val($(this).text());
});
});
