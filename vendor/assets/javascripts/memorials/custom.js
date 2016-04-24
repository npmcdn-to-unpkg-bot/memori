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


})(jQuery);




// $.fn.maxHeight = function() {

// 	var max = 0;

// 	this.each(function() {
// 		max = Math.max( max, $(this).height() );
// 	});

// 	return max;
// }; 

// var newHeight = $('article.post-content').maxHeight(); 
// $('article.post-content').each(function(){
// 	$(this).css({'height' : newHeight});
// });



  /* Subscribe
  -------------------------------------------------------------------*/
  $(".subscirbe-form").ajaxChimp({
  	callback: mailchimpResponse,
        url: "http://jeweltheme.us10.list-manage.com/subscribe/post?u=a3e1b6603a9caac983abe3892&amp;id=257cf1a459" // Replace your mailchimp post url inside double quote "".  
    });

  function mailchimpResponse(resp) {
  	if(resp.result === 'success') {
  		
  		$('.alert-success').html(resp.msg).fadeIn().delay(3000).fadeOut();
  		
  	} else if(resp.result === 'error') {
  		$('.alert-warning').html(resp.msg).fadeIn().delay(3000).fadeOut();
  	}  
  };