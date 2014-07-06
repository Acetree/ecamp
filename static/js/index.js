// JavaScript Document

$(document).ready(function(){
	setInterval("headerToggle()",4000);
	
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var imgHeight = $("#header-background img").height();
	//$("#header-container").height(imgHeight);
	
	if( windowWidth <= 960 ){
		$("#header-background").width(960);
		$("#header-background").height(480);
		$("#header-container").height(480);
		$("#slogan").css("top",960*0.13);
		$("#go-button").css("top",960*0.17);
	}
	else{
		$("#header-background").width(windowWidth);
		$("#header-background").height(windowWidth/2);
		$("#header-container").height(windowWidth/2);
		$("#slogan").css("top",windowWidth*0.13);
		$("#go-button").css("top",windowWidth*0.17);
		
		
		$("#header-container").height(windowWidth/2);
		$("#slogan").css("top",windowWidth*0.13);
		$("#go-button").css("top",windowWidth*0.17);
	}
	//go-button
	$("#go-button").hover( goButtonIn, goButtonOut);
	
	function goButtonIn(){
		$("#go-button img").attr("src", "../static/image/go-button2.png");
	}
	function goButtonOut(){
		$("#go-button img").attr("src", "../static/image/go-button.png");
	}
	
	
	
	
	//scroll
	$("#back-to-top").click(function(){
		$("html,body").animate({scrollTop: $("#logo").offset().top}, 800);
	});
	
	$("#li-new-info").click(function(){
		$("html,body").animate({scrollTop: $("#destination").offset().top}, 800);
	});
	
	$("#li-destination").click(function(){
		$("html,body").animate({scrollTop: $("#new-info").offset().top}, 800);
	});
	
	$("#li-tip").click(function(){
		$("html,body").animate({scrollTop: $("#tip").offset().top}, 800);
	});
	
	$("#li-about").click(function(){
		$("html,body").animate({scrollTop: $("#about-us").offset().top}, 800);
	});
	
	/*
	
	$("#r-list li a").hover(function(){
		var path = "../static/image/r/" + $(this).text() +".jpg";
		$("#r-picture img").attr("src", path);
	});
	
	*/
	
	
	$(window).resize(function() {
		windowWidth = $(window).width();
  		if( windowWidth <= 960 ){
			$("#header-background").width(960);
			$("#header-background").height(480);
			$("#header-container").height(480);
			$("#slogan").css("top",960*0.13);
			$("#go-button").css("top",960*0.17);
		}
		else{
			$("#header-background").width(windowWidth);
			$("#header-background").height(windowWidth/2);
			$("#header-container").height(windowWidth/2);
			$("#slogan").css("top",windowWidth*0.13);
			$("#go-button").css("top",windowWidth*0.17);
		}
	});
	
});