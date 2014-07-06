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
	
	
	
	
	$('#yes-button').click(function(){
		$('#do-choose-bg').css("display","none");
	});
	
	$('#no-button').click(function(){
		//$('#do-choose-bg').css("display","none");
		chooseId = 'self';
		window.location.href = $SCRIPT_ROOT + '/_choose_ticket/'+ chooseId;
	});
	
	
	
	
	
	
	
	var chooseFlag = 0;
	var chooseId;
	
	
	
	$("#yes-button").hover( yesButtonIn, yesButtonOut);
	
	function yesButtonIn(){
		$("#yes-button").css("background", "url(../static/image/buttonBig2.png)");
	}
	function yesButtonOut(){
		$("#yes-button").css("background", "url(../static/image/buttonBig.png)");
	}
	
	
	
	$("#diy-button-big").hover( diyButtonIn, diyButtonOut);
	
	function diyButtonIn(){
		$("#diy-button-big").css("background", "url(../static/image/buttonBig2.png)");
	}
	function diyButtonOut(){
		$("#diy-button-big").css("background", "url(../static/image/buttonBig.png)");
	}
	
	$("#diy-button-big").click(function(){
		if(chooseFlag == 0 ) alert("小易提醒：您还没有进行选择哦！如果不想选择门票，可以选择“我不需要套票了”。");
		if(chooseFlag == 1 ) {isLeaving = 1;window.location.href = $SCRIPT_ROOT + '/_choose_ticket/'+ chooseId;}
	});
	
	
	
	$("#choose-destination td").hover(blockIn, blockOut);
	
	function blockIn(){
		if(chooseFlag == 0 || (chooseFlag == 1 && $(this).attr("id") != chooseId)) $(this).css("background", "rgba(255,255,255,1)");
		
		
	}
	function blockOut(){
		if(chooseFlag == 0 || (chooseFlag == 1 && $(this).attr("id") != chooseId)) $(this).css("background", "rgba(255,255,255,0.7)");
	}
	
	$("#choose-destination td").click(choose);
	
	function choose(){
		$(this).css("background", "rgba(255,255,255,1)");
		
		if(chooseFlag == 0)
		{
			chooseFlag = 1;
		}
		else
		{
			$("#"+chooseId+"").css("background", "rgba(255,255,255,0.7)");
		}
		
		chooseId = $(this).attr("id");
		$("#header-background img").attr("src","../static/image/destination/"+chooseId+".jpg");
		$("#diy-button-big p").text(text[chooseId]);
		$("#mainpost").html(post[chooseId]);
		$("#maintitle").html(title[chooseId]);
	}
	
	
	$(window).resize(function() {
		pictureScale();
		
	});
	
});