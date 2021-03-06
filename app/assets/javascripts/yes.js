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
//= require yes/jquery.min
//= require jquery_ujs
//= require yes/boxaroo
//= require yes/modernizr
//= require yes/device
//= require yes/smoothscroll
//= require yes/parallax
//= require yes/scrollTo
//= require yes/waypoints
//= require yes/magnific-popup
//= require yes/retina
//= require yes/custom
//= require yes/jquery.modal
//= require react
//= require react_ujs
//= require components


$(document).ready(function() {
  $('.add-comment-link').click(function() {
    $(this).nextAll('.add-comment-form').toggle("slow");
  });

  $('.view-comment-link').click(function() {
    $(this).nextAll('.comments-listing').toggle("slow");
  });

  $("#new_event").submit(function(event) {
    $("#new_event").hide();
    $("#suggest-event-title").text("Thank You. The memorial creator has been notified.");
  });

  $("#new_photo").submit(function(event) {
    $("#new_photo").hide();
    $("#submit-photo-title").text("Thank You. The memorial creator has been notified.");
  });

});
