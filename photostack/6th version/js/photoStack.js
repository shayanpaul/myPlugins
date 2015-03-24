;(function(){
	var defaults = {};
	var methods = {};
	var currPos = 0;
	function cudeCarousal(element, options) {
		this.element = element;
		this.config = $.extend({},defaults,options);
		this.init();
	};
	cudeCarousal.prototype.init = function() {
		var degree = 0;
		$("#next").on("click",function(){
			degree = degree - 90;
			$("#cube").css("transform","rotateY("+ degree + "deg)")
		});
		debugger;
		$("#prev").on("click",function(){
			degree = degree + 90;
			$("#cube").css("transform","rotateY("+ degree + "deg)")
		});
	}
	/** animation for prev button  **/
	$.fn.cudeCarousal = function(options){
		if ( methods[options] ) {
			return methods[options].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof options === 'object' || !options ) {
			new cudeCarousal(this.first(), options);
			return this.first();
		} else {
			$.error( 'Method ' + options + ' does not exist' );
		}
	}

}(jQuery));