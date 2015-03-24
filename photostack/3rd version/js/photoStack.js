;(function(){
	
	var defaults = {
		
	};
	var methods = {
		
	};
	function photoStack(element, options) {
		this.element = element;
		this.config = $.extend({},defaults,options);
		this.init();
	};
	photoStack.prototype.init = function() {
		$(".innerWrapper div").last().css({marginRight:"0px"});
		var gutterSpace = 50;
		var wrapperWidth = ($(".innerWrapper div").size()-1) * gutterSpace + $(".innerWrapper div img").width() + ($(".innerWrapper div img").width() - gutterSpace);
		$(".innerWrapper").css("width",wrapperWidth);
		$("body").on("click",".innerWrapper div img",function(){
			var currentSlide = $(this).parent().index();
			var remainingSlide = $(".innerWrapper div").length - (currentSlide+1);
			var imageSize = $(".innerWrapper div img").css("width");
			var rightMarginWidth = $(".innerWrapper div img").width() - 50;
			$(".innerWrapper div").each(function(index,node){
					if(index > currentSlide){
						$(this).clone().css({marginRight:"-"+imageSize}).prependTo($(".innerWrapper")).animate({
							marginRight:"-" + rightMarginWidth
						},800);
					}
			});
			$(this).parent().animate({
				marginRight:"0px"
			},800,function(){
					$(".innerWrapper div").each(function(index,remaining){
						if(index > (currentSlide+remainingSlide)){
							$(this).remove();
						}
					});
			});
		});
	}
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