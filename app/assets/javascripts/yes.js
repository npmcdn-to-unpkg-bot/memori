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
//= require jquery.purr
//= require jgrowl
//= require yes/boxaroo
//= require yes/modernizr
//= require yes/device
//= require yes/imagesloaded
//= require yes/smoothscroll
//= require yes/isotope
//= require yes/sloppy-masonry
//= require yes/parallax
//= require yes/scrollTo
//= require yes/waypoints
//= require yes/YTPlayer
//= require yes/magnific-popup
//= require yes/wow
//= require yes/retina
//= require yes/soc-share
//= require yes/custom


$(document).ready(function() {
  $('.add-comment-link').click(function() {
    $(this).nextAll('.add-comment-form').toggle();
  });

  $('.view-comment-link').click(function() {
    $(this).nextAll('.comments-listing').toggle();
  });
});
