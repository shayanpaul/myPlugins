;(function(){
	
	var defaults = {
		
	};
	var methods = {
		
	};
	var currPos = 0;
	function layerSlider(element, options) {
		this.element = element;
		this.config = $.extend({},defaults,options);
		this.init();
	};
	layerSlider.prototype.init = function() {
		var objThis = this;
		$(".innerWrapper div:not(:first-child)").each(function(i){
				$(this).children().each(function(){
					$(this).data("pos",$(this).css("left")); 
					$(this).css({left:"999px"});
				});
		});
		$(".innerWrapper div:first-child").each(function(i){
				$(this).children().each(function(){
					$(this).data("pos",$(this).css("left")); 
				});
		})
		$("#next").on("click",function(){
			if( $(this).hasClass("disable") || currPos == $(".innerWrapper div").length -1){
				return false;
			}
			$(this).addClass("disable");
			$("#prev").addClass("disable");
			if((currPos+1) == $(".innerWrapper div").length -1){	
				$(this).css("opacity",".2");
			} else {
				$("#prev").css("opacity","1");
			}	
			
			objThis.elementAnimationLeft();
			
		});
		$("#prev").on("click",function(){
			if( $(this).hasClass("disable") || currPos == 0) return false;
			$(this).addClass("disable");
			$("#next").addClass("disable");
			if(currPos == 1){
				$(this).css("opacity",".2");
			} else {
				$("#next").css("opacity","1");
			}
			
			objThis.elementAnimationRight();
		});
	}
	/** animation for next button  **/
	layerSlider.prototype.elementAnimationLeft = function() {
		var speed = 500;
		var that = this
		$(".innerWrapper div:eq("+currPos+")").children().each(function(chidIndex,childElement){
			var $this = $(this);
			setTimeout(function(){
				$this.animate({left:"-999"+"px"},speed,function(){
					speed = speed - 20;
					if(chidIndex+1 == $(".innerWrapper div:eq("+currPos+")").children().size()){
						$(".innerWrapper").animate({
							left : "-=980px"
						},10,function(){
							currPos += 1;
							that.contentAnimationLeft();
						});
					}
				});
			},(300+(100*chidIndex)));
		});
	}
	layerSlider.prototype.contentAnimationLeft = function() {
		var that = this;
		
		$(".innerWrapper div:eq("+currPos+")").children().each(function(nxtChidIndex,nxtChildElement){
				var $this = $(this);
				var speed = 200;
				setTimeout(function(){
					$this.animate({
						left: $(".innerWrapper div:eq("+currPos+")").children().eq(nxtChidIndex).data("pos")
					},speed,function(){
						if(nxtChidIndex+1 == $(".innerWrapper div:eq("+currPos+")").children().size()){
							$(".disable").removeClass("disable");
						}
						speed = speed + 100;
					});
				},(500+(100*nxtChidIndex)));
		});
}
	/** animation for next button  **/
	
	
	/** animation for prev button  **/
	
	layerSlider.prototype.elementAnimationRight = function() {
		var speed = 500;
		var that = this
		$($(".innerWrapper div:eq("+currPos+")").children().get().reverse()).each(function(chidIndex,childElement){
			var $this = $(this);
			setTimeout(function(){
				$this.animate({left:"999px"},speed,function(){
					speed = speed - 50;
					if(chidIndex+1 == $(".innerWrapper div:eq("+currPos+")").children().size()){
						$(".innerWrapper").animate({
							left : "+=980px"
						},10,function(){
							currPos -= 1;
							that.contentAnimationRight();
						});
					}
				});
			},(300+(100*chidIndex)));
		});
	}
	layerSlider.prototype.contentAnimationRight = function() {
		var that = this;
		var speed = 500;
		
		$($(".innerWrapper div:eq("+currPos+")").children().get().reverse()).each(function(nxtChidIndex,nxtChildElement){
				var $this = $(this);
				var speed = 200;
				setTimeout(function(){
					$this.animate({
						left: $($(".innerWrapper div:eq("+currPos+")").children().get().reverse()).eq(nxtChidIndex).data("pos")
					},speed,function(){
						if(nxtChidIndex+1 == $(".innerWrapper div:eq("+currPos+")").children().size()){
							$(".disable").removeClass("disable");
						}
						speed = speed + 100;
					});
				},(500+(100*nxtChidIndex)));
		});
		
	}
	/** animation for prev button  **/
	$.fn.layerSlider = function(options){
		if ( methods[options] ) {
			return methods[options].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof options === 'object' || !options ) {
			new layerSlider(this.first(), options);
			return this.first();
		} else {
			$.error( 'Method ' + options + ' does not exist' );
		}
	}

}(jQuery))