;(function(){
	
	var defaults = {
		
	};
	var methods = {
		
	};
	function photoFlip(element, options) {
		this.element = element;
		this.config = $.extend({},defaults,options);
		this.init();
	};
	photoFlip.prototype.init = function() {
		var ImageCount = $("#photoFlip_container img").length;
		var photoIndex = 0;
		var previousDeg;
		$("#photoFlip_container img").each(function(index,value){
			var randomDeg = Math.floor(Math.random()*40)-20 ;
			
			if(randomDeg != 0){
				if(index == 0){
					$(this).css({"transform":"rotate(0deg)","webkitTransform":"rotate(0deg)"});
				}
				else{
					$(this).css({"transform":"rotate("+randomDeg+"deg)","webkitTransform":"rotate("+randomDeg+"deg)"});
				}
			}
			$(this).css("zIndex",ImageCount+300);
			ImageCount--;
		});
		
		$("#photoFlip_next_photo").on("click",function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				
				$("#photoFlip_container img").eq(photoIndex).animate({
					left: "450px",
					top :"-250px"
				},350,function(){
					if(photoIndex != 0){
						$("#photoFlip_container img").eq(photoIndex).css({"transform":previousDeg,"webkitTransform":previousDeg});
					}else{
						$("#photoFlip_container img").eq(photoIndex).css({"transform":"rotate(0deg)","webkitTransform":"rotate(0deg)"});
					}
					photoIndex++;
					if(photoIndex <= ($("#photoFlip_container img").length-1)){	
						var tempNextZindex = $("#photoFlip_container img").eq(photoIndex).css("zIndex");
						if(photoIndex < ($("#photoFlip_container img").length-1)){
							var tempPrvZindex = $("#photoFlip_container img").eq(photoIndex + 1).css("zIndex");
						}else{
							var tempPrvZindex = $("#photoFlip_container img").eq(0).css("zIndex");
						}
						if($.browser.webkit){
							previousDeg = $("#photoFlip_container img").eq(photoIndex).css("-webkit-transform");
						}else{
							previousDeg = $("#photoFlip_container img").eq(photoIndex).css("transform");
						}
						$("#photoFlip_container img").eq(photoIndex).css("zIndex",($("#photoFlip_container img").length+300));
						
						
						$("#photoFlip_container img").eq(photoIndex).css({"transform":"rotate(0deg)","webkitTransform":"rotate(0deg)"});
						if(photoIndex < ($("#photoFlip_container img").length-1)){
							$("#photoFlip_container img").eq(photoIndex+1).css("zIndex",tempNextZindex);
						}else{
							$("#photoFlip_container img").eq(0).css("zIndex",tempNextZindex);
						}	
						$("#photoFlip_container img").eq(photoIndex-1).css("zIndex",tempPrvZindex);
						$("#photoFlip_container img").eq(photoIndex-1).animate({
							left: "0px",
							top :"0px"
						},100,function(){
							$("#photoFlip_next_photo").addClass("active");
						});
					}else{
						photoIndex = 0;
						var tempNextZindex = $("#photoFlip_container img").eq(photoIndex).css("zIndex");
						var tempPrvZindex = $("#photoFlip_container img").eq(photoIndex + 1).css("zIndex");
						$("#photoFlip_container img").eq(photoIndex).css("zIndex",($("#photoFlip_container img").length+300));
						$("#photoFlip_container img").eq(photoIndex+1).css("zIndex",tempNextZindex);
						$("#photoFlip_container img").eq(photoIndex-1).css("zIndex",tempPrvZindex);
						$("#photoFlip_container img").eq(photoIndex-1).animate({
							left: "0px",
							top :"0px"
						},350,function(){
							$("#photoFlip_next_photo").addClass("active");
						});
					}					
				});
			}
		});
	}
	$.fn.photoFlip = function(options){
		if ( methods[options] ) {
			return methods[options].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof options === 'object' || !options ) {
			new photoFlip(this.first(), options);
			return this.first();
		} else {
			$.error( 'Method ' + options + ' does not exist' );
		}
	}

}(jQuery))