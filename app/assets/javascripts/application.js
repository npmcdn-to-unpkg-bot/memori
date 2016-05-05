// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-fileupload/basic
//= require jquery-fileupload/vendor/tmpl
//= require jquery.purr
//= require best_in_place
//= require jgrowl
//= require validate
//= require ckeditor/init
//= require memorials/bootstrap
//= require memorials/boxer
//= require memorials/custom
//= require memorials/gmap3
//= require memorials/html5shiv
//= require memorials/modernizr
//= require memorials/plugins
//= require memorials/waypoints
//= require memorials/counterup
//= require memorials/isotope
//= require memorials/owl

$(document).ready(function() {
  $('.counter').counterUp();
  $('.boxer').boxer();
  $('#new_photo').fileupload({
    dataType: "script"
  });
  /* Activating Best In Place */
  $(".best_in_place").best_in_place();
});
