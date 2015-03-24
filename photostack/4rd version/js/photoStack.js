;(function(){
	
	var defaults = {
		
	};
	var methods = {
		
	};
	var currPos = 0;
	function photoStack(element, options) {
		this.element = element;
		this.config = $.extend({},defaults,options);
		this.init();
	};
	photoStack.prototype.init = function() {
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
	photoStack.prototype.elementAnimationLeft = function() {
		var speed = 500;
		var that = this
		$(".innerWrapper div:eq("+currPos+")").children().not(".animated").first().animate({
				left : "-999px"
			},speed,"easeInOutBack",function(){
				$(this).addClass("animated");				
				speed +=20;
				that.elementAnimationLeft();
				
		});
		if($(".innerWrapper div:eq("+currPos+")").children().not(".animated").length <1){
			speed = 500;
			$(".innerWrapper").animate({
				left : "-=980px"
			},200,function(){
				currPos += 1;
				that.contentAnimationLeft();
			});
		}
	}
	photoStack.prototype.contentAnimationLeft = function() {
		var that = this;
		var speed = 500;
		$(".innerWrapper div:eq("+currPos+")").children().not(".animated").first().animate({
						left : $(".innerWrapper div:eq("+currPos+")").children().not(".animated").first().data("pos")
					},speed,"easeInOutBack",function(){
						$(this).addClass("animated");
						speed +=20;
						that.contentAnimationLeft();
						if($(".innerWrapper div:eq("+currPos+")").children().not(".animated").length <1){
								$(".innerWrapper .animated").removeClass("animated");
								$(".disable").removeClass("disable");
						}
		});
	}
	/** animation for next button  **/
	
	
	/** animation for prev button  **/
	
	photoStack.prototype.elementAnimationRight = function() {
		var speed = 500;
		var that = this
		if($(".innerWrapper div:eq("+currPos+")").children().not(".animated").length <1){
			speed = 500;
			$(".innerWrapper").animate({
				left : "+=980px"
			},200,function(){
				currPos -= 1;
				that.contentAnimationRight();
			});
		}
		$(".innerWrapper div:eq("+currPos+")").children().not(".animated").last().animate({
				left : "999px"
			},speed,"easeInOutBack",function(){
				$(this).addClass("animated");
				speed +=20;
				that.elementAnimationRight();
		});
	}
	photoStack.prototype.contentAnimationRight = function() {
		var that = this;
		var speed = 500;
		$(".innerWrapper div:eq("+currPos+")").children().not(".animated").last().animate({
						left : $(".innerWrapper div:eq("+currPos+")").children().not(".animated").last().data("pos")
					},speed,"easeInOutBack",function(){
						$(this).addClass("animated");
						speed +=20;
						that.contentAnimationRight();
						if($(".innerWrapper div:eq("+currPos+")").children().not(".animated").length <1){
								$(".innerWrapper .animated").removeClass("animated");
								$(".disable").removeClass("disable");
						}
		});
	}
	/** animation for prev button  **/
	$.fn.photoStack = function(options){
		if ( methods[options] ) {
			return methods[options].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof options === 'object' || !options ) {
			new photoStack(this.first(), options);
			return this.first();
		} else {
			$.error( 'Method ' + options + ' does not exist' );
		}
	}

}(jQuery))