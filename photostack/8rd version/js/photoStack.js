;(function(){
	
	var defaults = {
		
	};
	var methods = {
		
	};
	var currPos = 0;
	function stickyHeader(element, options) {
		this.element = element;
		this.config = $.extend({},defaults,options);
		this.init();
	};
	stickyHeader.prototype.init = function() {
		var lastScroll = 0;
		$(this.element).append('<div class="stickyHeader"></div>');
		$(".stickyHeader").hide();
		$(".headerTitle").each(function(index,ele){
			$(this).attr("data-xpos",$(this).offset().top);
		});
		$(window).on("scroll",function(){
			//console.log($(window).scrollTop());
			var st = $(this).scrollTop();
			if($(window).scrollTop() >= parseInt($(".headerTitle").eq(0).attr("data-xpos")) || !($(window).scrollTop() < parseInt($(".headerTitle").eq(0).attr("data-xpos")))){
				$(".stickyHeader").show();
			}else{
				$(".stickyHeader").hide();
			}
			$(".headerTitle").each(function(index,ele){
				var calculation;
				if($(window).scrollTop() > (($(this).attr("data-xpos")) - ($(this).outerHeight())) && !$(this).hasClass("not-visble") && st > lastScroll){
					if(parseInt($(".stickyHeader").css("top")) > - ($(this).outerHeight()) && parseInt($(".stickyHeader").css("top")) <= 0){
						calculation = -($(window).scrollTop() - ($(this).attr("data-xpos") - $(this).outerHeight()));
						$(".stickyHeader").css("top",calculation+"px");
					
					}
					else if($(window).scrollTop() > $(this).attr("data-xpos")){
						$(".stickyHeader").text($(this).text());
						$(".stickyHeader").css("top","0px");
						$(this).addClass("not-visble");
					}	
				}
				else if($(window).scrollTop() < (($(".not-visble").last().attr("data-xpos")) + ($(".not-visble").last().outerHeight())) && $(this).hasClass("not-visble") && st < lastScroll){
	
					if(parseInt($(".stickyHeader").css("top")) >= 0 && parseInt($(".stickyHeader").css("top")) < ($(".not-visble").last().outerHeight()) && $(window).scrollTop() < ((parseInt($(".not-visble").last().attr("data-xpos"))) + parseInt($(".not-visble").last().outerHeight()))){
						calculation = (parseInt($(".not-visble").last().attr("data-xpos")) + parseInt($(".not-visble").last().outerHeight())) - ($(window).scrollTop());
						$(".stickyHeader").css("top",calculation+"px");
						$(".not-visble").last().text($(".not-visble").last().parent().prev().find(".not-visble").text());
					}
					else if(($(window).scrollTop() < $(".not-visble").last().attr("data-xpos")) && parseInt($(".stickyHeader").css("top")) > $(".stickyHeader").outerHeight()-1){
						var stickyTxt = $(".stickyHeader").text();
						$(".stickyHeader").text($(".not-visble").last().text());
						$(".not-visble").last().text(stickyTxt);
						$(".not-visble").last().removeClass("not-visble");
						$(".stickyHeader").css("top","0px");
						$(window).scrollTop(lastScroll-30);
					}
				}
			});
			lastScroll = st;
		});
	}
	/** animation for prev button  **/
	$.fn.stickyHeader = function(options){
		if ( methods[options] ) {
			return methods[options].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof options === 'object' || !options ) {
			new stickyHeader(this.first(), options);
			return this.first();
		} else {
			$.error( 'Method ' + options + ' does not exist' );
		}
	}

})(jQuery)