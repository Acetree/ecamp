// JavaScript Document

$(document).ready(function(){
	
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var imgHeight = $("#header-background img").height();
	var imgWidth = $("#background-img").width();
	//$("#header-container").height(imgHeight);
	
	pictureScale();
	function pictureScale(){
		
		windowHeight = $(window).height();
		windowWidth = $(window).width();
		imgHeight = $("#header-background img").height();
		imgWidth = $("#header-background img").width();
		
		var videoRatio = imgWidth / imgHeight;
		var windowRatio = windowWidth / windowHeight;
		
		
		$('#header-background').height(windowHeight);
		$('#header-background').width(windowWidth);
		
		if(videoRatio > windowRatio){
			//height >> width --> full height
			var scale = windowHeight / imgHeight;
			$('#header-background img').height(windowHeight);
			var sunShineWidth = imgWidth * scale;
			$('#header-background img').width(sunShineWidth);
		
			//$('#sunShine img').css('width', '100%');
			//$('#sunShine img').css('height', '100%');
			
			//center
			marginLeft = (sunShineWidth - windowWidth) / 2 * (-1);
			$('#header-background img').css('margin-left', marginLeft);
			
		}else{
			//height << width --> full width
			var scale = windowWidth / imgWidth;
			$('#header-background img').width(windowWidth);
			var sunShineHeight = imgHeight * scale;
			$('#header-background img').height(sunShineHeight);
		
			//$('#sunShine img').css('width', '100%');
			//$('#sunShine img').css('height', '100%');
			
			//center
			marginTop = (sunShineHeight - windowHeight) / 2 * (-1);
			$('#header-background img').css('margin-top', marginTop);
		}
		
		
	}
	
	
	
	$("#diy-button-big").click(function(){
		var cont = validateMyAjaxInputContactInfo();
		if(cont ==1) document.forms['contact_info'].submit();
	});
	
	
	
	
	
	$("#diy-button-big").hover( diyButtonIn, diyButtonOut);
	
	function diyButtonIn(){
		$("#diy-button-big").css("background", "url(../static/image/buttonBig2.png)");
	}
	function diyButtonOut(){
		$("#diy-button-big").css("background", "url(../static/image/buttonBig.png)");
	}
	
	
	$(window).resize(function() {
		pictureScale();
	});
	
	
});