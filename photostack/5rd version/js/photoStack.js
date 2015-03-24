;(function(){
	
	var defaults = {
		
	};
	var methods = {
		
	};
	function coverFlow(element, options) {
		this.element = element;
		this.config = $.extend({},defaults,options);
		this.init();
	};
	coverFlow.prototype.init = function() {
		var initialXPos = 210;
		var diff = 40;
		var extremLeft = 170;
		var currentPos = 0;
		var prevPos = 0;
		var containerLeftPos = $("#ps_slider").width()/2;
		var vendorPrefix = ["moz","webkit","khtml","o","ms"];
		/* for creating reflection in firefox*/
		if(window.navigator.userAgent.indexOf("Firefox") > -1){
			$("<style type='text/css' id='dynamic' />").appendTo("head");
			$(".ps_album").each(function(index){
				var imageId = $(this).find("img").attr("id","reflection_"+index); 
				$(this).attr("id","refector_"+index);
				$("#dynamic").append("#refector_"+ index +":after{content:''; bottom: -100%; left: 0; opacity: 0.4; position: absolute; right: 0; top: 100%; transform: translateY(0px) scaleY(-1); z-index: -1; background: -moz-element(#reflection_"+ index +") repeat scroll 0 0 transparent; mask: url('#mask'); }");
			});
		}		
		/*for creating reflection in firefox*/	
		$(".ps_album").each(function(index){
			if(index != 0){
				var that = $(this);
				that.css("transform","translate3d("+ initialXPos + "px,0px, 0px) rotateY(-70deg)");
				$.each(vendorPrefix,function(i,vendor){
					that.css(vendor+"Transform","translate3d("+ initialXPos + "px,0px, 0px) rotateY(-70deg)");
					//$(this).css("webkitTransform","translate3d("+ initialXPos + "px,0px, 0px) rotateY(-70deg)");
				})
				initialXPos = initialXPos+40;
			}
		});
		$("body").on("click","img",function(e){
			currentPos = $(this).parent().index();
			$(this).parent().css("transform","translate3d("+ (diff*currentPos) + "px, 0px, 170px) rotateY(0deg)");
			$(this).parent().css("webkitTransform","translate3d("+ (diff*currentPos) + "px, 0px, 170px) rotateY(0deg)");
			
			if(currentPos > prevPos){
				$(".ps_album").each(function(index){
					if(index < currentPos){
						var tempDiff = diff * index;
						$(this).css("transform","translate3d("+ (tempDiff-extremLeft) + "px,0px, 0px) rotateY(70deg)");
						$(this).css("webkitTransform","translate3d("+ (tempDiff-extremLeft) + "px,0px, 0px) rotateY(70deg)");
					}
				});
				
			}else{
				$(".ps_album").each(function(index){
					if(index > currentPos && index<=prevPos){
						var tempDiff = diff * index;
						$(this).css("transform","translate3d("+ (tempDiff+extremLeft) + "px,0px, 0px) rotateY(-70deg)");
						$(this).css("webkitTransform","translate3d("+ (tempDiff+extremLeft) + "px,0px, 0px) rotateY(-70deg)")
					}
				});
			}
			var updatedContainerLeftPos = containerLeftPos - (diff * currentPos);
			$("#ps_albums").css("transform","translate3d("+ updatedContainerLeftPos + "px,105px,-170px)");
			$("#ps_albums").css("webkitTransform","translate3d("+ updatedContainerLeftPos + "px,105px,-170px)");
			prevPos = $(this).parent().index();
		});
	}
	$.fn.coverFlow = function(options){
		if ( methods[options] ) {
			return methods[options].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof options === 'object' || !options ) {
			new coverFlow(this.first(), options);
			return this.first();
		} else {
			$.error( 'Method ' + options + ' does not exist' );
		}
	}

}(jQuery))