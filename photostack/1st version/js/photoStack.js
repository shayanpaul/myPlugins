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
		var leftPosition = 0;
		var slideCounter = 0;
		$("#ps_albums .ps_album").each(function(index, element) {
            if(index < 5){
				leftPosition = (index * ($(this).outerWidth()+8));
				$(this).css("left",leftPosition + "px");
				$(this).css("opacity","1");
			}
			else{
				$(this).css("left","1097px");
				$(this).css("opacity","0");	
			}
        });
		$(".next",this.element.parent()).on("click",function(){
			$(".prev").addClass("active");
			if(($("#ps_albums .ps_album").length) - slideCounter != 5){
				if($(this).hasClass("active")){
						$(this).removeClass("active");
						$(".ps_album").eq(slideCounter).animate({
							left: "-415px",
							opacity: 0
						},400,function(){
							slideCounter++;
							var rearrangeLeftPos = 0;
							var count = 1;
							$("#ps_albums .ps_album").each(function(index, element) {
								if(index >=  slideCounter && count <=5){
									rearrangeLeftPos = 	((index-slideCounter) * ($(this).outerWidth()+8));
									$(this).animate({
										left: rearrangeLeftPos +"px",
										opacity:1
									},400,function(){
									});
									count = count+1;
								}
								
							});
							$(".next").addClass("active");
						});
						
				}
			}else{
				return false;
			}
		});
		$(".prev",this.element.parent()).on("click",function(){
			if(slideCounter != 0){
				if($(this).hasClass("active")){
						$(this).removeClass("active");
						$(".ps_album").eq(slideCounter+4).animate({
							left: "1097px",
							opacity: 0	
						},400,function(){
							slideCounter--;
							var count = 1;
							var rearrangeLeftPos = 0;
							$("#ps_albums .ps_album").each(function(index, element) {
								if(index >=  slideCounter && count <=5){
									rearrangeLeftPos = 	((index-slideCounter) * ($(this).outerWidth()+8));
									$(this).animate({
										left: rearrangeLeftPos +"px",
										opacity:1
									},400,function(){
									});
									count = count+1;
								}
							});
							$(".prev").addClass("active");
						});
				}
			}else{
				return false;
			}
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