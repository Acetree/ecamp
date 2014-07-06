// JavaScript Document

$(document).ready(function(){
	
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var imgHeight = $("#header-background img").height();
	//$("#header-container").height(imgHeight);
	
	
	var chooseFlag = 0;
	var chooseId;
	
	var text = {
			"self" : "我已经有目的地，不需要套票~",
			"zhoushan" : "我要去舟山露营大会！",
			"anji" : "我想去安吉江南天池！",
			"huzhou" : "我要去湖州鸟之家露营基地！"
		}
	
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
	
	
	$("#diy-button-big").hover( diyButtonIn, diyButtonOut);
	
	function diyButtonIn(){
		$("#diy-button-big").css("background", "url(../static/image/buttonBig2.png)");
	}
	function diyButtonOut(){
		$("#diy-button-big").css("background", "url(../static/image/buttonBig.png)");
	}
	
	$('#diy-button-big').click(function(){
		window.location.href = $SCRIPT_ROOT + '/';
	});
	
	$("#choose-destination td").hover(blockIn, blockOut);
	
	function blockIn(){
		if(chooseFlag == 0 || (chooseFlag == 1 && $(this).attr("id") != chooseId)) $(this).css("background", "rgba(255,255,255,1)");
		$("#header-background img").attr("src","../static/image/destination/"+$(this).attr("id")+".jpg");
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
		$("#diy-button-big p").text(text[chooseId]);
	}
	
	
	$(window).resize(function() {
		windowWidth = $(window).width();
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
		}
	});
	
});