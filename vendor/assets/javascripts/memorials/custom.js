(function($) {
	"use strict";

	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
		new SelectFx(el);
	} );

	new UISearch( document.getElementById( 'sb-search' ) );

	/*------------  main navigation  ---------------*/
	$(window).on("load resize",function(e){
		var windowWidht = $(window).width();
		if (windowWidht>960) {
			$( '.menu-item-has-children' ).each(function() {
				$(this).hover(
					function(){ $(this).children("ul.sub-menu").slideDown(); },
					function(){ $(this).children("ul.sub-menu").slideUp(); }
					);
			});
		}
	});


	/*----------------- Inject Background Image ------------*/
	$( '.background-image' ).each(function() {
		var  bgImage = $(this).data('bg-image');
		if (bgImage!="") {
			$(this).css({ 'background-image': 'url('+bgImage+')' });
		}
	});

	/*-----------  Boxer Video and image Gallery  --------*/
	$(".boxer").boxer();


	/*-----------  fitvids Video fit  --------*/
	$(".video-container").fitVids();

	/*-----------  Stellar Parallax  --------*/
	$(window).stellar({
		responsive: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		verticalOffset: 0,
		horizontalOffset: 0,
	});


	/*------------  Owl Carousel -------------------*/
	//Team Member Carousel
	$('#gallery-slider').owlCarousel({
		loop:true,
		autoplay:true,
		margin:1,
		nav:false,
		dots: false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			900:{
				items:3
			},
			1100:{
				items:5
			}
		}
	});

	//Testimonial Carousel
	$('#home-testimonial-slider').owlCarousel({
		loop:true,
		autoplay:true,
		margin:1,
		nav:false,
		dots: true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			900:{
				items:1
			},
			1100:{
				items:1
			}
		}
	});

	/*------------  Owl Carousel  End ---------------*/

	//  Custom JS for Memorials

	$('.counter').counterUp();
  $('.boxer').boxer();
  $('#new_photo').fileupload({
    dataType: "script"
  });
  /* Activating Best In Place */
  $(".best_in_place").best_in_place();

})(jQuery);
