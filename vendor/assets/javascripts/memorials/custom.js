(function($) {
	"use strict";

	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
		new SelectFx(el);
	} );

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
		}a
	});

	/*-----------  Boxer Video and image Gallery  --------*/
	$(".boxer").boxer();


})(jQuery);
