/* $Boxaroo v1.8 jQuery Plugin || Author: Crusader 12 || crusader12.com || Exclusive to CodeCanyon  */
;(function($){
var $win=window, $doc=document, tS=($doc.body || $doc.documentElement).style, 
	uA=navigator.userAgent.toLowerCase(), u=undefined,
	Boxaroo={
		/////////////////////////////////////////////
		// REFERENCE VARIABLES USED THROUGHOUT PLUGIN
		/////////////////////////////////////////////
		cOBJ:null, 
		pOBJ:null, 
		conW:null, 
		conH:null,
		iniW:0,	
		scF:1,
		SSTime:null, 
		cAngle:null, 
		cSkewX:null, 
		cSkewY:null, 
		cFlipX:null, 
		cFlipY:null, 
		mouseX:null, 
		mouseY:null,
		orientTime:null, 
		isNav:false,
		winW:$win.innerWidth?$win.innerWidth:$($win).width(), winH:$win.innerHeight?$win.innerHeight:$($win).height(),
		iniArea:($win.innerWidth?$win.innerWidth:$($win).width())*($win.innerHeight?$win.innerHeight:$($win).height()),


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// INITIALIZIE BOXAROO LIGHTBOX INSTANCE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
init:function(o){
	////////////////////////////////////
	// SET UP REQUIRED SUPPORT VARIABLES
	////////////////////////////////////
	Boxaroo.supported_features();
	
	// SAVE BASE URL
	Boxaroo.BASE_URL=o.base_url || '';

	//////////////////////
	// START LOADING SKINS
	//////////////////////
	var $thumbs=$(this),
		numThumbs=$thumbs.length;
		
	// SKIN 1 SETTINGS ARE DEFAULTS
	$.getJSON(Boxaroo.BASE_URL+'Boxaroo/skins/skin1.json?'+new Date().getTime(), function(data){ 
		Boxaroo.settings=data;
		var user_skin=o.skin.pF();

		// GET USER-DEFINED SKIN SETTINGS
		$.getJSON(Boxaroo.BASE_URL+'Boxaroo/skins/skin'+user_skin+'.json?'+new Date().getTime(), function(skinData){
			// OVERRIDE DEFAULTS WITH USER OPTIONS AND SKIN DATA
			Boxaroo.settings=$.extend({}, Boxaroo.settings[0], skinData[0], o);			

			////////////////////////////////////////////////////
			// ALL SKIN .JSON FILES ARE LOADED -> CONTINUE
			// ADD REQUIRED ELEMENTS TO PAGE IF THEY DON'T EXIST
			////////////////////////////////////////////////////
			if(!$('#Skin'+user_skin).length){
				$('head').append('<link rel="stylesheet" href="'+Boxaroo.BASE_URL+'Boxaroo/skins/skin'+user_skin+'.css" type="text/css" media="all" id="Skin'+user_skin+'"/>');
			};
	
			if(!$('#Boxaroo').length){
				$('<div id="Boxaroo"><div id="Box_O"></div><div id="Box_OT"></div><div id="Box_OP"></div><div id="Box_LB"><div id="Box_C"><div id="Box_H"><div id="Box_HInner"></div></div><div id="Box_GL"></div><div id="Box_GR"></div></div></div><div id="Box_Pre"></div><div id="Box_Cap"></div><div id="Box_Co"></div><div id="Box_SSC"><div id="Box_SST"></div></div><div id="Box_Close"><img alt="Close Boxaroo"/></div><div id="Box_Next"><img alt="Next"/></div><div id="Box_Prev"><img alt="Previous"/></div><div id="Box_Elem1"></div><div id="Box_Elem2"></div><div id="Box_Elem3"></div></div>').prependTo($('body'));
			
				if(Boxaroo.ANI){
					$('<style id="Box_O_Ani"></style><style id="Box_KF"></style><style id="Box_HKF"></style><style id="Box_PreS"></style><style id="Box_M_Ani"></style>').appendTo($('head'));
				};
		
				// CACHE BOXAROO ELEMENTS
				Boxaroo.OBJ={ $LB:$('#Box_LB'), $C:$('#Box_C'), $Pre:$('#Box_Pre'), $O:$('#Box_O'), $OT:$('#Box_OT'), $OP:$('#Box_OP'),
					$Close:$('#Box_Close'), $Next:$('#Box_Next'), $Prev:$('#Box_Prev'), $Co:$('#Box_Co'), $Cap:$('#Box_Cap'),
					$El1:$('#Box_Elem1'), $El2:$('#Box_Elem2'), $El3:$('#Box_Elem3'), $SS:$('#Box_SSC'), $SSC:$('#Box_SST'),
					$GL:$('#Box_GL'), $GR:$('#Box_GR'), $High:$('#Box_H'), $HIn:$('#Box_HInner'),
					$KFCL:$('#Box_O_Ani'), $KF:$('#Box_KF'), $KFHI:$('#Box_HKF'), $KFP:$('#Box_PreS'), $KFM:$('#Box_M_Ani')}; 
		
				// TRANSLATE OVERLAYS BACK TO AVOID CLIPPING PROBLEMS
				if(Boxaroo.safari || Boxaroo.msie){
					$([Boxaroo.OBJ.$O[0], Boxaroo.OBJ.$OT[0], Boxaroo.OBJ.$OP[0]]).css('transform','translateZ(-50000px)');
					// WORKAROUND FOR LACK OF PRESERVE-3D + 3D TRANSFORMS
					if(Boxaroo.msie && !Boxaroo.isMobile) Boxaroo.OBJ.$LB.css('position','relative');
				};
			};
		
		
		
			//////////////////
			// LOOP THUMBNAILS
			//////////////////
			for(var i=0; i<numThumbs; i++){
				// MERGE DATA FROM THUMBNAILS
				var $this=$($thumbs[i]),
					alt=$this[0].getAttribute('alt'), 
					$PAR=$this.parents('a:first'),
					bDATA=$PAR.data('boxaroo'),
					mergedData=$.extend({}, Boxaroo.settings, !bDATA ? {} : bDATA||{});
				$PAR.data('boxaroo',mergedData);				
				var oD=$PAR.data('boxaroo');
			
				// VALIDATE USER SETTINGS, SETUP THUMBS, HANDLE AUTO-LAUNCHING
				Boxaroo.user_options($this, oD); 
			
				// CALL LIGHTBOX ON PAGE LOAD
				if(oD.call_on_start) $this.click;		

				////////////////////////
				// THUMBNAIL CLICK EVENT
				////////////////////////
				$this.on(Boxaroo.cEv,function(e){				
					var bOBJ=Boxaroo.OBJ, 
						oD=$.data(this),
						position=$(this).position();

					// SET CURRENT OBJ, NAVIGATION STATUS, GET VIEWPORT DIMS, STORE MOUSE POSITION FOR ORIGIN MOVEMENT
					Boxaroo.cOBJ=this; 
					Boxaroo.isNav=true; 
					Boxaroo.get_viewport();
		
					Boxaroo.mouseX=position.left-$(document).scrollLeft().pF(); 
					Boxaroo.mouseY=position.top-$(document).scrollTop().pF(); 
		
					// HIDE SCROLLBARS
					if(!oD.scrollbarX) $('html')[0].style.overflowX="hidden"; 
					if(!oD.scrollbarY) $('html')[0].style.overflowY="hidden";	

					// RESET LIGHTBOX
					var Init={
						'transform':'none',
						'transition':'none',
						'box-shadow':'none',
					 	'padding':0,
					 	'border-width':0,
					 	'min-width':0,
					 	'min-height':0,
					 	'width':0,
					 	'height':0,
					 	'background':'none',
			 			'background-color':'transparent',
					 	'background-image':'none'};

					// FIREFOX WORKAROUND TO AVOID PIXELATED EDGES WITH TRANSFORM ANIMATIONS
					if(Boxaroo.mozilla) Init.outline='1px solid transparent';
					Boxaroo.OBJ.$LB.css(Init);

					// LAUNCH LIGHTBOX
					Boxaroo.prep(oD); 
				
					// ANIMATE THE OVERLAYS
					Boxaroo.overlays(this, oD, false);

					Boxaroo.EventsOn(this);
					e.preventDefault(); 
					e.stopImmediatePropagation();
				});
			};
		});			
	});	
},















////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// SETUP ALL BOXAROO EVENTS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
EventsOn:function(obj){
	var bOBJ=Boxaroo.OBJ, 
		SW={};
	
	//////////////////////
	// WINDOW RESIZE EVENT
	//////////////////////
	$($win).on('resize',function(e){
		if(Boxaroo.isNav) return;

		var bOBJ=Boxaroo.OBJ, 
			obj=Boxaroo.cOBJ, 
			D=obj ? $.data(obj) : null;

		// GET CURRENT VIEWPORT DIMENSIONS
		Boxaroo.get_viewport();

		// SET SLIDESHOW DIMENSIONS
		if(Boxaroo.isMobile) Boxaroo.sizeMobil(bOBJ);
		if(D.slideshow && D.slideshow_counter) bOBJ.$SS.css('width',Boxaroo.winW+'px');

		// SCALING
		if(D.scaling){
			// GET NEW LIGHTBOX DIMENSIONS
			var nD=Boxaroo.lightbox_dimensions(obj, D), 
				$content=D.ConTYP==='image' ? bOBJ.$C.find('img') : bOBJ.$C.find('iframe');
				
			// WHAT PROPERTIES RESIZE?
			if(nD.CS){
				var ARGS={left:nD.L, top:nD.T, transition:'none' };
					
				if(D.scale_matte){
					ARGS['padding-top']=nD.MT; 
					ARGS['padding-right']=nD.MR; 
					ARGS['padding-bottom']=nD.MB; 
					ARGS['padding-left']=nD.ML;
				};
							
				if(D.scale_border_width) ARGS['border-width']=nD.BW+'px';
				if(Boxaroo.SDWS && D.scale_shadow) ARGS['box-shadow']=''+nD.SDWX+'px '+nD.SDWY+'px '+nD.SDWB+'px '+nD.SDWS+'px rgba('+D.shadowColor.r+','+D.shadowColor.g+','+D.shadowColor.b+','+D.shadowOpacity+')';
				
				// SIZE LIGHTBOX
				bOBJ.$LB.css(ARGS).add($([bOBJ.$C[0], bOBJ.$High[0], $content[0]])).css({width:nD.W, height:nD.H});
					
				// BORDER RADIUS SCALING
				if(D.scale_border_radius && (D.brTL>0 || D.brTR>0 || D.brBL>0 || D.brBR>0)){
					Boxaroo.borderRAD(bOBJ, $content, nD.BRTR, nD.BRBR, nD.BRBL, nD.BRTL, nD.BW);
				};

				// POSITION COMPONENTS
				Boxaroo.show_comps(D, true);
			};
		};
	})
	
	//////////////////////////////////////////////////////////////
	// SPECIAL VIDEO EVENTS [ HANDLES MESSAGES FROM VIMEO PLAYER ]
	//////////////////////////////////////////////////////////////
	.on('message onmessage', function(e){ 
		var data=JSON.parse(e.data), 
			obj=Boxaroo.cOBJ, 
			D=$.data(obj);
		// DON'T AUTO ADVANCE
		if(!D.auto_advance) return;
		
		switch(data.event){
			case 'ready': 
				var value='playProgress',
					data={method:'addEventListener'},
					f=$('#Box_IFrame'),
					url='http:'+f.attr('src').split('?')[0];
				if(value) data.value=value;
				f[0].contentWindow.postMessage(JSON.stringify(data), url);			
			break;
    
		    case 'playProgress': 
				if(data.data.percent===1 && !Boxaroo.isNav) Boxaroo.Nav(obj, D, D.nav_reverse ? -1 : 1);
			break;
		};
	});	
	

	////////////////////////////////////
	// DISABLE DOUBLE-TAP AND PINCH/ZOOM
	////////////////////////////////////
	if(Boxaroo.isTablet || Boxaroo.isMobile) $('#Boxaroo').on('touchstart', function(e){ e.preventDefault(); });

	//////////////////////////////////////////////
	// PREVENT SCROLLING, DRAGGING AND CONTEXTMENU
	//////////////////////////////////////////////
	$($doc)
	//.on('contextmenu.Bxro, dragstart.Bxro',function(){ return false; })


	
	//////////////////////
	// KEYBOARD NAVIGATION
	//////////////////////
	.on('keydown.Bxro',function(e){
		var key=e.which || e.keyCode, 
			eobj=Boxaroo.cOBJ, 
			eD=$.data(eobj), 
			rev=eD.nav_reverse;

		// PREVENT UNWANTED KEYPRESSES
		if(Boxaroo.isNav || eD.ConTYP==='flash' || !eD.key_nav || key==13) return;

		// PRESS ESC TO CLOSE LIGHTBOX + ARROWS FOR NAV	
		if(key==27) Boxaroo.close_lightbox(eobj, eD);
		if((key==39 && !eD.vertical_nav) || (key==40 && eD.vertical_nav)) Boxaroo.Nav(eobj, eD, rev ? -1 : 1);
		if((key==37 && !eD.vertical_nav)||(key==38 && eD.vertical_nav))   Boxaroo.Nav(eobj, eD, rev ? 1 : -1);



	////////////////////////
	// MOUSEWHEEL NAVIGATION
	////////////////////////
	}).on('mousewheel.Bxro DOMMouseScroll.Bxro',function(e){
		var eD=$.data(Boxaroo.cOBJ);

		if(eD.mousewheel && !Boxaroo.isNav){
			var DIR=e.type=='DOMMouseScroll' ? e.originalEvent.detail : e.originalEvent.wheelDelta, 
				rev=eD.nav_reverse;
				
			if(DIR===-3 || DIR===120){ 
				Boxaroo.Nav(Boxaroo.cOBJ, eD, rev ? -1 : 1); 
			}else{ 
				Boxaroo.Nav(Boxaroo.cOBJ, eD, rev ? 1 : -1); 
			};
		};
		return false;
	})
	


	///////////////////////////////////
	// ENTER AND EXIT FULL SCREEN VIDEO
	///////////////////////////////////
	.on('webkitfullscreenchange mozfullscreenchange ofullscreenchange fullscreenchange', function(e){
		// MUST CHANGE TRANSFORM STYLE ON LB, CONTENT AND IFRAME
		var bOBJ=Boxaroo.OBJ, 
			FSArgs={}, 
			objs=$([bOBJ.$LB[0], bOBJ.$C[0], $('#Box_IFrame')[0]]);

		// ENTERING FULL SCREEN
		if($doc.mozFullScreenElement || $doc.webkitFullScreenElement || $doc.msFullscreenElement || $doc.fullscreenElement || $doc.oFullscreenElement){
			FSArgs[Boxaroo.PRE+'transform-style']='flat';
			objs.css(FSArgs);			

		// EXIT FULL SCREEN
		}else{
			FSArgs[Boxaroo.PRE+'transform-style']='preserve-3d';
			$($win).resize();
		};
	});
	
	

	///////////////////////////////
	// NAVIGATION BUTTON MOUSEENTER
	///////////////////////////////
	$([bOBJ.$Prev[0], bOBJ.$Next[0], bOBJ.$Close[0]]).on('mouseover', function(){ 
		if(Boxaroo.isNav) return;
		
		var obj=$(this), 
			D=$.data(Boxaroo.cOBJ);

		switch(obj[0]){
			case bOBJ.$Prev[0]: 
				var opacity=D.prev_opacity_in, 
					speed=D.prev_hover_speed_in, 
					scale=D.prev_scale_in, 
					rotate=D.prev_rotate_in, 
					flipX=D.prev_flipX_in, 
					flipY=D.prev_flipY_in;
				Boxaroo.jsHook(D.js_prev_hover); 
			break;

			case bOBJ.$Next[0]: 
				var opacity=D.next_opacity_in, 
					speed=D.next_hover_speed_in, 
					scale=D.next_scale_in, 
					rotate=D.next_rotate_in, 
					flipX=D.next_flipX_in, 
					flipY=D.next_flipY_in;
				Boxaroo.jsHook(D.js_next_hover); 
			break;
			
			case bOBJ.$Close[0]: 
				var opacity=D.close_opacity_in, 
					speed=D.close_hover_speed_in, 
					scale=D.close_scale_in, 
					rotate=D.close_rotate_in, 
					flipX=D.close_flipX_in,
					flipY=D.close_flipY_in;
				Boxaroo.jsHook(D.js_close_hover); 
			break;
		};
		
		
		var Args={'opacity':opacity};
		Args[Boxaroo.PRE+'transform']=Boxaroo.calc_transform(1000, scale, scale, 0, 0, flipX, flipY, 0, 0, rotate);					
		obj.Ani(Args, speed, null);			
		
		
		
	/////////////////////////////
	// NAVIGATION BUTTON MOUSEOUT
	/////////////////////////////
	}).on('mouseout', function(){ 
		if(Boxaroo.isNav) return;
		var obj=$(this), 
			oD=$.data(Boxaroo.cOBJ);

		switch(obj[0]){
			case bOBJ.$Prev[0]: 
				var opacity=oD.prev_opacity_out, 
					speed=oD.prev_hover_speed_out, 
					scale=oD.prev_scale_out, 
					rotate=oD.prev_rotate_out, 
					flipX=oD.prev_flipX_out, 
					flipY=oD.prev_flipY_out; 
			break;
				
			case bOBJ.$Next[0]: 
				var opacity=oD.next_opacity_out, 
					speed=oD.next_hover_speed_out, 
					scale=oD.next_scale_out, 
					rotate=oD.next_rotate_out, 
					flipX=oD.next_flipX_out, 
					flipY=oD.next_flipY_out; 
			break;
				
			case bOBJ.$Close[0]: 
				var opacity=oD.close_opacity_out, 
					speed=oD.close_hover_speed_out, 
					scale=oD.close_scale_out, 
					rotate=oD.close_rotate_out, 
					flipX=oD.close_flipX_out, 
					flipY=oD.close_flipY_out; 
			break;
		};
			
		var Args={'opacity':opacity};
		Args[Boxaroo.PRE+'transform']=Boxaroo.calc_transform(1000, scale, scale, 0, 0, flipX, flipY, 0, 0, rotate);
		obj.Ani(Args, speed, null);			
	});
	
	
	/////////////////////////////////
	// NAVIGATION BUTTON CLICK EVENTS
	/////////////////////////////////
	bOBJ.$Prev.on(Boxaroo.cEv,function(){
		if(!Boxaroo.isNav){
			var D=$.data(Boxaroo.cOBJ);
			Boxaroo.Nav(Boxaroo.cOBJ, D, D.nav_reverse ? 1 : -1); 
		};
	});
	
	bOBJ.$Next.on(Boxaroo.cEv,function(){ 
		if(!Boxaroo.isNav){
			D=$.data(Boxaroo.cOBJ);
			Boxaroo.Nav(Boxaroo.cOBJ, D, D.nav_reverse ? -1 : 1); 
		};
	});
	
	bOBJ.$Close.on(Boxaroo.cEv,function(){ 
		if(!Boxaroo.isNav) Boxaroo.close_lightbox(Boxaroo.cOBJ, $.data(Boxaroo.cOBJ));
	});
	
	
	
	/////////////////
	// OVERLAY EVENTS
	/////////////////
	$([bOBJ.$O[0], bOBJ.$OT[0], bOBJ.$OP[0]]).on(Boxaroo.cEv, function(){
		if(!Boxaroo.isNav && $.data(Boxaroo.cOBJ).overlay_close) Boxaroo.close_lightbox(Boxaroo.cOBJ, $.data(Boxaroo.cOBJ));
	});




	///////////////////////////////////////
	// GRADIENT NAV + SWIPING [ DELEGATED ]
	///////////////////////////////////////
	bOBJ.$LB.on('mousedown mousemove mouseup mouseover mouseout touchstart touchmove touchend '+Boxaroo.cEv, bOBJ, function(e){
		var evT=e.type, 
			eobj=Boxaroo.cOBJ, 
			eD=$.data(eobj), 
			oE=e.originalEvent, 
			rev=eD.nav_reverse;

		// SWIPE MUST BE COMBINED WITH GRADIENT NAV CLICK SINCE MOUSEDOWN/MOVE/UP CONSTITUTES A CLICK
		if(e.target===bOBJ.$GL[0] || e.target===bOBJ.$GR[0] && !eD.full_size){
			var evX=oE.clientX !== undefined ? oE.clientX : oE.pageX, 
				evY=oE.clientY !== undefined ? oE.clientY : oE.pageY,
				dis=eD.vm_distance, 
				thd=eD.vm_axis_threshold, 
				vert=eD.vertical_nav;

			// PREVENT MIDDLE/RIGHT MOUSE BUTTON INTERACTION
			if(e.which===2 || e.which===3 )return false;
	
			// SWIPING COORDINATES
			if(evT==='mousedown' || evT==='touchstart'){
				SW.sX=evX; 
				SW.sY=evY;
			}else if(evT==='mousemove' || evT==='touchmove'){
				SW.eX=evX; 
				SW.eY=evY;
				// PREVENT TOUCHCANCEL
				e.preventDefault(); 
			}else if(evT==='mouseup' || evT==='touchend' && !Boxaroo.isNav){
				// eX=ENDX, dX=DIFFX, sX=STARTX, LX=LARGEX, SX=SMALLX
				SW.LX=SW.eX>SW.sX ? SW.eX : SW.sX; 
				SW.LY=SW.eY>SW.sY ? SW.eY : SW.sY;
				SW.SX=SW.eX<SW.sX ? SW.eX : SW.sX; 
				SW.SY=SW.eY<SW.sY ? SW.eY : SW.sY;
				SW.dX=SW.LX-SW.SX; 
				SW.dY=SW.LY-SW.SY;					
				var HSW=SW.dX>dis && SW.dY<thd && !vert, 
					VSW=SW.dY>dis && SW.dX<thd && vert;

				// SWIPING
				if((eD.virtual_mouse || eD.touch) && (HSW || VSW)){
					if(HSW){
						if(SW.LX===SW.eX){ 
							Boxaroo.Nav(eobj, eD, rev ? 1 : -1); 
						}else{ 
							Boxaroo.Nav(eobj, eD, rev ? -1 : 1); 
						};
					}else if(VSW){
						if(SW.LY===SW.eY){ 
							Boxaroo.Nav(eobj, eD, rev ? 1 : -1); 
						}else{ 
							Boxaroo.Nav(eobj, eD, rev ? -1 : 1); 
						};
					};

				// RESET SWIPE OBJECT
				SW.eX=SW.eY=SW.dX=SW.dY=0;
				
				// CLICKING GRADIENT NAV
				}else if(eD.gradient_nav){
					if(e.target===bOBJ.$GL[0] && bOBJ.$GL.css('opacity').pF()>0){ 
						Boxaroo.Nav(Boxaroo.cOBJ, eD, rev ? 1 : -1);
					}else if(e.target===bOBJ.$GR[0] && bOBJ.$GR.css('opacity').pF()>0){ 
						Boxaroo.Nav(Boxaroo.cOBJ, eD, rev ? -1 : 1); 
					};
				};
			};
		};
		
		
		
		////////////////////////////
		// GRADIENT NAV HOVER EVENTS
		////////////////////////////
		if(evT==='mouseover' && !Boxaroo.isTablet){
			switch(e.target){
				case bOBJ.$GL[0]: 
					var eD=$.data(Boxaroo.cOBJ);
					if(eD.gradient_nav && !eD.full_size && eD.GALS[$.inArray(Boxaroo.cOBJ, eD.GALS)-1] !== undefined){
						bOBJ.$GL.stop(true,false).fadeTo(eD.gradient_left_speed, eD.gradient_left_opacity);
					}else{
						bOBJ.$GL[0].style.cursor='default';
					};
				break;
				
				case bOBJ.$GR[0]:
					var eD=$.data(Boxaroo.cOBJ);
					if(eD.gradient_nav && !eD.full_size && eD.GALS[$.inArray(Boxaroo.cOBJ, eD.GALS)+1] !== undefined){
						bOBJ.$GR.stop(true,false).fadeTo(eD.gradient_right_speed, eD.gradient_right_opacity);
					}else{
						bOBJ.$GR[0].style.cursor='default';
					};
				break;
			};
			
		}else if(evT==='mouseout' && !Boxaroo.isTablet){
			switch(e.target){
				case bOBJ.$GL[0]:
					var eD=$.data(Boxaroo.cOBJ);
					if(eD.gradient_nav) bOBJ.$GL.fadeTo(eD.gradient_left_speed, 0);
				break;

				case bOBJ.$GR[0]:
					var eD=$.data(Boxaroo.cOBJ);
					if(eD.gradient_nav) bOBJ.$GR.fadeTo(eD.gradient_right_speed, 0);
				break;
			};
		};
	
		e.preventDefault(); 
		e.stopImmediatePropagation();
	});
},














////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// OVERLAYS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
overlays:function(obj, D, Nav){
	/////////////////
	// LOAD PRELOADER
	/////////////////
	Boxaroo.show_preloader(obj, D);	
	
	var bOBJ=Boxaroo.OBJ,
		$O=bOBJ.$O, $T=bOBJ.$OT, $P=bOBJ.$OP,
		tile=D.bg_tile>0 ? 'url('+Boxaroo.BASE_URL+'Boxaroo/images/Tiles/bg_'+D.bg_tile+'.png)' : 'none', 
		pic=D.bg_pic,
		speed=Nav ? D.bg_speed_nav : D.bg_speed_in,
		cur=D.overlay_close ? 'pointer' : 'default',
		CLArgs={'text-indent':$O.css('text-indent').pF()+1, opacity:D.bg_opacity, 'background-color':D.bgclrs[0]};

	///////////////////
	// BACKGROUND LAYER
	///////////////////	
	if(D.bg_pic!==false){
		var img=new Image(), 
			src=pic===true ? D.SRC : !isNaN(pic) ? 'Boxaroo/images/Backgrounds/bg_'+pic+'.jpg' : pic;

		$(img).on('load', function(){
			if(Nav){
				// BACKGROUND LAYER
				$P.Ani({'text-indent':$P.css('text-indent').pF()+1, opacity:0}, speed/2, function(){
					$P.css({'background-image':'url('+Boxaroo.BASE_URL+src+')', visibility:'visible', cursor:cur})
					  .Ani({opacity:D.bg_pic_opacity}, speed/2, null);
				});				
				
				// TILE LAYER
				$T.Ani({'text-indent':$T.css('text-indent').pF()+1, opacity:0}, speed, function(){
					$T.css('background',tile).Ani({opacity:D.bg_tile_opacity}, speed, null);
				});
			}else{
				// BACKGROUND LAYER
				$P.css({'background-image':'url('+Boxaroo.BASE_URL+src+')', visibility:'visible', cursor:cur, opacity:0})
				  .Ani({opacity:D.bg_pic_opacity}, speed, null);
				  
				// TILE LAYER
				$T.css({background:tile, visibility:'visible', cursor:cur, opacity:0})
				  .Ani({opacity:D.bg_tile_opacity}, speed, null);		
			};
			
			// COLOR LAYER
			CLArgs[Boxaroo.PRE+'animation']='none';	
			Boxaroo.colorLayer($O, cur, CLArgs, speed, D);			
			
			// LOAD CONTENT AFTER BACKGROUND IS LOADED
			Boxaroo.load_content(obj, D, Nav);
		})[0].src=src;
		
		
		
	//////////////////////////////////////////////
	// NO BACKGROUND IMAGE - HIDE BACKGROUND LAYER
	//////////////////////////////////////////////	
	}else{
		$P.Ani({opacity:0}, speed, null);
		
		// TILE LAYER
		if(Nav){
			$T.Ani({'text-indent':$T.css('text-indent').pF()+1, opacity:0}, speed, function(){
				$T.css('background',tile).Ani({opacity:D.bg_tile_opacity}, speed, null);
			});
		}else{
			$T.css({background:tile, visibility:'visible', cursor:cur, opacity:0})
			  .Ani({opacity:D.bg_tile_opacity}, speed, null);		
		};
		
		// COLOR LAYER
		CLArgs[Boxaroo.PRE+'animation']='none';	
		Boxaroo.colorLayer($O, cur, CLArgs, speed, D);				
		
		// LOAD CONTENT AFTER BACKGROUND IS LOADED
		Boxaroo.load_content(obj, D, Nav);
	};

	
	// FIXED POSITION BUG ON OLDER MOBILES, MAKE OVERLAYS MATCH SCREEN+BUFFER
	if(Boxaroo.isMobile) Boxaroo.sizeMobil(bOBJ);
},	









////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// COLOR OVERLAY ANIMATION
////////////////////////////////////////////////////////////////////////////////////////////////////////////
colorLayer:function($O, cur, CLArgs, speed, D){
	$O.css({visibility:'visible', cursor:cur}).PSE().Ani(CLArgs, speed, function(){
		// COLOR ANIMATION LOOP
		if(Boxaroo.ANI && D.bgclrs.length>1){
			var BA=D.bgclrs, 
				OC=BA.length, 
				CArr=[];
			for(var i=OC; i>0; i--) CArr.push(100/OC*(i-1)+'% {background-color:'+BA[i-1]+';}'); 
			CArr.unshift('100% {background-color:'+BA[0]+';}');
			var CStr=CArr.reverse().join(' ').toString();
			CA={'transition':'none'}; 
			CA[Boxaroo.PRE+'animation']='BCL '+D.bg_color_speed+'s 0s infinite';

			// UPDATE AND APPLY KEYFRAMES
			Boxaroo.OBJ.$KFCL.html('@'+Boxaroo.PRE+'keyframes BCL{'+CStr+'}'); 
			$O.css(CA).PLY();
		};
	});	
},
















////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// SIZE LIGHTBOX
////////////////////////////////////////////////////////////////////////////////////////////////////////////
sizeLB:function(obj, D, Nav){
	var bOBJ=Boxaroo.OBJ,
		$content=D.ConTYP==='image' ? bOBJ.$C.find('img') : bOBJ.$C.find('iframe'),
		nD=Boxaroo.lightbox_dimensions(obj, D), 
		sF=Boxaroo.scF,
		r=Math.round, 
		m=Math.max,
		i=0,
		winW=Boxaroo.winW, 
		winH=Boxaroo.winH,
		// INITIAL CSS OBJECT
		init={
			'transition':'none',
			'min-width':'0px',
			'min-height':'0px',
			'background-color':D.mclrs[0]},	
		// ANIMATION ARGUMENTS OBJECT
		ani={
			'background-color':D.mclrs[0],
			'width':nD.W,
			'height':nD.H,
			'left':nD.L,
			'top':nD.T,
			'border-width':r(D.border_width*sF)+'px',
			'border-color':D.border_color,
			'border-top-left-radius':r(D.brTL*sF)+'px',
			'border-top-right-radius':r(D.brTR*sF)+'px',
			'border-bottom-left-radius':r(D.brBL*sF)+'px',
			'border-bottom-right-radius':r(D.brBR*sF)+'px',
			'padding-top':nD.MT+'px',
			'padding-right':nD.MR+'px',
			'padding-left':nD.ML+'px',
			'padding-bottom':nD.MT+'px'
		};

	// SETUP SCALING MARKER
	Boxaroo.iniW=nD.W.pF()*16;
	
	// GET CURRENT TRANSFORMATIONS
	if( !Nav || !D.frame || (Nav && D.frame_nav_override) ) ani[Boxaroo.PRE+'transform']=Boxaroo.get_transform(D, Nav);

	// DROP SHADOW ANIMATION
	if(Boxaroo.SDWS){
		var BXS=r(D.shadowX*sF)+'px '+r(D.shadowY*sF)+'px '+r(D.shadowBlur*sF)+'px '+r(D.shadowSpread*sF)+'px rgba('+D.shadowColor.r+','+D.shadowColor.g+','+D.shadowColor.b+','+D.shadowOpacity+')';
		ani['box-shadow']=BXS;		
	};


	////////////////////////
	// MATTE COLOR ANIMATION
	////////////////////////
	if(Boxaroo.ANI && D.mclrs.length>1){
		// BUILD MATTE KEYFRAME ANIMATION STRING
		var MA=D.mclrs, 
			Colors=MA.length, 
			MArr=[], 
			MArgs={};
		for(var i=Colors; i>0; i--) MArr.push(100/Colors*(i-1)+'% {background-color:'+MA[i-1]+';}'); 
		MArr.unshift('100% {background-color:'+MA[0]+'}');
		var MStr=MArr.reverse().join(' ').toString(), 		
			MAni='@'+Boxaroo.PRE+'keyframes Matte_Color{'+MStr+'}',
			multi='MCOLO '+D.matte_clr_speed+'s 0s infinite';
		if(D.frame) D.multiMatte=multi;		
		// LBs WITH FRAME_ANIMATIONS AND MATTE COLOR ANIMATIONS NEED TO USE , SEPARATED CSS
		var CL='@'+Boxaroo.PRE+'keyframes MCOLO{'+MStr+'}}';
		bOBJ.$KFM.html(CL);
		bOBJ.$LB.PLY().addClass('MANI');
	}else if(Nav){
		bOBJ.$LB.removeClass('MANI').css('background-color',D.mclrs[0]);
	};


	//////////////
	// INTIAL OPEN
	//////////////
	if(!Nav){
		if(D.frame && D.frame_nav_override) Boxaroo.frame_animation(obj, D);
		var pos=Boxaroo.ligthbox_effect(D, 'enter', nD);
		// SETUP INTIAL CSS OBJECT
		init['border-color']=D.border_color;
		init.top=pos.top+'px';
		init.left=pos.left+'px';
		init.width=D.lightbox_effect_in==='shrink' ? winW : '0px';
		init.height=D.lightbox_effect_in==='shrink' ? winH : '0px';
		init['background-color']=D.mclrs[0];
		init['box-shadow']=BXS;
		init['visibility']=D.full_size ? 'hidden' : 'visible';
		if(D.lightbox_effect_in==='match'){ 
			init.width=nD.W; 
			init.height=nD.H; 
		};
		if(D.matte_bg) init['background-image']='url('+Boxaroo.BASE_URL+'Boxaroo/images/Tiles/bg_'+D.matte_bg+'.png)';		

		// APPLY INITIAL CSS VALUES
		bOBJ.$LB.css(init);


	/////////////
	// NAVIGATION
	/////////////
	}else{
		// FRAME ANIMATION */
		if(D.frame && !D.frame_nav_override) Boxaroo.frame_animation(obj, D);

		// NAV SPIRAL ANIMATION
		if(D.spiral_nav) Boxaroo.spiral(D, D.spiral_speed_nav);

		// IE<9 WON'T ANIMATE SHADOWS WITHOUT ADDITIONAL HEAVY CODE
		if(Boxaroo.msie && Boxaroo.version<=9) bOBJ.$LB.css('box-shadow',BXS);

		// MATTE BACKGROUND
		bOBJ.$LB.css('background-image',D.matte_bg ? 'url('+Boxaroo.BASE_URL+'Boxaroo/images/Tiles/bg_'+D.matte_bg+'.png)' : 'none');
	};



	///////////////////////
	// HIGHLIGHT ANIMATIONS
	///////////////////////
	if(D.highlight_type){ 
		// SETUP HIGHLIGHT CSS
		var H=bOBJ.$HIn[0].style, 
			c1=Boxaroo.H2R(D.highlight_color1), 
			c2=Boxaroo.H2R(D.highlight_color2), 
			c3=Boxaroo.H2R(D.highlight_color3);
			
		// SAFARI
		H.backgroundImage='-webkit-radial-gradient(farthest-side '+D.highlight_type+' at center center, rgba('+c1.r+','+c1.g+','+c1.b+','+D.highlight_opacity_1+') '+D.highlight_stop_1+'%, rgba('+c2.r+','+c2.g+','+c2.b+','+D.highlight_opacity_2+') '+D.highlight_stop_2+'%, rgba('+c3.r+','+c3.g+','+c3.b+','+D.highlight_opacity_3+') '+D.highlight_stop_3+'%)';
		H.backgroundImage='radial-gradient(farthest-side '+D.highlight_type+' at center center, rgba('+c1.r+','+c1.g+','+c1.b+','+D.highlight_opacity_1+') '+D.highlight_stop_1+'%, rgba('+c2.r+','+c2.g+','+c2.b+','+D.highlight_opacity_2+') '+D.highlight_stop_2+'%, rgba('+c3.r+','+c3.g+','+c3.b+','+D.highlight_opacity_3+') '+D.highlight_stop_3+'%)';
		H.width=D.highlight_width+'%'; 
		H.height=D.highlight_height+'%'; 
		H.backgroundPosition=D.highlight_posX_in+'px '+D.highlight_posY_in+'px';
		if(Nav || (!Nav && !D.frame)) Boxaroo.highlight(obj, D); 
	};
	
	
	/////////////////////////////
	// GRADIENT NAVIGATION EVENTS
	/////////////////////////////
	if(D.gradient_nav){ 
		var lC=D.gradient_nav_left_color, 
			rC=D.gradient_nav_right_color, 
			GL=bOBJ.$GL[0].style, 
			GR=bOBJ.$GR[0].style,
			GR1='linear-gradient(to right,'+lC+' 0%,rgba(255,255,255,0) 100%)',
			GR2='linear-gradient(to left,'+rC+' 0%,rgba(255,255,255,0) 100%)';
		$([bOBJ.$GR[0], bOBJ.$GL[0]]).css({opacity:0, cursor:'pointer'});
		GL.borderTopLeftRadius='0px';  
		GL.borderBottomLeftRadius='0px';
		GR.borderTopRightRadius='0px'; 
		GR.borderBottomRightRadius='0px';
		GL.background=Boxaroo.PRE+GR1;
		GL.filter='progid:DXImageTransform.Microsoft.gradient(startColorstr="'+lC+'", endColorstr="#00FFFFFF", GradientType=1)';
		GL.background=GR1;
		GR.background=Boxaroo.PRE+GR2;
		GR.filter='progid:DXImageTransform.Microsoft.gradient(startColorstr="#00FFFFFF", endColorstr="'+rC+'", GradientType=1)';
		GR.background=GR2;
	}else{ 
		$([bOBJ.$GR[0], bOBJ.$GL[0]]).css('opacity',0);
	};


	//////////////////////
	// ANIMATE LIGHTBOX IN
	//////////////////////
	bOBJ.$LB.Ani({opacity:!Nav || bOBJ.$LB.css('opacity').pF()!==1 ? 1 : 0.99}, Nav ? 100 : D.box_speed_in, function(){
				
		// SPIRAL ANIMATION
		if(!Nav && D.spiral_open) Boxaroo.spiral(D, D.spiral_speed_in);
		
		////////////////////////////////
		// ANIMATE DIMENSIONS + POSITION
		////////////////////////////////
		bOBJ.$LB.Ani(ani, Nav ? D.box_nav_speed : D.box_speed_in, function(){

			// SET DIMENSIONS + MIN DIMENSIONS ON CONTENT
			$([bOBJ.$C[0], $content[0], bOBJ.$LB[0]]).css({
				'transition':'none',
				'min-width':nD.minW,
				'min-height':nD.minH,
				'width':nD.W,
				'height':nD.H
			});
			
			// APPLY BORDERS
			Boxaroo.borderRAD(bOBJ, $content, D.brTR, D.brBR, D.brBL, D.brTL, D.border_width);

			// SYNC HIGHLIGHT
			bOBJ.$High.css({width:nD.W, height:nD.H});
						
			// SET VIDEO/FLASH TO BLOCK [KEEPS ELEMENTS FROM VISIBLY BEING INSERTED IN THE LB]
			if(!Boxaroo.isTablet){
				if(D.ConTYP==='video'){ 
					$('#Box_IFrame').css('display','block');
				}else if(D.ConTYP==='flash' && Boxaroo.safari){
					// SAFARI SCROLLING BUG ISSUES SWF FILES
					$win.scrollTo(0,0);	
				};				
			};
			
			// ANIMATE CONTENT IN
			bOBJ.$C.css('visibility',!D.full_size ? 'visible' : 'hidden');
			
			// SHOW COMPONENTS
			Boxaroo.show_comps(D, false);
			

			/////////////////////
			// ANIMATE CONTENT IN
			/////////////////////			
			bOBJ.$C.Ani({opacity:1}, !Nav ? D.content_speed_in : D.content_nav_speed, function(){ 

				// LAUNCH FRAME ANIMATIONS
				if(D.frame && (!Nav || (Nav && D.frame_nav_override))){ 
					Boxaroo.frame_animation(obj, D); 
					// SYNC HIGHLIGHT
					if(D.highlight_type) Boxaroo.highlight(obj, D);
				};
					
				/////////////////////
				// INITIATE SLIDESHOW
				/////////////////////
				if(D.slideshow){
					var time=m(D.slide_display_time, D.bg_speed_nav, D.bg_speed_in);
					Boxaroo.SSTime=setTimeout(function(){ Boxaroo.Nav(obj, $.data(Boxaroo.cOBJ), 1); }, time);
					
					// SETUP SLIDESHOW COUNTER
					if(D.slideshow_counter){
						// NOT USING ANIMATOR TO AVOID CONDITION IN ANIMATOR FUNCTION FOR COUNTER EASING
						if(Boxaroo.TRNS){
							bOBJ.$SSC.css({
								'background-color':D.ss_counter_color_in,
								'margin-left':D.slideshow_counter_direction===1 ? winW+'px' : -winW+'px',
								'transition':'opacity, margin-left '+time/1000+'s linear 0s'});
								
							bOBJ.$SS.css({
								'background-color':D.ssc_color_out,
								'transition':'background-color '+time/1000+'s linear 0s'});									
						}else{
							bOBJ.$SSC.Ani({
								'background-color':D.ss_counter_color_out,'margin-left':D.slideshow_counter_direction===1 ? winW : -winW}, time, null);
							bOBJ.$SS.Ani({'background-color':D.ssc_color_out}, time, null);
						};
					};
				};	
					

				// JAVASCRIPT CALLBACK OPTION
				Boxaroo.jsHook(!Nav ? D.js_open : D.js_open_nav);

				// HIDE PRELOADER AND FINALIZE			
				Boxaroo.hide_preloader(obj, D); 
				Boxaroo.isNav=false;	
				
				
				////////////////////////////////
				// PRELOAD MORE IMAGES WHEN DONE
				////////////////////////////////
				var numofImages=D.GALS.length,
					index=$.inArray(obj, D.GALS)+1;

				if(numofImages>1){
					var prevImg=D.GALS[index-2],
						nextImg=D.GALS[index];
					
					// PREVIOUS IMAGE
					if(index>=2 && !prevImg.cached && $.data(prevImg).ConTYP==='image'){
						var pImg=new Image();
						pImg.src=$.data(prevImg).SRC;
						pImg.onload=function(){ prevImg.cached=true; };
					};					
					
					// NEXT IMAGE
					if(index<=numofImages-1 && !nextImg.cached && $.data(nextImg).ConTYP==='image'){
						var nImg=new Image();
						nImg.src=$.data(nextImg).SRC;
						nImg.onload=function(){ nextImg.cached=true; };
					};
				};
			});
		});
	});
	
	
	//////////////////////////
	// SLIDESHOW COUNTER SETUP
	//////////////////////////
	if(D.slideshow_counter && D.slideshow){
		bOBJ.$SSC.css({'transition':'none','background-color':D.ss_counter_color_in,'margin-left':'0px'});
		bOBJ.$SS.css({visibility:'visible', width:winW}).Ani({'background-color':D.ssc_color_in, opacity:1}, 500, null);
	};
},












////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// MAIN NAVIGATION METHOD
// [ DIR IS EITHER 1 OR -1 FOR FORWARD/BACKWARD ]
////////////////////////////////////////////////////////////////////////////////////////////////////////////
Nav:function(obj, D, DIR){
	if(Boxaroo.isNav) return;
	var bOBJ=Boxaroo.OBJ,
		$Nxt=D.GALS[$.inArray(obj, D.GALS)+DIR],
		winW=Boxaroo.winW,
		winH=Boxaroo.winH,
		$LB=bOBJ.$LB,
		$C=bOBJ.$C;
		
	///////////////////////
	// CAN NAVIGATE GALLERY
	///////////////////////
	if($Nxt!==undefined){
		// INDICATE NAVIGATION, SET MARKERS
		Boxaroo.isNav=true; 
		Boxaroo.cOBJ=$Nxt; 
		Boxaroo.pOBJ=obj; 
		var NoD=$.data($Nxt),
			s=D.box_nav_speed,
			Ns=NoD.box_nav_speed;

		// HIDE COMPONENTS AND STOP HIGHLIGHTS
		Boxaroo.hide_comps(D);		
		bOBJ.$HIn.PSE().removeClass('BoxHA').css('opacity',0);
		
		// JS_NAVIGATE LIGHTBOX HOOKS
		Boxaroo.jsHook(D.js_navigate); 
		Boxaroo.jsHook(DIR===1 ? D.js_nav_fwd : D.js_nav_back); 

		/////////////
		// NO ERRORS!
		/////////////
		if(!$('#Box_Error').length){
			// GET LIGHTBOX VARIABLES
			var pos=Boxaroo.ligthbox_effect(D, 'exit', true),
				lightbox_effect_out=D.lightbox_effect_out,
				width=lightbox_effect_out!=='match' ? lightbox_effect_out==='shrink' ? '0px' : winW+'px' : $LB.outerWidth(), 
				height=lightbox_effect_out!=='match' ? lightbox_effect_out==='shrink' ? '0px' : winH+'px' : $LB.outerHeight(),
				oldIE=Boxaroo.msie && Boxaroo.version==8.0,
				NavFlip=D.frame_nav_override && (NoD.flipX===NoD.frame_flipX && NoD.flipX!==0) || (NoD.flipY===NoD.frame_flipY && NoD.flipY!==0) || (NoD.skewX===NoD.frame_skewX && NoD.skewX!==0) || (NoD.skewY===NoD.frame_skewY && NoD.skewY!==0) || (NoD.rotate===NoD.frame_rotate && NoD.rotate!==0) || (NoD.translateX===NoD.frame_translateX && NoD.translateX!==0) || (NoD.translateY===NoD.frame_translateY && NoD.translateY!==0),
				NA={left:pos.left+'px', top:pos.top+'px',
					width:width, height:height, 'min-width':width, 'min-height':height,
					'border-width':'0px', 'border-color':NoD.border_color,
					'padding-top':'0px', 'padding-left':'0px', 'padding-bottom':'0px', 'padding-right':'0px',
					'background-image':'none'};				
				
			// SAVE MOUSE COORDINATES FOR ORIGIN SETTING
			if(NoD.lightbox_effect_in==='origin' || NoD.lightbox_effect_out==='origin'){ 
				var nxtPos=$Nxt.position();
				Boxaroo.mouseX=nxtPos.left; 
				Boxaroo.mouseY=nxtPos.top; 
			};

			////////////////////////
			// LIGHTBOX MOVEMENT NAV
			////////////////////////
			if(D.nav_movement || NoD.nav_movement){
				// IE8 BUG
				if(oldIE) $C.css('visibility','hidden');

				//////////////////////
				// ANIMATE CONTENT OUT
				//////////////////////
				$C.Ani({opacity:0}, D.content_nav_speed, function(){
					// TRANSFORMS [ TEST FRAME_NAV_OVERRIDE - ALLOWS ANI DURING NAV W/O TRANSFORMS ]
					NA[Boxaroo.PRE+'transform']=NavFlip ? Boxaroo.nav_flip(obj, D, NoD) : Boxaroo.get_transform(NoD, false);

					///////////////////////////
					// ANIMATE THE LIGHTBOX OUT
					///////////////////////////
					$LB.PSE().Ani(NA, s, function(){
						// DISABLE FRAME ANIMATIONS
						$LB.PSE().removeClass('BoxAniC');
						
						// REMOVE ELEMENTS
						Boxaroo.remove_els(bOBJ); 
						
						// UPDATE STACKING AND CLASSES
						Boxaroo.prep(NoD); 
							
						// LIGHTBOX MOVEMENT AND EFFECTS
						var nP=Boxaroo.ligthbox_effect(NoD, 'enter', true),
							EA={top:nP.top+'px', left:nP.left+'px',
								'min-width':0, 'min-height':0, 'box-shadow':'none',
								visibility:!NoD.full_size ? 'visible' : 'hidden'};

						// LIGHTBOX DIMENSIONS IF NOT 'MATCH'
						if(NoD.lightbox_effect_in!=='match'){
							EA.width=NoD.lightbox_effect_in==='shrink' ? winW+'px' : '0px';
							EA.height=NoD.lightbox_effect_in==='shrink' ? winH+'px' : '0px';
						};
							
						// APPLY CSS
						$LB.css(EA);
						
						// LOAD CONTENT [ ALLOW FOR FADING FROM FULL_SIZE -> LIGHTBOX ]
						if(!D.full_size){ 
							Boxaroo.overlays($Nxt, NoD, true);
						}else if(!NoD.full_size){ 
							Boxaroo.fade_back_in(bOBJ, Ns, $Nxt, NoD); 
						};
					});
				});


			//////////////////////////////////////
			// STANDARD LIGHTBOX FADING NAVIGATION
			//////////////////////////////////////
			}else{	
				// ANIMATE CONTENT OUT
				$C.Ani({opacity:0}, D.content_nav_speed, function(){
					Boxaroo.remove_els(bOBJ);

					if(!NoD.full_size){
						// FRAME ANIMATIONS
						if(D.frame){
							var LBArgs={};
							NA[Boxaroo.PRE+'transform']=Boxaroo.get_transform(NoD, false);
							LBArgs[Boxaroo.PRE+'filter']='none';
							$LB.css(LBArgs).PSE().removeClass('BoxAniC');
						};
		
						// TRANSFORMS [ TEST FRAME_NAV_OVERRIDE - ALLOWS ANI DURING NAV W/O TRANSFORMS ]
						if(NavFlip){
							NA[Boxaroo.PRE+'transform']=Boxaroo.nav_flip(obj, D, NoD);
							delete NA.width; 
							delete NA.height; 
							delete NA['min-width']; 
							delete NA['min-height']; 
							delete NA['top']; 
							delete NA['left']; 
						};

						///////////////////
						// ANIMATE LIGHTBOX
						///////////////////
						$LB.Ani(NA, D.frame ? 300 : s, function(){		
							// UPDATE STACKING AND CLASSES
							Boxaroo.prep(NoD); 
							
							// ALLOW FOR FADING FROM FULL_SIZE MODE
							if(!D.full_size){ 
								Boxaroo.overlays($Nxt, NoD, true);
							}else if(!NoD.full_size){ 
								Boxaroo.fade_back_in(bOBJ, Ns, $Nxt, NoD); 
							};
						});						
	
	
					// NEXT LIGHTBOX USES FULL_SIZE - FADE OUT LIGHTBOX
					}else{
						$LB.Ani({opacity:0}, s, function(){
							// PAUSE LIGHTBOX
							bOBJ.$LB.css({'transition':'none',visibility:'hidden'}).PSE().removeClass('BoxAniC');
							// UPDATE STACKING AND CLASSES
							Boxaroo.prep(NoD); 
							// LOAD CONTENT
							Boxaroo.overlays($Nxt, NoD, true);
						});
					};
				});			
			};	
		
		
		///////////////////
		// OH NO! AN ERROR!
		///////////////////
		}else{
			// PAUSE HIGHLIGHTS
			bOBJ.$HIn.PSE().removeClass('BoxHA');
			// UPDATE STACKING AND CLASSES
			Boxaroo.prep(NoD);
			// REMOVE ELEMENTS
			Boxaroo.remove_els(bOBJ); 
			// LOAD CONTENT
			Boxaroo.overlays($Nxt, NoD, false);
		};
		
		
		
	/////////////////////////
	// CAN'T NAVIGATE GALLERY
	/////////////////////////
	}else{
		Boxaroo.isNav=false;
		if(D.slideshow){
			// SLIDESHOWS
			if(D.close_at_end){
				Boxaroo.close_lightbox(obj, D);
				Boxaroo.jsHook(D.js_slideshow_end);
			};
			if(D.slideshow_counter) bOBJ.$SS.css('visibility','hidden');
		};
	};
},











////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// FADE LIGHTBOX BACK IN AFTER TRANSITIONING FROM FULL_SIZE MODE 
////////////////////////////////////////////////////////////////////////////////////////////////////////////
fade_back_in:function(bOBJ, s, o, NoD){
	bOBJ.$LB.css({visibility:'visible', opacity:0}).stop(true,true).animate({opacity:1},{duration:s, queue:false, complete:function(){
		Boxaroo.overlays(o, NoD, true);
	}});
},










////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// LIGHTBOX DIMENSIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
lightbox_dimensions:function(obj, D){
	var	bOBJ=Boxaroo.OBJ, 
		$LB=bOBJ.$LB,
		winW=Boxaroo.winW, 
		winH=Boxaroo.winH,
		a=Math.abs, 
		r=Math.round,
		// BORDER WIDTH/CURRENT BORDER WIDTH
		b_W=D.border_width,
		cBorderW=$LB[0].style.borderWidth.pF(),
		// MATTES
		oDMT=D.matte_top, 
		oDMR=D.matte_right, 
		oDMB=D.matte_bottom, 
		oDML=D.matte_left,
		ConW=Boxaroo.conW, 
		ConH=Boxaroo.conH,
		TOPB=r(winH*(D.bufferY/100)+(b_W*2)+oDMT+oDMB),
		LEFTB=r(winW*(D.bufferX/100)+(b_W*2)+oDML+oDMR),
		sB=D.scale_border_radius, 
		sS=D.scale_shadow,
		oldIE=Boxaroo.msie && Boxaroo.version<9;
		// CURRENT BORDER RADIUS
		if(!oldIE){
			var cbrTL=D.brTL>0 ? $LB.css('border-top-left-radius').pF() : 0,
				cbrTR=D.brTR>0 ? $LB.css('border-top-right-radius').pF() : 0,
				cbrBL=D.brBL>0 ? $LB.css('border-bottom-left-radius').pF() : 0,
				cbrBR=D.brBR>0 ? $LB.css('border-bottom-right-radius').pF() : 0;
		};

	// BOX SHADOWS
	if(Boxaroo.SDWS) var cSDW=$.trim($LB.css('box-shadow').replace(/rgba?\([^\)]+\)/gi, '').replace(/#[0-9a-f]+/gi, '').replace(/[a-z]+/gi, '')).split(' ');

	// SIZE LIGHTBOX BASED ON LONGEST SIDE
	switch(Math.max(ConW,ConH)){
		case ConW:
			var boxH=winH-TOPB<ConH ? winH-TOPB : ConH,
				boxW=r(boxH*ConW/ConH),
				Min_W=r(ConW*D.min_height/ConH),
				Min_H=D.min_height;
			if(winW < boxW+LEFTB){
				var boxW=winW-LEFTB < ConW ? winW-LEFTB : ConW, 
					boxH=r(boxW*ConH/ConW);
			};
		break;
		
		case ConH:
			var boxW=winW-LEFTB < ConW ? winW-LEFTB : ConW,
				boxH=r(boxW*ConH/ConW),
				Min_H=r(D.min_width*ConH/ConW),
				Min_W=D.min_width;
			if(winH < boxH+TOPB){
				var boxH=winH-TOPB < ConH ? winH-TOPB : ConH, 
					boxW=r(boxH*ConW/ConH);
			};
		break;
	};
	
	var FAC=Boxaroo.iniW===0 ? boxW : Boxaroo.iniW,
		CS=(boxW>D.min_width && boxH>D.min_height && boxW/FAC>0.05 && boxH/FAC>0.05) ? true : false,
		sF=Boxaroo.scF,
		newBW=D.scale_border_width && CS ? a(r(sF*b_W)) : cBorderW,
		brTL=sB && CS ? a(r(sF*D.brTL)) : cbrTL,
		brTR=sB && CS ? a(r(sF*D.brTR)) : cbrTR,
		brBL=sB && CS ? a(r(sF*D.brBL)) : cbrBL,
		brBR=sB && CS ? a(r(sF*D.brBR)) : cbrBR,
		m_T=CS ? a(r(sF*oDMT)) : oDMT+'px',
		m_R=CS ? a(r(sF*oDMR)) : oDMR+'px',
		m_B=CS ? a(r(sF*oDMB)) : oDMB+'px',
		m_L=CS ? a(r(sF*oDML)) : oDML+'px';

	return {
		CS:CS,
		MT:m_T, MR:m_R, MB:m_B, ML:m_L,
		L:(winW-(boxW+m_L+m_R))/2-b_W+'px',
		T:(winH-(boxH+m_T+m_B))/2-b_W+'px',
		W:boxW/16+'em', 
		H:boxH/16+'em',
		minW:Min_W/16+'em', 
		minH:Min_H/16+'em',
		BW:newBW>b_W ? b_W : newBW,
		BRTL:brTL>5 ? brTL : 5, 
		BRTR:brTR>5 ? brTR : 5, 
		BRBL:brBL>5 ? brBL : 5, 
		BRBR:brBR>5 ? brBR : 5,
		SDWX:sS && CS ? a(r(sF*D.shadowX)) : cSDW[0], 
		SDWY:sS&&CS ? a(r(sF*D.shadowY)) : cSDW[1], 
		SDWB:sS&&CS ? a(r(sF*D.shadowBlur)) : cSDW[2], 
		SDWS:sS&&CS ? a(r(sF*D.shadowSpread)) : cSDW[3]};
},













////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// LIGHTBOX MOVEMENT EFFECTS  [ v=EVENT, GI=GROW IN, SO=SHRINK OUT, MI=MATCH IN ]
////////////////////////////////////////////////////////////////////////////////////////////////////////////
ligthbox_effect:function(D, v, nD){
	var	W=Boxaroo.winW, 
		H=Boxaroo.winH, 
		I=D.lightbox_effect_in, 
		O=D.lightbox_effect_out,
		X=nD!==true ? (nD.W.pF()*16)+D.translateX : W+10,
		Y=nD!==true ? (nD.H.pF()*16)+D.translateY : H+10,
		e='enter', 
		ex='exit', 
		m='match', 
		s='shrink', 
		g='grow', 
		ENT=v===e, 
		EXT=v===ex, 
		GI=I===g && ENT, 
		SI=I===s && ENT, 
		MI=I===m && ENT, 
		GO=O===g && EXT, 
		SO=O===s && EXT, 
		MO=O===m && EXT,
		a=GI || SO, 
		b=SI || GO, 
		c=MI || MO;
		
	switch(v==e ? D.lightbox_entrance : D.lightbox_exit){
		case 'center':
			if(a) var sT=H/2, sL=W/2;
			if(b) var sT=0, sL=0;
			if(c) var sT=(H-Y)/2, sL=(W-X)/2;
		break; 
		
		case 'topleft':
			if(a) var sT=-Y,sL=-X/2;
			if(b||c) var sT=-Y, sL=-X;
		break; 
		
		case 'top':
			if(a) var sT=-Y, sL=W/2;
			if(b) var sT=-Y, sL=0;
			if(c) var sT=-Y, sL=(W-X)/2;
		break; 
		
		case 'topright':
			if(a) var sT=-Y/2, sL=W+X/2;
			if(b||c) var sT=-Y, sL=W-X/2;
		break; 
		
		case 'right':
			if(a) var sT=H/2, sL=W+X;
			if(b||c) var sT=(H-Y)/2, sL=W+X/2;
		break;
		
		case 'bottomright':
			if(a) var sT=H+Y, sL=W+X;
			if(b||c) var sT=H+Y, sL=W+X/2;
		break;
		
		case 'bottom':
			if(a) var sT=H+Y, sL=W/2;
			if(b) var sT=H+Y, sL=0;
			if(c) var sT=H+Y, sL=(W-X)/2;
		break;
		
		case 'bottomleft':
			if(a) var sT=H+Y, sL=0-X;
			if(b||c) var sT=H+Y, sL=-X*2;
		break; 
		
		case 'left':
			if(a) var sT=H/2, sL=-X;
			if(b||c) var sT=(H-Y)/2, sL=-X*2;
		break;
		
		case 'origin':
			if(a) var sT=Boxaroo.mouseY, sL=Boxaroo.mouseX;
			if(b||c) var sT=(H-Y)/2, sL=0-X*2;
		break;
	};		
	
	return {top:sT, left:sL};
},












////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// CLOSE LIGHTBOX
////////////////////////////////////////////////////////////////////////////////////////////////////////////
close_lightbox:function(obj, D){
	// SET isNav TO TRUE TEMPORILY TO PREVENT NAVIGATING WHILE CLOSING
	Boxaroo.isNav=true;
	var bOBJ=Boxaroo.OBJ,
		winW=Boxaroo.winW, 
		winH=Boxaroo.winH,
		pos=Boxaroo.ligthbox_effect(D, 'exit', true);
	
	// HIDE PRELOADER
	Boxaroo.hide_preloader(obj, D);
	
	// UNBIND EVENTS
	$($doc).off('keydown.Bxro mousewheel.Bxro DOMMouseScroll.Bxro contextmenu.Bxro, dragstart.Bxro');

	// CLEAR SLIDESHOWS */ 
	if(D.slideshow) bOBJ.$SS.css('visibility','hidden');
	clearTimeout(Boxaroo.SSTime);
	clearTimeout(Boxaroo.orientTime);	
		
	/////////////////////////
	// IF LIGHTBOX IS VISIBLE
	/////////////////////////
	if(!$('#Box_Error').length){
		Boxaroo.hide_comps(D);
		// SPIRAL EXIT
		if(D.spiral_exit) Boxaroo.spiral(D, D.spiral_speed_out);

		//////////////////////
		// ANIMATE CONTENT OUT
		//////////////////////
		bOBJ.$C.Ani({opacity:0}, D.content_speed_out, function(){
			// RESET HIGHLIGHTS
			bOBJ.$C.css('visibility','hidden');
			bOBJ.$HIn.PSE().removeClass('BoxHA');

			// PRE-ANIMATION SETUP
			var A={opacity:0,
				   top:pos.top+'px', 
				   left:pos.left+'px',
				   'min-width':'0px',
				   'min-height':'0px',
				   'border-width':'0px'};
			if(D.lightbox_effect_out!=='match'){ 
				A.width=D.lightbox_effect_out==='shrink' ? '0px' : winW; 
				A.height=D.lightbox_effect_out==='shrink' ? '0px' : winH; 
			};

			///////////////////////
			// ANIMATE LIGHTBOX OUT
			///////////////////////
			bOBJ.$LB.css('transition','none').Ani(A, D.box_speed_out, function(){
				bOBJ.$LB.css('visibility','hidden').removeClass('BoxAniC');
				$([bOBJ.$LB[0], bOBJ.$HIn[0]]).PSE();
				bOBJ.$HIn.css('opacity',0);

				// SHOW SCROLLBARS
				if(!D.scrollbarX) $('html')[0].style.overflowX='auto';
				if(!D.scrollbarY) $('html')[0].style.overflowY='auto';				

				// REMOVE ELEMENTS
				Boxaroo.remove_els(bOBJ);
				
				// JS_CLOSE HOOK
				if(!D.js_slideshow_end) Boxaroo.jsHook(D.js_close);
				

				///////////////////////
				// ANIMATE OVERLAYS OUT
				///////////////////////
				$([bOBJ.$O[0], bOBJ.$OT[0], bOBJ.$OP[0]]).PSE().Ani({'text-indent':bOBJ.$O.css('text-indent').pF()+1, opacity:0}, D.bg_speed_out,
					function(){ $([bOBJ.$O[0], bOBJ.$OT[0], bOBJ.$OP[0]]).css('visibility','hidden'); });
				});
		});


	///////////////////
	// ERROR IS VISIBLE
	///////////////////
	}else{
		$('#Box_Error').Ani({opacity:0}, D.box_speed_out, function(){
			// REMOVE ELEMENTS
			Boxaroo.remove_els(bOBJ);
			// HIDE OVERLAYS
			$([bOBJ.$O[0], bOBJ.$OT[0], bOBJ.$OP[0]]).css('visibility','hidden');
			// SHOW SCROLLBARS
			if(!D.scrollbarX) $('html')[0].style.overflowX="auto";
			if(!D.scrollbarY) $('html')[0].style.overflowY="auto";
		});
	};		
},
















/////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// LOAD CONTENT
/////////////////////////////////////////////////////////////////////////////////////////
load_content:function(obj, D, Nav){
	var bOBJ=Boxaroo.OBJ; 

	// MAKE SURE ALL COMPONENTS ARE INVISIBLE
	// NEEDS TO HAPPEN HERE, NOT IN COMPONENT FADE-OUT ANIMATION CALLBACK
	$([bOBJ.$Co[0], bOBJ.$Cap[0], bOBJ.$El1[0], bOBJ.$El2[0], bOBJ.$El3[0], bOBJ.$Close[0], bOBJ.$Prev[0], bOBJ.$Next[0]]).css('visibility','hidden');
	$([bOBJ.$El1[0], bOBJ.$El2[0], bOBJ.$El3[0]]).html(' ');
	
	switch(D.ConTYP){
	
		/////////
		// IMAGES
		/////////
		case 'image': 
			var img=new Image();
				$(img).on('load',function(){
					// SAVE DIMENSIONS, SET SOURCE/ALT ATTR, SIZE LIGHTBOX
					Boxaroo.conW=this.width *  D.content_sizeX; 
					Boxaroo.conH=this.height * D.content_sizeY; 
					D.cached=true; 
					bOBJ.$C.append('<img alt="'+obj.getAttribute('title')+'" src="'+D.SRC+'">');
					Boxaroo.sizeLB(obj, D, Nav); 
				}).on('error',function(){
					// HANDLE ERRORS
					Boxaroo.load_error(obj, D); 
				})[0].src=D.SRC; 
			break;
	
		
		/////////
		// VIDEOS
		/////////
		case 'video': 
				var w=Boxaroo.conW=D.vW, h=Boxaroo.conH=D.vH, 
					autoplay=D.autoplay ? '1' : '0',
					loop=D.loop ? '1' : '0',
					clr=D.video_color || '00adef';
				// ADD IFRAME FOR VIMEO VIDEO
				bOBJ.$C.prepend('<iframe id="Box_IFrame" src="//player.vimeo.com/video/'+D.ConSRC+'?api=1&player_id=Box_IFrame&portrait=0&byline=0&color='+clr+'&autoplay='+autoplay+'&loop='+loop+'" width="'+w+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
				// SIZE LIGHTBOX
				Boxaroo.sizeLB(obj, D, Nav);
		break;
		
		
		////////////
		// FLASH SWF
		////////////
		case 'flash':
			if(!Boxaroo.isTablet){
				var src=D.SRC;
				// PULL DIMENSIONS OF SWF FILE
				$.ajax({
					url:Boxaroo.BASE_URL+'Boxaroo/video/swf_prop.php?src='+src,dataType:'json',
					success:function(response){
						bOBJ.$C.prepend('<object id="Box_Flash" type="application/x-shockwave-flash" data="'+src+'" width="100%" height="100%" style="display:none;"><param name="allowfullscreen" value="false"/><param name="wmode" value="opaque"/><param name="quality" value="autohigh"/><param name="allowscriptaccess" value="always"/><param name="flashvars" value="file='+src+'"/><!--[if IE]><!--><param name="movie" value="'+src+'"/><!--<![endif]--></object>'); 
						Boxaroo.conW=response.size[0]; 
						Boxaroo.conH=response.size[1]; 
						// SIZE LIGHTBOX
						Boxaroo.sizeLB(obj, D, Nav);
				}});
			}else{
				D.error_text="This device does not support Flash."; 
				Boxaroo.load_error(obj, D);
			};
		break;
	};	
},








/////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// ERROR HANDLING
/////////////////////////////////////////////////////////////////////////////////////////
load_error:function(obj, D){
	var bOBJ=Boxaroo.OBJ,
		cl=D.error_class || 'Box_Error_'+D.skin;	
	
	// LOAD OVERLAYS AND HIDE LIGHTBOX	
	Boxaroo.overlays(obj, D, false);
	$([bOBJ.$C[0], bOBJ.$LB[0]]).css('visibility','hidden');

	// ADD ERROR
	$('#Boxaroo').append('<div id="Box_Error" class="'+cl+'"><p>'+D.error_text+'</p></div>');
	
	// BIND CLOSE EVENTS
	$([bOBJ.$O[0], bOBJ.$OT[0], bOBJ.$OP[0]]).add($('#Box_Error')).on(Boxaroo.cEv, function(){ 
		Boxaroo.close_lightbox(obj, D); 
	});

	// HIDE PRELOADER	
	Boxaroo.hide_preloader(obj, D);
},


























/////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// ASSIGN CLASSES AND SETUP STACKING, D=OBJECT DATA
/////////////////////////////////////////////////////////////////////////////////////////
prep:function(D){
	var bOBJ=Boxaroo.OBJ, s=D.skin,
		counter_class=D.counter_class || 'Box_Co_'+s,
		caption_class=D.caption_class || 'Box_Caption_'+s,
		el1_class=D.el1_class || 'Box_Elem1_'+s, 
		el2_class=D.el2_class || 'Box_Elem2_'+s,
		el3_class=D.el3_class || 'Box_Elem3_'+s,
		close_button_class=D.close_button_class || 'Box_Cl_'+s, 
		prev_button_class=D.prev_button_class || 'Box_Previous_'+s, 
		next_button_class=D.next_button_class || 'Box_Next_'+s,
		z=D.stack_order.removeWS().toLowerCase().split(','), l=z.length;

	// STACKING ORDER AND CLASS ASSIGNMENT
	if(l<12) alert("Boxaroo: Missing Stacking Values.");
	for(var i=0; i<l; ++i){
		switch (z[i]){
			case 'overlay':  bOBJ.$O[0].style.zIndex=99100+i;  break;
			case 'tile': 	 bOBJ.$OT[0].style.zIndex=99100+i; break;
			case 'bg_image': bOBJ.$OP[0].style.zIndex=99100+i; break;
			case 'lightbox': $([bOBJ.$LB[0], bOBJ.$C[0], $('#Box_Error')[0]]).css('z-index', 99100+i); break;
			case 'el1': if(D.el1){ bOBJ.$El1[0].className=el1_class; bOBJ.$El1[0].style.zIndex=99100+i; }; break;
			case 'el2': if(D.el2){ bOBJ.$El2[0].className=el1_class; bOBJ.$El2[0].style.zIndex=99100+i; }; break;
			case 'el3': if(D.el3){ bOBJ.$El3[0].className=el3_class; bOBJ.$El3[0].style.zIndex=99100+i; }; break;
			case 'counter': if(D.counter){ bOBJ.$Co[0].className=counter_class; bOBJ.$Co[0].style.zIndex=99100+i; }; break;
			case 'caption': if(D.caption){ bOBJ.$Cap[0].className=caption_class; bOBJ.$Cap[0].style.zIndex=99100+i; }; break;
			case 'next_button': if(D.next_button){ bOBJ.$Next[0].className=next_button_class; bOBJ.$Next[0].style.zIndex=99100+i; }; break;
			case 'prev_button': if(D.prev_button){ bOBJ.$Prev[0].className=prev_button_class; bOBJ.$Prev[0].style.zIndex=99100+i; }; break;
			case 'close_button': if(D.close_button){ bOBJ.$Close[0].className=close_button_class; bOBJ.$Close[0].style.zIndex=99100+i; }; break;
		};
	};
	// REMAINING CLASS ASSIGNMENT AND STACKING ORDER
	bOBJ.$LB[0].className=bOBJ.$LB.hasClass('BoxAniC') ? 'BoxAniC Box_LB_'+s : 'Box_LB_'+s;
	bOBJ.$C[0].className='Box_Content';
	if(D.gradient_nav){ bOBJ.$GR[0].style.zIndex=991700; bOBJ.$GL[0].style.zIndex=991700; };
	if(D.highlight_type) bOBJ.$High[0].style.zIndex=991500;
},










////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// HTML ELEMENTS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
el_html:function($el, src, hook){
	src[0].style.display='block';
	$el.html(src.clone(true)).css('visibility','visible').off(Boxaroo.cEv);
	src[0].style.display='none';
	// JS_EL1_CLICK HOOK
	if(typeof $win[hook]==='function') $el.on(Boxaroo.cEv,function(){ $win[hook].apply(Boxaroo.OBJ); });
},


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// HIDE COMPONENTS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
comp_out:function($comp, speed, $el){ 
	$comp.Ani({opacity:0}, speed, null); 
},

hide_comps:function(D){		
	var bOBJ=Boxaroo.OBJ,
		s=D.box_nav_speed;
		
	if(D.slideshow) 	Boxaroo.comp_out(bOBJ.$SS, 200, false);
	if(D.prev_button)	Boxaroo.comp_out(bOBJ.$Prev, s/2, false);
	if(D.next_button)	Boxaroo.comp_out(bOBJ.$Next, s/2, false);
	if(D.close_button)	Boxaroo.comp_out(bOBJ.$Close, s/2, false);
	if(D.el1)			bOBJ.$El1.Ani({opacity:0}, D.el1_speed_out, function(){ bOBJ.$El1.css('visibility','hidden'); }); 
	if(D.el2)			bOBJ.$El2.Ani({opacity:0}, D.el2_speed_out, function(){ bOBJ.$El2.css('visibility','hidden'); }); 
	if(D.el3)			bOBJ.$El3.Ani({opacity:0}, D.el3_speed_out, function(){ bOBJ.$El3.css('visibility','hidden'); }); 
	if(D.counter)		Boxaroo.comp_out(bOBJ.$Co, D.counter_speed_out, false);
	if(D.caption)		Boxaroo.comp_out(bOBJ.$Cap, D.caption_speed_out, false);
},










////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// SHOW COMPONENTS - [ AVOID OPTIMIZING THE OUTERWIDTH/OUTERHEIGHT IN THIS METHOD.
// THEY ARE REPEATED SINCE THE DIMENSIONS NEED TO BE PULLED AT SPECIFIC TIMES. ]
////////////////////////////////////////////////////////////////////////////////////////////////////////////
show_comps:function(D, resize){
	var bOBJ=Boxaroo.OBJ, 
		obj=Boxaroo.cOBJ, 
		$LB=bOBJ.$LB,
		SP=D.nav_speed,
		GAL=D.GALS,
		LBPos=$LB.position(),
		PI={
			wW:Boxaroo.winW, 
			wH:Boxaroo.winH,
			_H:$LB.outerHeight(), 
			_W:$LB.outerWidth(),
			sW:D.scrollbarY ? 20 : 0,
			_T:Math.round(LBPos.top), 
			_L:Math.round(LBPos.left)
		},
		dir=Boxaroo.BASE_URL+'Boxaroo/images/Nav/',
		elA={display:'block', 'transition':'none'},
		CCA={visibility:'visible', 'transition':'none'};
			
	// SET SCROLL POSITIONS
	Boxaroo.scrollX=$($win).scrollLeft(); 
	Boxaroo.scrollY=$($win).scrollTop();

	// TRACK ELEMENT SCALING
	this.scF=sF=(PI.wW * PI.wH)/Boxaroo.iniArea;
	
	
	///////////////
	// CLOSE BUTTON
	///////////////
	if(D.close_button){
		var $Close=bOBJ.$Close;

		// SET IMAGE
		if(!resize) $Close.find('img')[0].src=dir+'close_'+D.close_style+'.png';

		var CS=sF>D.close_max ? D.close_max : sF<D.close_min ? D.close_min:sF,
			close_pos=resize ? D.close_move_pos : D.close_pos,
			closeX=resize ? D.close_move_offsetX : D.close_offsetX,
			closeY=resize ? D.close_move_offsetY : D.close_offsetY,
			close_move_pos=D.close_move_pos,
			CW=D.ini_close_width*CS,
			CH=D.ini_close_height*CS;

		// SET DIMENSIONS AND POSITION
		$Close.css({width:CW+'px', height:CH+'px'}).pos(PI, close_pos, closeX*sF, closeY*sF, CW, CH, false);
	
		// ANIMATE INTO VIEW
		if(!resize){
			var CloseArgs={'transition':'none', visibility:'visible'};
			CloseArgs[Boxaroo.PRE+'transform']=Boxaroo.calc_transform(D.perspective, D.close_scale_out, D.close_scale_out, 0, 0, D.close_flipX_out, D.close_flipY_out, 0, 0, D.close_rotate_out);
			
			$Close.css(CloseArgs).Ani({opacity:D.close_opacity_out}, SP, function(){
				// MOVEMENT ANIMATION
				if(close_pos !== close_move_pos){
					$Close.pos(PI, close_move_pos, D.close_move_offsetX, D.close_move_offsetY, CW, CH, D.close_movement_speed);
				};
			});
		};
	};


	//////////////////
	// PREVIOUS BUTTON
	//////////////////
	if(D.prev_button){
		var $Prev=bOBJ.$Prev;
		
		// SET IMAGE
		if(!resize) $Prev.find('img')[0].src=dir+'prev_'+D.prev_style+'.png';
		
		var PS=sF>D.prev_max ? D.prev_max : sF<D.prev_min ? D.prev_min:sF,
			prev_pos=resize ? D.prev_move_pos : D.prev_pos,
			prevX=resize ? D.prev_move_offsetX : D.prev_offsetX,
			prevY=resize ? D.prev_move_offsetY : D.prev_offsetY,
			prev_move_pos=D.prev_move_pos,
			PW=D.ini_prev_width*PS,
			PH=D.ini_prev_height*PS;

		// SET DIMENSIONS AND POSITION PREVIOUS BUTTON
		$Prev.css({width:PW+'px', height:PH+'px'}).pos(PI, prev_pos, prevX*sF, prevY*sF, PW, PH, false);
	
		// ANIMATE INTO VIEW
		if(!resize){
			var PrevArgs={'transition':'none', visibility:!GAL[$.inArray(obj,GAL)-1] ? 'hidden' : 'visible'};
			PrevArgs[Boxaroo.PRE+'transform']=Boxaroo.calc_transform(D.perspective, D.prev_scale_out, D.prev_scale_out, 0, 0, D.prev_flipX_out, D.prev_flipY_out, 0, 0, D.prev_rotate_out);		
				
			$Prev.css(PrevArgs).Ani({opacity:D.prev_opacity_out}, SP, function(){
				// MOVEMENT ANIMATION
				if(prev_pos !== prev_move_pos) $Prev.pos(PI, prev_move_pos, D.prev_move_offsetX, D.prev_move_offsetY, PW, PH, D.prev_movement_speed);
			});
		};		
	};


	//////////////
	// NEXT BUTTON
	//////////////
	if(D.next_button){
		var $Next=bOBJ.$Next;
		
		// SET IMAGE
		if(!resize) $Next.find('img')[0].src=dir+'next_'+D.next_style+'.png';

		var NS=sF>D.next_max ? D.next_max : sF<D.next_min ? D.next_min:sF,
			next_pos=resize ? D.next_move_pos : D.next_pos,
			nextX=resize ? D.next_move_offsetX : D.next_offsetX,
			nextY=resize ? D.next_move_offsetY : D.next_offsetY,
			next_move_pos=D.next_move_pos,
			NW=D.ini_next_width*NS,
			NH=D.ini_next_height*NS;
		
		// SET DIMENSIONS AND POSITION NEXT BUTTON
		$Next.css({width:NW+'px', height:NH+'px'}).pos(PI, next_pos, nextX*sF, nextY*sF, NW, NH, false);
	
		// ANIMATE INTO VIEW
		if(!resize){
			var NextArgs={'transition':'none', visibility:!GAL[$.inArray(obj, GAL)+1] ? 'hidden' : 'visible'};
			NextArgs[Boxaroo.PRE+'transform']=Boxaroo.calc_transform(D.perspective, D.next_scale_out, D.next_scale_out, 0, 0, D.next_flipX_out, D.next_flipY_out, 0, 0, D.next_rotate_out);
			
			$Next.css(NextArgs).Ani({opacity:D.next_opacity_out}, SP, function(){
				// MOVEMENT ANIMATION
				if(next_pos !== next_move_pos) $Next.pos(PI, next_move_pos, D.next_move_offsetX, D.next_move_offsetY, NW, NH, D.next_movement_speed);
			});
		};
	};


	//////////
	// COUNTER
	//////////
	if(D.counter){
		var $Counter=bOBJ.$Co;

		// SET COUNTER TEXT AND KEY INDEX
		if(!resize) bOBJ.$Co[0].innerHTML='<p>'+D.counter_key+' '+($.inArray(obj,GAL)+1)+(D.counter_suffix ? ' '+D.counter_word+' '+GAL.length:'')+'</p>'; 
		
		var	co_pos=resize ? D.counter_move_pos : D.counter_pos,
			coX=resize ? D.counter_move_offsetX : D.counter_offsetX,
			coY=resize ? D.counter_move_offsetY : D.counter_offsetY,
			co_move_pos=D.counter_move_pos;
		
		// POSITION AND SIZE COUNTER
		$Counter.css({'font-size':(sF*100>D.counter_max ? D.counter_max : sF*100<D.counter_min ? D.counter_min:sF*100)+'%'})
			.pos(PI, co_pos, coX*sF, coY*sF, $Counter.outerWidth(true), $Counter.outerHeight(true), false);
	
		// ANIMATE INTO VIEW
		if(!resize){
			$Counter.css(CCA).Ani({opacity:1}, D.counter_speed_in, function(){
				// MOVEMENT ANIMATION [DIMENSIONS MUST BE RECALCULATED DUE TO PREVIOUS POSITIONING]
				if(co_pos !== co_move_pos) $Counter.pos(PI, co_move_pos, D.counter_move_offsetX*sF, D.counter_move_offsetY*sF, $Counter.outerWidth(true), $Counter.outerHeight(true), D.counter_move_speed);
			});
		};		
	};
		

	//////////
	// CAPTION
	//////////
	if(D.caption){
		var $Caption=bOBJ.$Cap;
		
		// SET THE CAPTION TEXT AND OPTIONAL GALLERY NAME
		if(!resize) $Caption[0].innerHTML=D.caption_gallery ? '<p><span class="Caption">'+D.caption_text+'</span><span class="GalleryName">'+(D.caption_gallery ? $(obj).attr('rel') : '')+'</span></p>' : '<p><span class="Caption">'+D.caption_text+'</span></p>';
		
		var	cap_X=resize ? D.caption_move_offsetX : D.cap_offsetX,
			cap_Y=resize ? D.caption_move_offsetY : D.cap_offsetY,
			cap_move_pos=D.caption_move_pos;	
			
		// SET WIDTH AND POSITION
		$Caption.css({
			'font-size':(sF*100>D.caption_max ? D.caption_max : sF*100<D.caption_min ? D.caption_min : sF*100)+'%', 
			width:D.caption_full_width ? (D.caption_pos>=18 ? Boxaroo.winW : $Caption.outerWidth(true)) : 'auto'})
			.pos(PI, resize ? D.caption_move_pos : D.caption_pos, cap_X*sF, cap_Y*sF, $Caption.outerWidth(true), $Caption.outerHeight(true), false);
			
		// ANIMATE INTO VIEW
		if(!resize){
			$Caption.css(CCA).Ani({opacity:1}, D.caption_speed_in, function(){
				// MOVEMENT ANIMATION [DIMENSIONS MUST BE RECALCULATED DUE TO PREVIOUS POSITIONING]
				if(D.caption_pos !== cap_move_pos){
					$Caption.pos(PI, cap_move_pos, D.caption_move_offsetX*sF, D.caption_move_offsetY*sF, $Caption.outerWidth(true), $Caption.outerHeight(true), D.caption_move_speed);
				};
			});
		};
	};
	


	/////////////////
	// HTML ELEMENT 1
	/////////////////
	if(D.el1){
		var $el1=bOBJ.$El1;		
		if(!resize) Boxaroo.el_html($el1, $(D.el1), D.js_el1_click);
		
		var	el1_pos=resize ? D.el1_move_pos : D.el1_pos, 
			el1X=resize ? D.el1_move_offsetX : D.el1_offsetX, 
			el1Y=resize ? D.el1_move_offsetY : D.el1_offsetY, 
			el1_move_pos=D.el1_move_pos;
		
		// POSITION AND SCALE EL1
		$el1.css({'font-size':(sF*100>D.el1_max ? D.el1_max : sF*100<D.el1_min ? D.el1_min : sF*100)+'%'})
			.pos(PI, el1_pos, el1X*sF, el1Y*sF, $el1.outerWidth(true), $el1.outerHeight(true), false);
	
		// ANIMATE EL1 INTO VIEW
		if(!resize){
			$el1.css(elA).Ani({opacity:D.el1_opacity}, D.el1_speed_in, function(){			
				// MOVEMENT ANIMATION
				if(el1_pos !== el1_move_pos) $el1.pos(PI, el1_move_pos, D.el1_move_offsetX, D.el1_move_offsetY, $el1.outerWidth(true), $el1.outerHeight(true), D.el1_move_speed);
			});
		};
	
		////////////////////////////////////////////
		// HTML ELEMENT 2 [ONLY IF HTML EL 1 EXISTS]
		////////////////////////////////////////////
		if(D.el2){
			var $el2=bOBJ.$El2;
			if(!resize) Boxaroo.el_html($el2, $(D.el2), D.js_el2_click);
			
			var	el2_pos=resize ? D.el2_move_pos : D.el2_pos, 
				el2X=resize ? D.el2_move_offsetX : D.el2_offsetX, 
				el2Y=resize ? D.el2_move_offsetY : D.el2_offsetY, 
				el2_move_pos=D.el2_move_pos;
		
			// POSITION AND SCALE EL2
			$el2.css({'font-size':(sF*100>D.el2_max ? D.el2_max : sF*100<D.el2_min ? D.el2_min : sF*100)+'%'})
				.pos(PI, el2_pos, el2X*sF, el2Y*sF, $el2.outerWidth(true), $el2.outerHeight(true), false);
		
			// ANIMATE EL2 INTO VIEW
			if(!resize){
				$el2.css(elA).Ani({opacity:D.el2_opacity}, D.el2_speed_in, function(){			
					// MOVEMENT ANIMATION
					if(el2_pos !== el2_move_pos){
						$el2.pos(PI, el2_move_pos, D.el2_move_offsetX, D.el2_move_offsetY, $el2.outerWidth(true), $el2.outerHeight(true), D.el2_move_speed);
					};
				});
			};			
				
				
			//////////////////////////////////////////////
			// HTML ELEMENT 3 [ONLY IF HTML ELS 1&2 EXIST]
			//////////////////////////////////////////////
			if(D.el3){
				var $el3=bOBJ.$El3;				
				if(!resize) Boxaroo.el_html($el3, $(D.el3), D.js_el3_click);
				
				var	el3_pos=resize ? D.el3_move_pos : D.el3_pos, 
					el3X=resize ? D.el3_move_offsetX : D.el3_offsetX, 
					el3Y=resize ? D.el3_move_offsetY : D.el3_offsetY, 
					el3_move_pos=D.el3_move_pos;
		
				// POSITION AND SCALE
				$el3.css({'font-size':(sF*100>D.el3_max ? D.el3_max : sF*100<D.el3_min ? D.el3_min : sF*100)+'%'})
					.pos(PI, el3_pos, el3X*sF, el3Y*sF, $el3.outerWidth(true), $el3.outerHeight(true), false);
		
				// ANIMATE INTO VIEW
				if(!resize){
					$el3.css(elA).Ani({opacity:D.el3_opacity}, D.el3_speed_in, function(){			
						// MOVEMENT ANIMATION
						if(el3_pos !== el3_move_pos){
							$el3.pos(PI, el3_move_pos, D.el3_move_offsetX, D.el3_move_offsetY, $el3.outerWidth(true), $el3.outerHeight(true), D.el3_move_speed);
						};
					});
				};					
			};
		};
	};
},












////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// FRAME ANIMATIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
frame_animation:function(obj,D){
	var B=Boxaroo,
		bOBJ=B.OBJ,
		TRI=B.PRE+'transform:'+B.calc_transform(D.perspective, D.scaleX, D.scaleY, D.translateX, D.translateY, D.flipX, D.flipY, D.skewX, D.skewY, D.rotate)+';',
		TRO=B.PRE+'transform:'+B.calc_transform(D.frame_perspective, D.frame_scaleX, D.frame_scaleY, D.frame_translateX, D.frame_translateY, D.frame_flipX, D.frame_flipY,D.frame_skewX, D.frame_skewY,D.frame_rotate)+';',
		BXI='box-shadow:'+D.shadowX+'px '+D.shadowY+'px '+D.shadowBlur+'px '+D.shadowSpread+'px rgba('+D.shadowColor.r+','+D.shadowColor.g+','+D.shadowColor.b+','+D.shadowOpacity+');',
		BXO='box-shadow:'+D.frame_shadowX+'px '+D.frame_shadowY+'px '+D.frame_shadowBlur+'px '+D.frame_shadowSpread+'px rgba('+D.frame_shadowColor.r+','+D.frame_shadowColor.g+','+D.frame_shadowColor.b+','+D.frame_shadowOpacity+');',
		BCI='border-color:'+D.border_color+';',
		BCO='border-color:'+D.frame_border_color+';',
		BWI='border-width:'+D.border_width+'px;',
		BWO='border-width:'+D.frame_border_width+'px;',
		multi='frame '+D.frame_speed/1000+'s 0s '+D.frame_count+' '+D.frame_direction+' forwards ease-in-out';

	// MULTIPLE CSS ANIMATIONS ON SAME ELEMENT [ MATTE COLOR ANIMATION + FRAME ANIMATION ]
	if(D.multiMatte!==null && D.multiMatte!==undefined) var multi=multi+','+D.multiMatte;

	// SETUP CSS IMAGE FILTERS
	if(Boxaroo.filters){
		var grayscale=D.grayscale, 
			content_blur=D.content_blur, 
			sepia=D.sepia, 
			contrast=D.contrast, 
			brightness=D.brightness,
			gIn=grayscale!==D.frame_grayscale ? 'grayscale('+grayscale+'%)' : '',
			gOut=grayscale!==D.frame_grayscale ? 'grayscale('+D.frame_grayscale+'%)' : '',
			bIn=content_blur!==D.frame_blur ? 'blur('+content_blur+'px)' : '',
			bOut=content_blur!==D.frame_blur ? 'blur('+D.frame_blur+'px)' : '',
			sIn=sepia!==D.frame_sepia ? 'sepia('+sepia+'%)' : '',
			sOut=sepia!==D.frame_sepia ? 'sepia('+D.frame_sepia+'%)' : '',
			conIn=contrast!==D.frame_contrast ? 'contrast('+contrast+'%)' : '',
			conOut=contrast!==D.frame_contrast ? 'contrast('+D.frame_contrast+'%)' : '',
			brIn=brightness!==D.frame_brightness ? 'brightness('+brightness+'%)' : '',
			brOut=brightness!==D.frame_brightness ? 'brightness('+D.frame_brightness+'%)' : '',
			satIn=D.saturation!==D.frame_saturation ? 'saturate('+D.saturation+'%)' : '',
			satOut=D.saturation!==D.frame_saturation ? 'saturate('+D.frame_saturation+'%)' : '',
			hueRIn=D.hue_rotate!==D.frame_hue_rotate ? 'hue-rotate('+D.hue_rotate+'deg)' : '',
			hueROut=D.hue_rotate!==D.frame_hue_rotate ? 'hue-rotate('+D.frame_hue_rotate+'deg)' : '',
			AIN=[], 
			AO=[];
			
		// BUILD FILTERS KEYFRAME STRING + SETUP FILTER OBJECT
		if(gIn!=='' && gOut!==''){ AIN.push(gIn); AO.push(gOut); };
		if(bIn!=='' && bOut!==''){ AIN.push(bIn); AO.push(bOut); };
		if(sIn!=='' && sOut!==''){ AIN.push(sIn); AO.push(sOut); };
		if(conIn!=='' && conOut!==''){ AIN.push(conIn); AO.push(conOut); };
		if(brIn!=='' && brOut!==''){ AIN.push(brIn); AO.push(brOut); };
		if(satIn!=='' && satOut!==''){ AIN.push(satIn); AO.push(satOut); };
		if(hueRIn!=='' && hueROut!==''){ AIN.push(hueRIn); AO.push(hueROut); };
		var FIL={
			In:B.PRE+'filter:'+AIN.join(' ')+';',
			Out:B.PRE+'filter:'+AO.join(' ')+';'
		};
		FIL.stat=FIL.In===FIL.Out ? false : true;
	};

	// SETUP FRAME ANIMATION FROM AND TO STRINGS
	var from=(FIL!==undefined && FIL.stat ? FIL.In:'')+(TRI!==TRO ? TRI : '')+(BCI!==BCO ? BCI : '')+(BWI!==BWO ? BWI : '')+(BXI!==BXO&&B.SDWS ? BXI : ''),
		to=(FIL!==undefined && FIL.stat ? FIL.Out:'')+(TRI!==TRO ? TRO : '')+(BCI!==BCO ? BCO : '')+(BWI!==BWO ? BWO : '')+(BXI!==BXO&&B.SDWS ? BXO : '');

	bOBJ.$LB.PSE();
	if(from!==to){
		// SETUP KEYFRAME STRING AND UPDATE
		bOBJ.$KF.html('.BoxAniC{transition:none;'+B.PRE+'animation:'+multi+';}'+'@'+B.PRE+'keyframes frame {from{'+from+'}to{'+to+'}}'); 
		bOBJ.$LB.PLY()[0].className+=' BoxAniC';
	};
},









////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// HIGHLIGHT ANIMATIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
highlight:function(obj, D){
	// COMPUTE NEW HIGHLIGHT POSITION BASED ON TRANSFORM ANIMATIONS
	var FX=D.flipX, 
		FY=D.flipY, 
		FFX=D.frame_flipX, 
		FFY=D.frame_flipY, 
		HXO=D.highlight_posX_out, 
		HXI=D.highlight_posX_in, 
		HYO=D.highlight_posY_out, 
		HYI=D.highlight_posY_in,
		
		// TRANSFORMATION COMPENSATION [ USE FALSE FOR 2ND VALUES OF HIGHLIGHT_POS TO COMPENSATE FOR 3D FLIPS ]
		GX=(FY!==FFY && !HXO) ? (FY>FFY ? FY : FFY) - (FY<FFY ? FY : FFY) : (!HXO && HXI!==HXO) ? HXI : HXO, 
		GY=(FX!==FFX && !HYO) ? (FX>FFX ? FX : FFX) - (FX<FFX ? FX : FFX) : (!HYO && HYI!==HYO) ? HYI : HYO;

	Boxaroo.OBJ.$KFHI.html('.BoxHA{'+Boxaroo.PRE+'animation:Grad '+D.highlight_speed/1000+'s '+D.frame_direction+' '+D.frame_count+';} @'+Boxaroo.PRE+'keyframes Grad{from{background-position:'+HXI+'px '+HYI+'px; opacity:'+D.frame_highlight_opacity_in+';}to{background-position:'+GX+'px '+GY+'px; opacity:'+D.frame_highlight_opacity_out+';}}');
	Boxaroo.OBJ.$HIn.PLY()[0].className+=' BoxHA';
},










////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// SPIRAL ANIMATIONS
// sV=SPIRALVERTICAL, sR=SPIRALRADIUS, sRV=SPIRALREVERSE, sC=SPIRALCYCLES, sl/st=START LEFT/TOP
////////////////////////////////////////////////////////////////////////////////////////////////////////////
spiral:function(D, speed){
	// IE7 DOESN'T SUPPORT SPIRALS 
	if(Boxaroo.msie && Boxaroo.version<8) return;

	var sV=D.spiral_vertical,
		sR=D.spiral_radius,
		sRV=D.spiral_reverse,
		sC=D.spiral_cycles,
		sl=sV ? sR-20 : sR,
		st=sV ? -20 : 0;
	
	// ANIMATE LIGHTBOX
	Boxaroo.OBJ.$LB.animate({'text-indent':9999999999103},{duration:speed, step:function(now,fx){
		var fg=sRV ? sR*(1+fx.pos) : sR*(1-fx.pos),
			g=fx.pos*sC*Math.PI,
			x=sl-sR+fg*Math.cos(g)+'px',
			y=st+fg*Math.sin(g)+'px';
		$(this).css({marginTop:sV ? x : y, marginLeft:sV ? y : x});
	},queue:false});
},











////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// SHOW PRELOADER 
////////////////////////////////////////////////////////////////////////////////////////////////////////////
show_preloader:function(obj, D){
	var bOBJ=Boxaroo.OBJ, 
		$P=bOBJ.$Pre;

	// BROWSERS THAT DON'T SUPPORT KEYFRAMES
	if(Boxaroo.TRNS){ 
		// SETUP PRELOADER ANIMATIONS
		var c1=D.preloader_color1, 
			c2=D.preloader_color2, 
			B='background-color:', 
			tS='text-shadow', 
			tR=Boxaroo.PRE+'transform:', 
			B1=B+c1, 
			B2=B+c2,
			DC='<div class="', DI='<div id="', ED='></div>', E='</div>', X=ED+DC, Y=ED+DI, Z=E+DC,
			C='class="', R='rotate(', TS='translate', S='scale(';
			
		switch(D.preloader_style){
			case 1:var DW=52,DH=65, H=DI+'fbG">'+DC+'fbG" id="fbG_01"'+X+'fbG" id="fbG_02"'+X+'fbG" id="fbG_03"'+X+'fbG" id="fbG_04"'+X+'fbG" id="fbG_05"'+X+'fbG" id="fbG_06"'+X+'fbG" id="fbG_07"'+X+'fbG" id="fbG_08"'+ED+E,C='.fbG{'+B1+';}', K='0%{'+B2+'}100%{'+B1+'}', N='fadeG';break;
			case 2:var DW=64,DH=64, H=DI+'fCG">'+DC+'fCG" id="fCG_01"'+X+'fCG" id="fCG_02"'+X+'fCG" id="fCG_03"'+X+'fCG" id="fCG_04"'+X+'fCG" id="fCG_05"'+X+'fCG" id="fCG_06"'+X+'fCG" id="fCG_07"'+X+'fCG" id="fCG_08"'+ED+E,C='.fCG{'+B1+';}', K='0%{'+B2+'}100%{'+B1+'}', N='f_fadeG';break;
			case 3:var DW=32,DH=32, H=DI+'ballG">'+DI+'ballGR">'+DC+'ballGH">'+DC+'ballG"'+ED+'</div'+ED+E, C='#ballGR{border:4px solid '+c1+';}.ballG{'+B2+';}', K='0%{'+tR+R+'0deg);}45%{'+tR+R+'180deg);}100%{'+tR+R+'360deg);}', N='ball_moveG'; break;
			case 4:var DW=250,DH=250, H=DI+'c3dG">'+DI+'c3dG_1G" '+C+'c3dG"'+Y+'c3dG_2G" '+C+'c3dG"'+Y+'c3dG_3G" '+C+'c3dG"'+Y+'c3dG_4G" '+C+'c3dG"'+Y+'c3dG_5G" '+C+'c3dG"'+Y+'c3dG_6G" '+C+'c3dG"'+Y+'c3dG_7G" '+C+'c3dG"'+Y+'c3dG_8G" '+C+'c3dG"'+ED+E,C='',K='0%{'+tR+S+'1);'+B1+'}100%{'+tR+S+'.3);'+B2+';}',N='c3dG';break;
			case 5:var DW=128,DH=128, H=DI+'ccG">'+DI+'ccG_1" '+C+'ccG"'+Y+'ccG_2" '+C+'ccG"'+Y+'ccG_3" '+C+'ccG"'+Y+'ccG_4" '+C+'ccG"'+Y+'ccG_5" '+C+'ccG"'+Y+'ccG_6" '+C+'ccG"'+Y+'ccG_7" '+C+'ccG"'+Y+'ccG_8" '+C+'ccG"'+ED+E,C='.ccG{'+B1+'}',K='0%{'+tR+S+'1);'+B1+'}100%{'+tR+S+'.3);'+B2+'}',N='ccG';break;
			case 6:var DW=256,DH=20, H=DI+'ffBG">'+DI+'ffBG_1" '+C+'ffBG"'+Y+'ffBG_2" '+C+'ffBG"'+Y+'ffBG_3" '+C+'ffBG"'+Y+'ffBG_4" '+C+'ffBG"'+ED+E,C='.ffBG{'+B1+';}',K='0%{left:0px;'+B1+';}50%{left:236px;}100%{left:0px;'+B2+';}',N='ffBG'; break;
			case 7:var DW=30,DH=70, H=DC+'bbG"><span id="bbG_1"></span><span id="bbG_2"></span><span id="bbG_3"></span'+ED,C='.bbG span{'+B1+';}',K='0%{width:14px;height:14px;'+B1+';'+tR+TS+'Y(0);}100%{width:33px;height:33px;'+B2+';'+tR+TS+'Y(-58px);}',N='bbG'; break;
			case 8:var DW=240,DH=10, H=DI+'sWg">'+DI+'sWg_1" '+C+'sWg"'+Y+'sWg_2" '+C+'sWg"'+Y+'sWg_3" '+C+'sWg"'+Y+'sWg_4" '+C+'sWg"'+Y+'sWg_5" '+C+'sWg"'+Y+'sWg_6" '+C+'sWg"'+Y+'sWg_7" '+C+'sWg"'+Y+'sWg_8" '+C+'sWg"'+ED+E,C='.sWg{'+B1+';}',K='0%{'+B1+';}100%{'+B2+';}',N='sWg'; break;
			case 9:var DW=256,DH=20, H=DI+'lPG">'+DC+'lPG"'+ED+E,C='#lPG{'+B1+';}.lPG{'+B2+';}',K='0%{margin-left:-256px;'+B1+';}100%{margin-left:256px;'+B2+'}',N='lPG';break;
			case 10:var DW=110,DH=110, H=DI+'bTG">'+DC+'bTG">L'+Z+'bTG">o'+E+DC+'bTG">a'+Z+'bTG">d'+Z+'bTG">i'+Z+'bTG">n'+Z+'bTG">g'+Z+'bTG">.'+Z+'bTG">.'+Z+'bTG">.</div'+ED+'',C='.bTG{'+tS+': '+c1+' 0 0 0;}',K='0%{'+tS+': '+c1+' 0 0 0;}50%{'+tS+': '+c1+' 0 0 20px;}100%{'+tS+': '+c2+' 0 0 0;}',N='bTG';break;
		};
		
		// COMPOSE KEYFRAME AND FULL CSS AND APPEND TO HEAD
		bOBJ.$KFP.html(C+'@'+Boxaroo.PRE+'keyframes '+N+'{'+K+'}'); 
		$P.PLY().html(H)[0].className=D.preloader_class || 'Box_Pre_'+D.skin;

	// USE GIF FOR LEGACY
	}else{		
		$P.html('<img src="'+Boxaroo.BASE_URL+'Boxaroo/images/Pre/'+D.skin+'.gif">')[0].className='Box_Pre_GIF_'+D.skin;
		var DW=$P.outerWidth(true), 
			DH=$P.outerHeight(true);
	};

	$P.css({top:(Boxaroo.winH-DW)/2+'px', left:(Boxaroo.winW-DH)/2+'px'}).Ani({opacity:1}, D.preloader_speed_in, null);
},





////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// HIDE PRELOADER
////////////////////////////////////////////////////////////////////////////////////////////////////////////
hide_preloader:function(obj, D){
	var $P=Boxaroo.OBJ.$Pre;
	$P.Ani({opacity:0}, D.preloader_speed_out, function(){ $P.html(' '); });
},







////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// REMOVE ELEMENTS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
remove_els:function(B){
	var rem=[];
	if(Boxaroo.ANI)$([B.$KF[0],B.$KFHI[0],B.$KFP[0],B.$KFM[0],B.$KFCL[0]]).html(' ');
	if(B.$C.find('img').length)	rem.push(B.$C.find('img')[0]);
	if($('#Box_Flash').length)	rem.push($('#Box_Flash')[0]);
	if($('#Box_IFrame').length)	rem.push($('#Box_IFrame')[0]);
	if($('#Box_Error').length)	rem.push($('#Box_Error')[0]);
	$(rem).remove();
},






////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// GET VIEWPORT DIMENSIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
get_viewport:function(){
	Boxaroo.winW=$win.innerWidth ? $win.innerWidth : $($win).width();
	Boxaroo.winH=$win.innerHeight ? $win.innerHeight : $($win).height();
},


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// SCALE BOXAROO TO MOBILE DEVICES
////////////////////////////////////////////////////////////////////////////////////////////////////////////
sizeMobil:function(bOBJ){
	$('#Boxaroo')[0].style.top=$($win).scrollTop()+'px';
	$([bOBJ.$O[0], bOBJ.$OT[0], bOBJ.$OP[0]]).css({width:Boxaroo.winW+5, height:Boxaroo.winH+5});
},






////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// SCALE BORDER RADIUS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
borderRAD:function(bOBJ, $content, brTR, brBR, brBL, brTL, border_width){
	// LEFT SIDE
	$([bOBJ.$High[0], bOBJ.$LB[0], bOBJ.$GL[0], bOBJ.$C[0], $content[0]])
		.css({display:'block', 
			'border-top-left-radius':brTL-border_width<0 ? 0 : brTL-border_width+'px',
			'border-bottom-left-radius':brBL-border_width<0 ? 0 : brBL-border_width+'px'});
	// RIGHT SIDE
	$([bOBJ.$High[0], bOBJ.$LB[0], bOBJ.$GR[0], bOBJ.$C[0], $content[0]])
		.css({display:'block',
			'border-top-right-radius':brTR-border_width<0 ? 0 : brTR-border_width+'px',
			'border-bottom-right-radius':brBR-border_width<0 ? 0 : brBR-border_width+'px'});
},





////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// COLOR CONVERSION METHODS USED FOR DROP SHADOW COLOR ANIMATIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
H2R:function(h,a){
	return {
		r:parseInt((Boxaroo.tHx(h)).substring(0,2),16), 
		g:parseInt((Boxaroo.tHx(h)).substring(2,4),16), 
		b:parseInt((Boxaroo.tHx(h)).substring(4,6),16),
		a:a};
},
tHx:function(h){ return(h.charAt(0)=="#") ? h.substring(1,7) : h; },








////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// NAVIGATION FLIPPING
// IF TRANSFORMS ARE SAME, CREATE FAKE INTERMEDIATE ANIMATION SO LB WILL TRANSFORM DURING NAV
// [ WHEN SETTING/FRAME_SETTING ARE EQUAL - EG FLIP:20,0 FRAME_FLIP:20,0 ]
////////////////////////////////////////////////////////////////////////////////////////////////////////////
nav_flip:function(obj, D, N){
	var e=($.inArray(obj, D.GALS)%2===0),
		a=360,
		b=180,
		FX=N.flipX,
		FY=N.flipY,
		R=N.rotate,
		KX=N.skewX,
		KY=N.skewY;
	return Boxaroo.calc_transform(N.perspective, N.scaleX, N.scaleY, N.translateX, N.translateY, FX===N.frame_flipX && FX!==0 ? e ? a+FX : FX : FX, FY===N.frame_flipY && FY!==0 ? e ? a+FY : FY : FY, KX===N.frame_skewX && KX!==0 ? e ? -(b+KX) : b+KX : KX, KY===N.frame_skewY && KY!==0 ? e ? -(b+KY) : b+KY : KY, R===N.frame_rotate && R!==0 ? e ? -(a+R) : a+R : R);
},





////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// CALCULATE 2D/3D TRANSFORM STRING
////////////////////////////////////////////////////////////////////////////////////////////////////////////
calc_transform:function(P, SX, SY, TRX, TRY, FX, FY, KX, KY, R){
	return Boxaroo.TRFM ? 'perspective('+P+'px) scale('+SX+','+SY+') translate3d('+TRX+'px,'+TRY+'px,0px) rotateX('+FX+'deg) rotateY('+FY+'deg) skew('+KX+'deg,'+KY+'deg) rotate('+R+'deg)':'scale('+SX+','+SY+') translateX('+TRX+'px) translateY('+TRY+'px) skew('+KX+'deg,'+KY+'deg) rotate('+R+'deg)';
},




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// GET TRANSFORM STRING
/* ALLOW FOR FRAME NAV OVERRIDE (SETTING AND F_SETTING TO BE THE SAME NUMBER) WILL ANIMATE THAT TRANSFORM DURING NAV ONLY */
////////////////////////////////////////////////////////////////////////////////////////////////////////////
get_transform:function(D, Nav){
	var c=Nav&&D.frame_nav_override,
		FX=D.flipX,
		FY=D.flipY,
		R=D.rotate,
		KX=D.skewX,
		KY=D.skewY,
		SX=D.scaleX,
		SY=D.scaleY;
	return Boxaroo.calc_transform(D.perspective, c ? SX===D.frame_scaleX && SX!==1 ? 1 : SX : SX, c ? SY===D.frame_scaleY && SY!==1 ? 1 : SY : SY, D.translateX, D.translateY, c ? FX===D.frame_flipX && FX!==0 ? 0 : FX : FX, c ? FY===D.frame_flipY && FY!==0 ? 0 : FY : FY, c ? KX===D.frame_skewX && KX!==0 ? 0 : KX : KX, c ? KY===D.frame_skewY && KY!==0 ? 0 : KY : KY, c ? R===D.frame_rotate && R!==0 ? 0 : D.rotate:R);
},








////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// JAVASCRIPT HOOKS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
jsHook:function(hook){ 
	if(typeof $win[hook]==='function') $win[hook].apply(Boxaroo.OBJ); 
},






/////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// VALIDATE USER OPTIONS AND SETUP CONDITIONAL SETTINGS
/////////////////////////////////////////////////////////////////////////////////////////
user_options:function(obj,d){
	obj.data($.extend({}, d, {
		skin:d.skin.pF(),
		bg_speed_in:d.bg_speed.split(',')[0].pF(), 
		bg_speed_out:d.bg_speed.split(',')[1].pF(), 
		bg_speed_nav:d.bg_speed.split(',')[2].pF(), 
		bg_color_speed:d.bg_speed.split(',')[3].pF()/1000, 
		bg_opacity:d.bg_opacity.pF()===1 ? 0.999 : d.bg_opacity.pF(), 
		bg_tile_opacity:d.bg_tile_opacity.pF()===1 ? 0.999 : d.bg_tile_opacity.pF(), 
		bg_pic_opacity:d.bg_pic_opacity.pF()===1 ? 0.999 : d.bg_pic_opacity.pF(),
		content_sizeX:d.content_size.split(',')[0].pF(), 
		content_sizeY:d.content_size.split(',')[1].pF(), 
		preloader_speed_in:d.preloader_speed.split(',')[0].pF(), 
		preloader_speed_out:d.preloader_speed.split(',')[1].pF(), 
		overlay_close:d.overlay_close.isB(),
		perspective:d.perspective.pF(), 
		rotate:d.rotate.pF(), 
		translateX:d.translate.split(',')[0].pF(), 
		translateY:d.translate.split(',')[1].pF(),
		flipX:d.flip.split(',')[0].pF(), 
		flipY:d.flip.split(',')[1].pF(), 
		skewX:d.skew.split(',')[0].pF(), 
		skewY:d.skew.split(',')[1].pF(), 
		box_speed_in:d.box_speed.split(',')[0].pF(), 
		box_speed_out:d.box_speed.split(',')[1].pF(), 
		box_nav_speed:d.box_speed.split(',')[2].pF(), 		
		content_speed_in:d.content_speed.split(',')[0].pF(), 
		content_speed_out:d.content_speed.split(',')[1].pF(), 
		content_nav_speed:d.content_speed.split(',')[2].pF(),
		gradient_left_opacity:d.gradient_nav_opacity.split(',')[0].pF(), 
		gradient_right_opacity:d.gradient_nav_opacity.split(',')[1].pF(), 
		gradient_left_speed:d.gradient_nav_speed.split(',')[0].pF(), 
		gradient_right_speed:d.gradient_nav_speed.split(',')[1].pF(), 
		frame_flipX:d.frame_flip.split(',')[0].pF(),
		frame_flipY:d.frame_flip.split(',')[1].pF(),	
		frame_perspective:d.frame_perspective.pF(), 
		frame_rotate:d.frame_rotate.pF(), 
		frame_skewX:d.frame_skew.split(',')[0].pF(), 
		frame_skewY:d.frame_skew.split(',')[1].pF(),
		frame_translateX:d.frame_translate.split(',')[0].pF(), 
		frame_translateY:d.frame_translate.split(',')[1].pF(),
		scaleX:d.scale.split(',')[0].pF(), 
		scaleY:d.scale.split(',')[1].pF(), 
		frame_scaleX:d.frame_scale.split(',')[0].pF(), 
		frame_scaleY:d.frame_scale.split(',')[1].pF(),
		brTL:d.border_radius.split(',')[0].pF(), 
		brTR:d.border_radius.split(',')[1].pF(), 
		brBR:d.border_radius.split(',')[2].pF(), 
		brBL:d.border_radius.split(',')[3].pF(),		
		border_width:d.border.split(',')[0].pF(), 
		frame_border_width:d.frame_border.split(',')[0].pF(), 
		border_color:d.border.split(',')[1].fixColor(),
		shadowX:d.drop_shadow.split(',')[0].pF(), 
		shadowY:d.drop_shadow.split(',')[1].pF(), 
		shadowBlur:d.drop_shadow.split(',')[2].pF(), 
		shadowSpread:d.drop_shadow.split(',')[3].pF(), 
		shadowOpacity:d.drop_shadow.split(',')[5].pF(),
		frame_shadowX:d.frame_drop_shadow.split(',')[0].pF(), 
		frame_shadowY:d.frame_drop_shadow.split(',')[1].pF(), 
		frame_shadowBlur:d.frame_drop_shadow.split(',')[2].pF(),
		frame_shadowSpread:d.frame_drop_shadow.split(',')[3].pF(), 
		frame_shadowOpacity:d.frame_drop_shadow.split(',')[5].pF(), 
		frame_shadowColor:Boxaroo.H2R(d.frame_drop_shadow.split(',')[4].fixColor(), d.frame_shadowOpacity), 
		shadowColor:Boxaroo.H2R(d.drop_shadow.split(',')[4].fixColor(), d.shadowOpacity),
		close_movement_speed:d.nav_buttons_m_speed.split(',')[0].pF(), 
		prev_movement_speed:d.nav_buttons_m_speed.split(',')[1].pF(), 
		next_movement_speed:d.nav_buttons_m_speed.split(',')[2].pF(), 
		close_offsetX:d.nav_buttons_offsets.removeWS().split('||')[0].split(',')[0].pF(), 
		close_offsetY:d.nav_buttons_offsets.removeWS().split('||')[0].split(',')[1].pF(), 
		prev_offsetX:d.nav_buttons_offsets.removeWS().split('||')[1].split(',')[0].pF(), 
		prev_offsetY:d.nav_buttons_offsets.removeWS().split('||')[1].split(',')[1].pF(), 
		next_offsetX:d.nav_buttons_offsets.removeWS().split('||')[2].split(',')[0].pF(), 
		next_offsetY:d.nav_buttons_offsets.removeWS().split('||')[2].split(',')[1].pF(), 
		close_move_offsetX:d.nav_buttons_m_offsets.split('||')[0].split(',')[0].pF(), 
		close_move_offsetY:d.nav_buttons_m_offsets.split('||')[0].split(',')[1].pF(), 
		prev_move_offsetX:d.nav_buttons_m_offsets.split('||')[1].split(',')[0].pF(), 
		prev_move_offsetY:d.nav_buttons_m_offsets.split('||')[1].split(',')[1].pF(),
		next_move_offsetX:d.nav_buttons_m_offsets.split('||')[2].split(',')[0].pF(), 
		next_move_offsetY:d.nav_buttons_m_offsets.split('||')[2].split(',')[1].pF(), 
		close_opacity_in:d.nav_buttons_opacity.removeWS().split('||')[0].split(',')[1].pF(), 
		close_opacity_out:d.nav_buttons_opacity.removeWS().split('||')[0].split(',')[0].pF(), 
		prev_opacity_in:d.nav_buttons_opacity.removeWS().split('||')[1].split(',')[1].pF(), 
		prev_opacity_out:d.nav_buttons_opacity.removeWS().split('||')[1].split(',')[0].pF(),
		next_opacity_in:d.nav_buttons_opacity.removeWS().split('||')[2].split(',')[1].pF(), 
		next_opacity_out:d.nav_buttons_opacity.removeWS().split('||')[2].split(',')[0].pF(), 
		el1_move_offsetX:d.html_els_m_offsets.split('||')[0].split(',')[0].pF(), 
		el1_move_offsetY:d.html_els_m_offsets.split('||')[0].split(',')[1].pF(),	
		el2_move_offsetX:d.html_els_m_offsets.split('||')[1].split(',')[0].pF(), 
		el2_move_offsetY:d.html_els_m_offsets.split('||')[1].split(',')[1].pF(), 
		el3_move_offsetX:d.html_els_m_offsets.split('||')[2].split(',')[0].pF(), 
		el3_move_offsetY:d.html_els_m_offsets.split('||')[2].split(',')[1].pF(),
		el1_move_speed:d.html_els_m_speed.split(',')[0].pF(), 
		el2_move_speed:d.html_els_m_speed.split(',')[1].pF(), 
		el3_move_speed:d.html_els_m_speed.split(',')[2].pF(),
		el1_min:d.html_els_ranges.split('||')[0].split(',')[0].pF(), 
		el1_max:d.html_els_ranges.split('||')[0].split(',')[1].pF(), 
		el2_min:d.html_els_ranges.split('||')[1].split(',')[0].pF(), 
		el2_max:d.html_els_ranges.split('||')[1].split(',')[1].pF(), 
		el3_min:d.html_els_ranges.split('||')[2].split(',')[0].pF(), 
		el3_max:d.html_els_ranges.split('||')[2].split(',')[1].pF(), 
		el1_opacity:d.html_els_opacity.split(',')[0].pF(), 
		el2_opacity:d.html_els_opacity.split(',')[1].pF(), 
		el3_opacity:d.html_els_opacity.split(',')[2].pF(),
		el1_speed_in:d.html_els_speed.split('||')[0].split(',')[0].pF(), 
		el1_speed_out:d.html_els_speed.split('||')[0].split(',')[1].pF(), 
		el2_speed_in:d.html_els_speed.split('||')[1].split(',')[0].pF(), 
		el2_speed_out:d.html_els_speed.split('||')[1].split(',')[1].pF(), 
		el3_speed_in:d.html_els_speed.split('||')[2].split(',')[0].pF(), 
		el3_speed_out:d.html_els_speed.split('||')[2].split(',')[1].pF(),
		el1_offsetX:d.html_els_offsets.split('||')[0].split(',')[0].pF(), 
		el1_offsetY:d.html_els_offsets.split('||')[0].split(',')[1].pF(), 
		el2_offsetX:d.html_els_offsets.split('||')[1].split(',')[0].pF(), 
		el2_offsetY:d.html_els_offsets.split('||')[1].split(',')[1].pF(), 
		el3_offsetX:d.html_els_offsets.split('||')[2].split(',')[0].pF(), 
		el3_offsetY:d.html_els_offsets.split('||')[2].split(',')[1].pF(),
		counter_offsetX:d.counter_offsets.split(',')[0].pF(), 
		counter_offsetY:d.counter_offsets.split(',')[1].pF(), 
		counter_move_offsetX:d.counter_m_offsets.split(',')[0].pF(), 
		counter_move_offsetY:d.counter_m_offsets.split(',')[1].pF(), 
		cap_offsetX:d.caption_offsets.split(',')[0].pF(), 
		cap_offsetY:d.caption_offsets.split(',')[1].pF(), 
		caption_move_offsetX:d.caption_m_offsets.split(',')[0].pF(), 
		caption_move_offsetY:d.caption_m_offsets.split(',')[1].pF(), 
		counter_min:d.counter_ranges.split(',')[0].pF(), 
		counter_max:d.counter_ranges.split(',')[1].pF(), 
		counter_speed_in:d.counter_speed.split(',')[0].pF(), 
		counter_speed_out:d.counter_speed.split(',')[1].pF(), 
		caption_min:d.caption_ranges.split(',')[0].pF(), 
		caption_max:d.caption_ranges.split(',')[1].pF(), 
		caption_speed_in:d.caption_speed.split(',')[0].pF(), 
		close_style:d.nav_style.split(',')[0].pF(), 
		prev_style:d.nav_style.split(',')[1].pF(), 
		next_style:d.nav_style.split(',')[2].pF(),
		close_hover_speed_in:d.nav_hover_speed.removeWS().split('||')[0].split(',')[0].pF(), 
		close_hover_speed_out:d.nav_hover_speed.removeWS().split('||')[0].split(',')[1].pF(), 
		prev_hover_speed_in:d.nav_hover_speed.removeWS().split('||')[1].split(',')[0].pF(),		
		prev_hover_speed_out:d.nav_hover_speed.removeWS().split('||')[1].split(',')[1].pF(), 
		next_hover_speed_in:d.nav_hover_speed.removeWS().split('||')[2].split(',')[0].pF(), 
		next_hover_speed_out:d.nav_hover_speed.removeWS().split('||')[2].split(',')[1].pF(),		
		hover_speed_in:d.nav_hover_speed.removeWS().split('||')[2].split(',')[0].pF(), 
		hover_speed_out:d.nav_hover_speed.removeWS().split('||')[2].split(',')[0].pF(),		
		ini_close_width:d.nav_buttons_dimensions.split('||')[0].split(',')[0].pF(), 
		ini_close_height:d.nav_buttons_dimensions.split('||')[0].split(',')[1].pF(), 
		ini_prev_width:d.nav_buttons_dimensions.split('||')[1].split(',')[0].pF(), 
		ini_prev_height:d.nav_buttons_dimensions.split('||')[1].split(',')[1].pF(), 
		ini_next_width:d.nav_buttons_dimensions.split('||')[2].split(',')[0].pF(), 
		ini_next_height:d.nav_buttons_dimensions.split('||')[2].split(',')[1].pF(),		
		counter_move_speed:d.counter_m_speed.pF(), 
		caption_move_speed:d.caption_m_speed.pF(),
		matte_clr_speed:d.matte_clr_speed.pF()/1000, 
		highlight_opacity_1:d.highlight_opacity.split(',')[0].pF(), 
		highlight_opacity_2:d.highlight_opacity.split(',')[1].pF(), 
		highlight_opacity_3:d.highlight_opacity.split(',')[2].pF(), 
		highlight_stop_1:d.highlight_stops.split(',')[0].pF(), 
		highlight_stop_2:d.highlight_stops.split(',')[1].pF(), 
		highlight_stop_3:d.highlight_stops.split(',')[2].pF(), 
		highlight_width:d.highlight_size.split(',')[0].pF(), 
		highlight_height:d.highlight_size.split(',')[1].pF(),
		frame_highlight_opacity_in:d.highlight_frame_opacity.split(',')[0].pF(),
		frame_highlight_opacity_out:d.highlight_frame_opacity.split(',')[1].pF(), 
		close_scale_in:d.nav_button_scale.split('||')[0].split(',')[1].pF(), 
		close_scale_out:d.nav_button_scale.split('||')[0].split(',')[0].pF(), 
		prev_scale_in:d.nav_button_scale.split('||')[1].split(',')[1].pF(), 
		prev_scale_out:d.nav_button_scale.split('||')[1].split(',')[0].pF(),
		next_scale_in:d.nav_button_scale.split('||')[2].split(',')[1].pF(), 
		next_scale_out:d.nav_button_scale.split('||')[2].split(',')[0].pF(),
		spiral_speed_in:d.spiral_speed.split(',')[0].pF(), 
		spiral_speed_out:d.spiral_speed.split(',')[1].pF(), 
		spiral_speed_nav:d.spiral_speed.split(',')[2].pF(), 
		spiral_radius:d.spiral_control.split(',')[0].pF(),
		spiral_cycles:d.spiral_control.split(',')[1].pF(),
		spiral_open:d.spiral.toLowerCase().removeWS().split(',')[0].isB(), 
		spiral_exit:d.spiral.toLowerCase().removeWS().split(',')[1].isB(), 
		spiral_nav:d.spiral.toLowerCase().removeWS().split(',')[2].isB(), 
		spiral_reverse:d.spiral_direction.toLowerCase().removeWS().split(',')[0].isB(), 
		spiral_vertical:d.spiral_direction.toLowerCase().removeWS().split(',')[1].isB(), 
		min_width:d.min_dimensions.split(',')[0].pF(), 
		min_height:d.min_dimensions.split(',')[1].pF(), 
		bufferX:d.edge_buffers.split(',')[0].pF(), 
		bufferY:d.edge_buffers.split(',')[1].pF(), 
		nav_speed:d.nav_speed.pF(), 
		close_min:d.nav_buttons_ranges.removeWS().split('||')[0].split(',')[0].pF()/100, 
		close_max:d.nav_buttons_ranges.removeWS().split('||')[0].split(',')[1].pF()/100, 
		prev_min:d.nav_buttons_ranges.removeWS().split('||')[1].split(',')[0].pF()/100, 
		prev_max:d.nav_buttons_ranges.removeWS().split('||')[1].split(',')[1].pF()/100,
		next_min:d.nav_buttons_ranges.removeWS().split('||')[2].split(',')[0].pF()/100, 
		next_max:d.nav_buttons_ranges.removeWS().split('||')[2].split(',')[1].pF()/100, 
		close_button:d.nav_buttons.removeWS().split(',')[0].isB(), 
		prev_button:d.nav_buttons.removeWS().split(',')[1].isB(), 
		next_button:d.nav_buttons.removeWS().split(',')[2].isB(), 
		close_pos:d.nav_pos.split('||')[0].split(',')[0].pF(), 
		prev_pos:d.nav_pos.split('||')[0].split(',')[1].pF(), 
		next_pos:d.nav_pos.split('||')[0].split(',')[2].pF(), 
		close_move_pos:d.nav_pos.split('||')[1].split(',')[0].pF(), 
		prev_move_pos:d.nav_pos.split('||')[1].split(',')[1].pF(), 
		next_move_pos:d.nav_pos.split('||')[1].split(',')[2].pF(), 
		close_rotate_in:d.nav_button_rotate.split('||')[0].split(',')[1].pF(), 
		close_rotate_out:d.nav_button_rotate.split('||')[0].split(',')[0].pF(), 
		prev_rotate_in:d.nav_button_rotate.split('||')[1].split(',')[1].pF(), 
		prev_rotate_out:d.nav_button_rotate.split('||')[1].split(',')[0].pF(),
		next_rotate_in:d.nav_button_rotate.split('||')[2].split(',')[1].pF(), 
		next_rotate_out:d.nav_button_rotate.split('||')[2].split(',')[0].pF(),
		close_flipX_in:d.nav_button_flipX.split('||')[0].split(',')[1].pF(), 
		close_flipX_out:d.nav_button_flipX.split('||')[0].split(',')[0].pF(), 
		prev_flipX_in:d.nav_button_flipX.split('||')[1].split(',')[1].pF(), 
		prev_flipX_out:d.nav_button_flipX.split('||')[1].split(',')[0].pF(),
		next_flipX_in:d.nav_button_flipX.split('||')[2].split(',')[1].pF(), 
		next_flipX_out:d.nav_button_flipX.split('||')[2].split(',')[0].pF(), 
		close_flipY_in:d.nav_button_flipY.split('||')[0].split(',')[1].pF(), 
		close_flipY_out:d.nav_button_flipY.split('||')[0].split(',')[0].pF(),
		prev_flipY_in:d.nav_button_flipY.split('||')[1].split(',')[1].pF(), 
		prev_flipY_out:d.nav_button_flipY.split('||')[1].split(',')[0].pF(), 
		next_flipY_in:d.nav_button_flipY.split('||')[2].split(',')[1].pF(), 
		next_flipY_out:d.nav_button_flipY.split('||')[2].split(',')[0].pF(),		
		el1_pos:d.html_els_pos.split('||')[0].split(',')[0].pF(), 
		el2_pos:d.html_els_pos.split('||')[0].split(',')[1].pF(), 
		el3_pos:d.html_els_pos.split('||')[0].split(',')[2].pF(),
		el1_move_pos:d.html_els_pos.split('||')[1].split(',')[0].pF(), 
		el2_move_pos:d.html_els_pos.split('||')[1].split(',')[1].pF(), 
		el3_move_pos:d.html_els_pos.split('||')[1].split(',')[2].pF(),
		counter_pos:d.counter_pos.split(',')[0].pF(), 
		counter_move_pos:d.counter_pos.split(',')[1].pF(),
		caption_pos:d.caption_pos.split(',')[0].pF(), 
		caption_move_pos:d.caption_pos.split(',')[1].pF(),
		content_blur:d.content_blur.pF(), 
		frame_blur:d.frame_content_blur.pF(), 
		grayscale:d.grayscale.pF(), 
		frame_grayscale:d.frame_grayscale.pF(), 
		sepia:d.sepia.pF(), 
		frame_sepia:d.frame_sepia.pF(), 
		contrast:d.contrast.pF(), 
		frame_contrast:d.frame_contrast.pF(), 
		brightness:d.brightness.pF(), 
		frame_brightness:d.frame_brightness.pF(), 
		hue_rotate:d.hue_rotate.pF(), 
		frame_hue_rotate:d.frame_hue_rotate.pF(), 
		saturation:d.saturation.pF(), 
		frame_saturation:d.frame_saturation.pF(), 
		bgclrs:d.bg_color.split(','), 
		mclrs:d.matte_color.split(','),
		counter_suffix:d.counter_control.split(',')[0].isB(), 		
		counter_key:d.counter_control.split(',')[1], 
		counter_word:d.counter_control.split(',')[2],
		lightbox_effect_in:d.lightbox_effect.split(',')[0], 
		lightbox_effect_out:d.lightbox_effect.split(',')[1],
		ssc_color_in:d.slideshow_container_color.split(',')[0].fixColor(), 
		ssc_color_out:d.slideshow_container_color.split(',')[1].fixColor(), 
		ss_counter_color_in:d.slideshow_counter_color.split(',')[0].fixColor(), 
		ss_counter_color_out:d.slideshow_counter_color.split(',')[1].fixColor(),
		slideshow:d.slideshow.split(',')[0].isB(), 
		slideshow_counter:d.slideshow.split(',')[1].isB(), 
		highlight_posX_in:d.highlight_pos.split('||')[0].split(',')[0].pF(), 
		highlight_posY_in:d.highlight_pos.split('||')[0].split(',')[1].pF(),	
		highlight_color1:d.highlight_color.split(',')[0].fixColor(), 
		highlight_color2:d.highlight_color.split(',')[1].fixColor(), 
		highlight_color3:d.highlight_color.split(',')[2].fixColor(), 
		preloader_style:d.preloader_style.pF(), 
		preloader_color1:d.preloader_color.split(',')[0].fixColor(), 
		preloader_color2:d.preloader_color.split(',')[1].fixColor(),
		lightbox_entrance:d.lightbox_movement.split(',')[0].toLowerCase(), 
		lightbox_exit:d.lightbox_movement.split(',')[1].toLowerCase(),
		gradient_nav_left_color:d.gradient_nav_color.split(',')[0].fixColor(), 
		gradient_nav_right_color:d.gradient_nav_color.split(',')[1].fixColor(), 
		frame_border_color:d.frame_border.split(',')[1].fixColor(),
		scrollbarX:d.scrollbars.split(',')[0].isB(), 
		scrollbarY:d.scrollbars.split(',')[1].isB(), 		
		scale_border_width:d.scale_border.split(',')[0].isB(), 
		scale_border_radius:d.scale_border.split(',')[1].isB(),
		caption_full_width:d.caption_control.split(',')[0].isB(), 
		caption_gallery:d.caption_control.split(',')[1].isB(), 
		highlight_posX_out:d.highlight_pos.split('||')[1].split(',')[0]==="false" ? false : d.highlight_pos.split('||')[1].split(',')[0].pF(), 
		highlight_posY_out:d.highlight_pos.split('||')[1].split(',')[1]==="false" ? false : d.highlight_pos.split('||')[1].split(',')[1].pF(),
		el1:d.html_els.split(',')[0]==="false" ? false:d.html_els.split(',')[0].fixColor(), 
		el2:d.html_els.split(',')[1]==="false" ? false:d.html_els.split(',')[1].fixColor(), 
		el3:d.html_els.split(',')[2]==="false" ? false:d.html_els.split(',')[2].fixColor(),		
		highlight_speed:d.highlight_speed!==false && d.highlight_speed!==null ? d.highlight_speed.pF() : d.frame_speed.pF(),
		matte_bg:d.matte_bg!==false && d.matte_bg!==null ? !isNaN(d.matte_bg) ? d.matte_bg : d.matte_bg.pF() : false,
		autoplay:d.autoplay.isB(), 
		loop:d.loop.isB(),
		matte_top:d.matte_size.split(',')[0].pF(), 
		matte_right:d.matte_size.split(',')[1].pF(), 
		matte_bottom:d.matte_size.split(',')[2].pF(), 
		matte_left:d.matte_size.split(',')[3].pF(),
		auto_advance:d.auto_advance.isB(),
		boost_phone:d.boostmobile.split(',')[0].isB(),
		boost_tablet:d.boostmobile.split(',')[0].isB(), 
		gradient_nav:d.gradient_nav.isB(),
		frame:d.frame_animation.isB(), 
		mousewheel:d.mousewheel_nav.isB(), 
		vertical_nav:d.nav_vertical.isB(),
		full_size:d.full_size.isB(), 
		touch:d.touch_events.isB(), 
		virtual_mouse:d.vm_events.isB(), 
		scale_shadow:d.scale_shadow.isB(), 
		small_EXT:d.size_ext.split(',')[0]==='null'?null:d.size_ext.split(',')[0], 
		medium_EXT:d.size_ext.split(',')[1]==='null'?null:d.size_ext.split(',')[1],
		highlight_type:d.highlight_type===false||d.highlight_type==="false"?false:d.highlight_type,
		scale_matte:d.scale_matte===true||d.scale_matte==="true"?true:false, 
		frame_nav_override:d.frame_nav_override==='true'||d.frame_nav_override===true?true:false,
		call_on_start:d.call_on_start===false||d.call_on_start==="false"?false:true, 
		video_color:d.video_color.replace('#',' ').removeWS(),		
		caption_text:obj[0].getAttribute('title')
	}));


	/////////////////////////////////////
	// SET READ REFERENCE TO UPDATED DATA
	/////////////////////////////////////
	var d=obj.data();

	///////////////////////////////////////////////////////////////////
	// CONTENT FILE TYPE BASED ON EXTENSION [ DEVICE-SPECIFIC CONTENT ]
	///////////////////////////////////////////////////////////////////
	var	URL=obj.parents('a:first')[0].href.removeWS(), 
		fEXT=URL.substring(URL.length,URL.length-4), 
		small_EXT=fEXT;	

	if(/\.(?:jpg|jpeg|gif|png|tif|tiff|bmp)$/i.test(URL)){ 
		obj.data('ConTYP','image');
	}else if(URL.indexOf('vimeo')!==-1){ 
		var vid=URL.replace('vimeo:',' ').removeWS().split(',');
		obj.data({ConTYP:'video', 'ConSRC':vid[0], 'vW':vid[1].pF(), 'vH':vid[2].pF()});
	}else if(/\.(?:flv|swf)$/i.test(URL)){ 
		obj.data('ConTYP','flash'); 
	};


	/////////////////////////////////////////////
	// SETUP GALLERIES [ AFTER ASSIGNED TO DATA ]
	/////////////////////////////////////////////
	if(obj.is('[rel]')){
		var SET=$('[rel="'+obj.attr('rel')+'"]');
		for(var i=0; i<SET.length; ++i) $.data(SET[i],'GALS',SET); 
	}else{ 
		obj.data({GALS:obj, caption_gallery:false}); 
	};


	//////////////////////////////////
	// TABLET AND PHONE CONSIDERATIONS
	//////////////////////////////////
	if(Boxaroo.isTablet || Boxaroo.isMobile){
		////////////
		// I. PHONES
		////////////
		if(Boxaroo.isMobile){
			// SMALL FILE EXT
			if(d.conTYP==='image' && d.small_EXT !== null && d.small_EXT !== undefined) var small_EXT=d.small_EXT;
			
			obj.data({ 
				min_width:0, 
				min_height:0, 
				bufferX:5, 
				bufferY:5, 
				gradient_nav:true, 
				frame:false, 
				full_size:false, 
				touch:true, 
				key_nav:false, 
				overlay_close:true, 
				mousewheel:false, 
				counter:false, 
				caption:false, 
				close_button:false, 
				prev_button:false, 
				next_button:false,
				el1:false,
				el2:false,
				el3:false,
				FX:0,
				FY:0,
				rot:0,
				KX:0,
				KY:0,
				translateX:0,
				translateY:0,
				scaleX:1,
				scaleY:1, 
				highlight_posX_out:false ? false : obj.data().highlight_posX_out*.25, 
				highlight_posY_out:false ? false : obj.data().highlight_posY_out*.10,
				matte_top:d.matte_top*0.25, 
				matte_right:d.matte_right*0.25, 
				matte_bottom:d.matte_bottom*0.25, 
				matte_left:d.matte_left*0.25 
			});

			// MAKE OVERLAYS MATCH SCREEN DIMENSIONS + SMALL BUFFER
			$([Boxaroo.OBJ.$O[0], Boxaroo.OBJ.$OT[0], Boxaroo.OBJ.$OP[0]]).css({width:Boxaroo.winW+5, height:Boxaroo.winH+5});
			
			// BOOST PERFORMANCE FOR MOBILE DEVICES
			if(d.boost_phone){ 
				obj.data({ 
					highlight_type:false, 
					frame:false, 
					matte_bg:false 
				});
				
				Boxaroo.SDWS=false; 
				d.mclrs.length=1;  
				d.bgclrs.length=1;				
			};

		//////////////
		// II. TABLETS
		//////////////
		}else{
			// MEDIUM FILE EXT
			if(d.ConTYP==='image' && d.medium_EXT !== null && d.medium_EXT !== undefined) var small_EXT=d.medium_EXT;

			var tabS=d.nav_mobile_size, 
				cl_sz=tabS.split(',')[0], 
				pr_sz=tabS.split(',')[1], 
				nx_sz=tabS.split(',')[2];

			// DISABLE FEATURES NOT NEEDED ON TABLETS [ SCALE NAV BUTTONS BASED ON NAV_MOBILE_SIZE FACTOR ]
			obj.data({ 
				mousewheel:false, 
				frame_border_width:d.border_width, 
				frame_border_color:d.border_color,
				close_scale_in:cl_sz!==1 ? d.nav_button_scale.split('||')[0].split(',')[1].pF()*cl_sz : 1, 
				close_scale_out:cl_sz!==1 ? d.nav_button_scale.split('||')[0].split(',')[0].pF()*cl_sz : 1, 
				prev_scale_in:pr_sz!==1 ? d.nav_button_scale.split('||')[1].split(',')[1].pF()*pr_sz : 1, 
				prev_scale_out:pr_sz!==1 ? d.nav_button_scale.split('||')[1].split(',')[0].pF()*pr_sz : 1, 
				next_scale_in:nx_sz!==1 ? d.nav_button_scale.split('||')[2].split(',')[1].pF()*nx_sz : 1,
				next_scale_out:nx_sz!==1 ? d.nav_button_scale.split('||')[2].split(',')[0].pF()*nx_sz : 1		
			});

			// BOOST PERFORMANCE FOR TABLETS
			if(d.boost_tablet){
				obj.data({ 
					highlight_type:false, 
					frame:false, 
					matte_bg:false
				});
				
				Boxaroo.SDWS=false; 
				d.mclrs.length=1;  
				d.bgclrs.length=1;
			};
		};
		
		// APPLY FILE EXTENSION
		if(small_EXT!==fEXT) var fEXT=small_EXT+fEXT;
	};
	
	
	
	/////////////
	// UPDATE SRC
	/////////////
	if(d.ConTYP==='image') obj.data('SRC',URL.substring(0,URL.length-4)+fEXT);



	////////////////////////////////////////////////////////////////////////////////
	// CONDITIONAL SETTINGS [ IF USER SELECTS CERTAIN OPTIONS, OTHERS SHOULD APPLY ]
	////////////////////////////////////////////////////////////////////////////////
	// ENABLE VM IF TOUCH IS ENABLED
	if(d.touch) obj.data('virtual_mouse',true);

	// DISABLE ALL SCALING IF SCALING IS OFF
	if(!d.scaling){
		obj.data({
			scale_border_width:false, 
			scale_border_radius:false, 
			scale_shadow:false
		});
	};

	// DISABLE CERTAIN EVENTS WITH SLIDESHOWS
	if(d.slideshow){
		obj.data({
			key_nav:false, 
			touch:false, 
			virtual_mouse:false, 
			gradient_nav:false, 
			mousewheel:false 
		});
	};
	
	// BROWSERS THAT DON'T SUPPORT BACKGROUND-SIZE COVER
	if(!Boxaroo.bgSize) Boxaroo.OBJ.$OP.css({'min-width':'100%', 'min-height':'100%'});
	
	// SET THE IMAGE AS BACKGROUND WITH FULL_SIZE
	if(d.full_size) obj.data({bg_pic:d.ConTYP==='image' ? true : d.bg_pic});
	
	// SPECIAL FLASH AND VIDEO SETTINGS
	if(d.ConTYP==='video' || d.ConTYP==='flash'){
		obj.data({
			highlight_type:false, 
			full_size:false, 
			mousewheel:false, 
			gradient_nav:false, 
			brTL:0, brTR:0, brBL:0, brBR:0, 
			key_nav:false
		});
		
		// DISABLE LOOPING FOR AUTO-ADVANCED VIDS
		if(d.auto_advance) obj.data('loop',false);

		// SAFARI CAN'T HANDLE TRANSFORMS AND FLASH
		if(d.ConTYP==='flash' && Boxaroo.safari){
			obj.data({
				FX:0, FY:0, 
				frame_flipX:0, 
				frame_flipY:0
			});
		};
	};
	
	// DISABLE HIGHLIGHTS +GNAV WITHOUT GRADIENTS SUPPORT
	if(!Boxaroo.GRDT){
		obj.data({
			highlight_type:false, 
			gradient_nav:false
		});
	};
	
	// IF COMPONENT MOVE POSITIONS MATCH, MAKE APPROPRIATE OFFSETS MATCH [ TO AVOID ONRESIZE POSITION ERRORS ]
	if(d.close_pos===d.close_move_pos) obj.data({close_move_offsetX:d.close_offsetX, close_move_offsetY:d.close_offsetY});
	if(d.next_pos===d.next_move_pos) obj.data({next_move_offsetX:d.next_offsetX, next_move_offsetY:d.next_offsetY});
	if(d.prev_pos===d.prev_move_pos) obj.data({prev_move_offsetX:d.prev_offsetX, prev_move_offsetY:d.prev_offsetY});
	if(d.el1_pos===d.el1_move_pos) obj.data({el1_move_offsetX:d.el1_offsetX, el1_move_offsetY:d.el1_offsetY});
	if(d.el2_pos===d.el2_move_pos) obj.data({el2_move_offsetX:d.el2_offsetX, el2_move_offsetY:d.el2_offsetY});
	if(d.el3_pos===d.el3_move_pos) obj.data({el3_move_offsetX:d.el3_offsetX, el3_move_offsetY:d.el3_offsetY});
	if(d.counter_pos===d.counter_move_pos) obj.data({counter_move_offsetX:d.counter_offsetX, counter_move_offsetY:d.counter_offsetY});
	if(d.caption_pos===d.caption_move_pos) obj.data({caption_move_offsetX:d.cap_offsetX, caption_move_offsetY:d.cap_offsetY});
},






/////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// FEATURE AND BROWSER DETECTION
/////////////////////////////////////////////////////////////////////////////////////////
supported_features:function(){
	Boxaroo.ANI=tS.animation!==u||tS.WebkitAnimation!==u||tS.MozAnimation!==u||tS.msAnimation!==u||tS.OAnimation!==u ? true : false;
	Boxaroo.TRNS=tS.transition!==u||tS.WebkitTransition!==u||tS.MozTransition!==u||tS.msTransition!==u||tS.OTransition!==u ? true : false;
	Boxaroo.SDWS=tS.boxShadow!==u||tS.WebkitboxShadow!==u||tS.MozBoxShadow!==u||tS.msBoxShadow!==u||tS.OBoxShadow!==u ? true : false;
	Boxaroo.TRFM=tS.perspective!==u||tS.WebkitPerspective!==u||tS.MozPerspective!==u||tS.msPerspective!==u||tS.OPerspective!==u ? true : false;
	Boxaroo.bgSize=tS.backgroundSize!==u||tS.WebkitBackgroundSize!==u||tS.MozBackgroundSize!==u||tS.msBackgroundSize!==u||tS.OBackgroundSize!==u ? true : false;
	Boxaroo.cEv=!!('ontouchstart' in window) ? 'touchstart' :'click';
	Boxaroo.PRE=(function(){
		if(/webkit/.test(uA)) return '-webkit-';
		if(/mozilla/.test(uA) && !/(compatible|webkit)/.test(uA)) return '-moz-';
		if(/msie/.test(uA) && !/opera/.test(uA)) return '-ms-';	
		if(/opera/.test(uA)) return '-o-';
		return;
	})();
	Boxaroo.GRDT=(function(){ // DISABLE IN IE7/8
		if(window.attachEvent && !window.addEventListener) return false;
		var mElem=$doc.createElement('modern'), 
			mS=mElem.style.backgroundImage;
		mS="linear-gradient(left top, #9f9, white)";
		mS="-o-linear-gradient(left top, #9f9, white)";
		mS="-moz-linear-gradient(left top, #9f9, white)";
		mS="-webkit-linear-gradient(left top, #9f9, white)";
		mS="-ms-linear-gradient(left top, #9f9, white)";
		mS="-webkit-gradient(linear, left top, right bottom, from(#9f9), to(white))";
		return mS.indexOf('gradient')==-1 ? false : true;
	})();
	Boxaroo.version=(uA.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ )||[0,'0'])[1];
	Boxaroo.safari=/webkit/.test(uA);
	Boxaroo.msie=/msie/.test(uA)&&!/opera/.test(uA);
	Boxaroo.mozilla=/mozilla/.test(uA)&&!/(compatible|webkit)/.test(uA);
	Boxaroo.isTablet=uA.match(/iPad|Android|Kindle|NOOK|tablet/i)!==null;
	Boxaroo.isMobile=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
		
	// FORCE GRADIENT SUPPORT IN IE9 USING IE/FILTER
	if(Boxaroo.msie && Boxaroo.version===9) Boxaroo.GRDT=true;

	// CSS3 IMAGE FILTERS SUPPORT
	Boxaroo.filters=(function(){ 
		return ((Boxaroo.mozilla && Boxaroo.version.pF()>=35) || Boxaroo. safari && !Boxaroo.isTablet && !Boxaroo.isMobile);
	})();

	// GET TRANSITION END EVENT
	switch(Boxaroo.PRE){
		case '-webkit-': var transitionEndEvent='webkitTransitionEnd'; break;
		case '-o-': var transitionEndEvent='oTransitionEnd OTransitionEnd'; break;
		case '-ms-': var transitionEndEvent='MSTransitionEnd transitionend'; break;
		default : var transitionEndEvent='transitionend'; break; 
	};
	Boxaroo.transEND=transitionEndEvent;
}};






/////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// CSS3 ANIMATION METHOD
/////////////////////////////////////////////////////////////////////////////////////////
$.fn.extend({
Ani:function(Ani,d,cF){
		// ANI=ANIMATION ARGUMENTS, D=DURATION, CF=COMPLETE FUNCTION
		var obj=$(this), 
			cOBJ=Boxaroo.cOBJ || obj.find('img'), 
			tStr='';
		
		/////////////////
		// CSS3 ANIMATION
		/////////////////
		if(Boxaroo.TRNS){
			for(var k in Ani){
				if(Ani.hasOwnProperty(k)) tStr+=''+k+' '+d/1000+'s '+$.data(cOBJ).transition_timing+' 0s,';
			};
			Ani.transition=tStr.replace(/,+$/, '');
			obj.css(Ani).one(Boxaroo.transEND,function(e){
				// REMOVE TransEnd TO PREVENT MULTIPLE FIRING [ EVEN WITH .ONE ]
				obj.off(Boxaroo.transEND);
				if(typeof cF==='function')cF.apply(this,arguments);
				e.stopPropagation(); 
			});

		///////////////////
		// JQUERY ANIMATION
		///////////////////
		}else{
			obj.animate(Ani, {duration:d, queue:false, complete:function(){
				if(typeof cF==='function') cF.apply(this,arguments);
			}});
		};
	return obj;
},




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PLAY CSS3 ANIMATIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
PLY:function(){ 
	if(Boxaroo.ANI) return this.css(Boxaroo.PRE+'animation-play-state','running'); 
	return this;
},

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PAUSE CSS3 ANIMATIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
PSE:function(){ 
	if(Boxaroo.ANI) return this.css(Boxaroo.PRE+'animation-play-state','paused');
	return this;
},





////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @@@ SECTION
// POSITION LIGHTBOX COMPONENTS
// P=posInfo Object, POS=POSITION, X=X OFFSET, Y=Y OFFSET, OW=OBJ WIDTH, OH=OBJ HEIGHT, m=BOOLEAN (MOVE)
// _T=LIGHTBOX TOP, _L=LIGHTBOX LEFT, _W=LIGHTBOX WIDTH, _H=LIGHTBOX HEIGHT
// P.SW=SCROLL WIDTH TO ENFORCE SCREEN BOUNDARIES [ FIXED AMOUNT CURRENTLY SET FOR PSI.SCROLLW ]
////////////////////////////////////////////////////////////////////////////////////////////////////////////
pos:function(p, pos, X, Y, oW, oH, m){
	var obj=$(this);

	// MAKE SURE COMPONENTS ARE NOT POSITIONED OFF-SCREEN [ ESPECIALLY MALLER DEVICES ]
	switch(pos){		
		case 1: var o={ t:p._T+Y, l:p._L+X }; break;
		case 2: var o={ t:p._T+Y, l:p._L+(p._W/2)-(oW/2)+X }; break;
		case 3:	var o={ t:p._T+Y, l:p._L+p._W-oW+X }; break;
		case 4: var o={ t:p._T-oH+(p._H/2)+Y, l:p._L+p._W-oW+X }; break;
		case 5: var o={ t:p._T+p._H-oH+Y,  l:p._L+p._W-oW+X }; break;
		case 6:	var o={ t:p._T+p._H-oH+Y, l:p._L+(p._W/2)-(oW/2)+X }; break;
		case 7:	var o={ t:p._T+p._H-oH+Y, l:p._L+X }; break;
		case 8: var o={ t:p._T-oH+(p._H/2)+Y, l:p._L+X }; break;
		case 9: var o={ t:p._T-oH+Y, l:p._L+X }; break;
		case 10: var o={ t:p._T-oH+Y, l:p._L+(p._W/2)-(oW/2) }; break;
		case 11: var o={ t:p._T-oH+Y, l:p._L+p._W-oW+X }; break;
		case 12: var o={ t:p._T+(p._H/2)-(oH/2)+Y, l:p._L+p._W+X };break;
		case 13: var o={ t:p._T+p._H+Y, l:p._L+p._W-oW+X }; break;
		case 14: var o={ t:p._T+p._H+Y, l:p._L+(p._W/2)-(oW/2)+X }; break;
		case 15: var o={ t:p._T+p._H+Y, l:p._L+X }; break;
		case 16: var o={ t:p._T+(p._H/2)-(oH/2)+Y, l:p._L-oW+X }; break;
		case 17: var o={ t:Y, l:X }; break;
		case 18: var o={ t:Y, l:(p.wW/2)-(oW/2) }; break;
		case 19: var o={ t:Y, l:p.wW-oW+X }; break;
		case 20: var o={ t:p.wH/2-(oH/2)+Y, l:p.wW-oW+X }; break;
		case 21: var o={ t:p.wH-oH+Y, l:p.wW-oW+X }; break;
		case 22: var o={ t:p.wH-oH+Y, l:(p.wW/2)-(oW/2)+X }; break;
		case 23: var o={ t:p.wH-oH+Y, l:X }; break;
		case 24: var o={ t:(p.wH/2)-(oH/2)+Y, l:X }; break;
		case 25: var o={ t:(p.wH/2)-(oH/2)+Y, l:(p.wW/2)-(oW/2)+X };break;
	};	
	
	// NO COMPONENT ANIMATION
	if(!m){
		return obj.css({top:o.t+'px', left:o.l+'px'});
	// COMPONENT ANIMATION
	}else{
		return obj.Ani({top:o.t+'px', left:o.l+'px'}, m, null); 
	};
}});




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BOXAROO PLUGIN DEFINITION
////////////////////////////////////////////////////////////////////////////////////////////////////////////
$.fn.Boxaroo=function(method, options){
	if(Boxaroo[method]){ return Boxaroo[method].apply(this,Array.prototype.slice.call(arguments,1));
	}else if(typeof method==='object'||!method){ return Boxaroo.init.apply(this,arguments);
	}else{ $.error('Method '+method+' does not exist'); }
}})(jQuery);

String.prototype.removeWS=function(){return this.toString().replace(/\s/g, '');};
String.prototype.fixColor=function(){return '#'+this.toString().replace('#','').replace(/\s/g, '');};
String.prototype.pF=function(){return parseFloat(this);};
Number.prototype.pF=function(){return parseFloat(this);};
String.prototype.isB=function(){return this.toString()=="true"?true:false;};
Boolean.prototype.isB=function(){return (this==true)?true:false;};