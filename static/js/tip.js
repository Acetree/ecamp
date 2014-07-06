// JavaScript Document

$(document).ready(function(){
	
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var imgHeight = $("#header-background img").height();
	var imgWidth = $("#header-background img").width();
	
	
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
	

	
	
	
	

	/*
	if( windowWidth <= 960 ){
		$("#header-background").width(960);
		$("#header-background").height(480);
		$("#header-container").height(480);
		$("#slogan").css("top",960*0.13);
		$("#go-button").css("top",960*0.37);
	}
	else{
		$("#header-container").height(windowWidth/2);
		$("#slogan").css("top",windowWidth*0.13);
		$("#diy-button").css("top",windowWidth*0.37);
	}
	*/
	
	
	
	
	
	
	$(window).resize(function() {
		pictureScale();
		/*
  		if( windowWidth <= 960 ){
			$("#header-background").width(960);
			$("#header-background").height(480);
			$("#header-container").height(480);
			$("#slogan").css("top",960*0.13);
			$("#go-button").css("top",960*0.37);
		}
		else{
			$("#header-background").width(windowWidth);
			$("#header-background").height(windowWidth/2);
			$("#header-container").height(windowWidth/2);
			$("#slogan").css("top",windowWidth*0.13);
			$("#go-button").css("top",windowWidth*0.37);
		}*/
	});
	
});