// JavaScript Document

$(document).ready(function(){
	
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var imgHeight = $("#header-background img").height();
	//$("#header-container").height(imgHeight);
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
	
	
	
	var insuranceTotal = parseInt($("#camp").text()) * 5;
	var stepNum = 0;
	
	$("#diy-button-big").click(function(){
		
		if(stepNum == 0){
			
			var cont = submit_form_order_info();
			if(cont == 1){
				$("#shopping-car").effect("drop", {mode:"hide",direction:"up"});
				$("#personal-info").delay(800).effect("drop", {mode:"show",direction:"down"});
				stepNum = 1;
				$("#diy-button-big p").text("确认个人信息~");
				$("#back-step p").text("返回修改订单信息");
			}
		}
		else{
			var cont = validateMyAjaxInputContactInfo();
			if(cont == 1) document.forms['contact_info'].submit();
			//window.location.href = "success.html";
		}
	});
	
	$("#back-step").click(function(){
		
		if(stepNum == 1){
			
			$("#personal-info").effect("drop", {mode:"hide",direction:"down"});
			$("#shopping-car").delay(800).effect("drop", {mode:"show",direction:"up"});
			stepNum = 0;
			$("#diy-button-big p").text("OK，订单正确");
			$("#back-step p").text("返回目的地选择");
		}
		else{
			window.location.href = "destination.html";
		}
	});
	
	
	
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
	
	$(".minus").click(function(e) {
        var number = $(this).next().children().val();
		var price = parseInt($(this).prev().prev().text());
		var total = parseInt($("#equipment-total").text());
		
		
		$("#equipment-total").text(total-price);
		var alltotal = parseInt($("#all-total").text());
		$("#all-total").text(alltotal-price);
		
		if(number > 1) 
		{
			$(this).next().children().val(number-1);
			$(this).next().next().next().text((number-1)*price);
		}
		else
		{
			$(this).parent().replaceWith("");
		}
    });	
	
	$(".add").click(function(e) {
        var number = parseInt($(this).prev().children().val());
		$(this).prev().children().val(number+1);
		var price = parseInt($(this).prev().prev().prev().prev().text());
		var total = parseInt($("#equipment-total").text());
		$(this).next(".cost").text(number*price+"");
		$("#equipment-total").text(total+price);
		var alltotal = parseInt($("#all-total").text());
		$("#all-total").text(alltotal+price);
    });	
	
	$("#car-insurance").change(function(){
		var val = $("input[name='insurance']:checked").val();
		var a = parseInt($("#all-total").text());
		
		if(val == "1"){
			$("#insurance-fee").css("display","block");
			$("#all-total").text(a+insuranceTotal);
		}
		else
		{
			$("#insurance-fee").css("display","none");
			$("#all-total").text(a-insuranceTotal);
		}
	});
	
	
	
	$(window).resize(function() {
		pictureScale();
	});
	
});