// JavaScript Document

$(document).ready(function(){
	
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var imgHeight = $("#background-img").height();
	var imgWidth = $("#background-img").width();
	//$("#header-container").height(imgHeight);
	
	
	$("#notice-step0").fadeIn(1200);
	$("#notice-arrow0").fadeIn(1200);
	
	var diy = 0;
	var oneKey = 0;
	var stepNum = 0;
	var orderId;
	//var class = ["帐篷","防潮垫","睡袋","帐篷灯"];
	//var stepId = ["#step0-tent","#step1-pad","#step2-sleepingbag","#step3-light"];
	
	
	pictureScale();
	function pictureScale(){
		
		windowHeight = $(window).height();
		windowWidth = $(window).width();
		imgHeight = $("#background-img").height();
		imgWidth = $("#background-img").width();
		
		var videoRatio = imgWidth / imgHeight;
		var windowRatio = windowWidth / windowHeight;
		
		
		$('#background').height(windowHeight);
		$('#background').width(windowWidth);
		
		if(videoRatio > windowRatio){
			//height >> width --> full height
			var scale = windowHeight / imgHeight;
			$('#background-img').height(windowHeight);
			var sunShineWidth = imgWidth * scale;
			$('#background-img').width(sunShineWidth);
		
			//$('#sunShine img').css('width', '100%');
			//$('#sunShine img').css('height', '100%');
			
			//center
			marginLeft = (sunShineWidth - windowWidth) / 2 * (-1);
			$('#background-img').css('margin-left', marginLeft);
			
		}else{
			//height << width --> full width
			var scale = windowWidth / imgWidth;
			$('#background-img').width(windowWidth);
			var sunShineHeight = imgHeight * scale;
			$('#background-img').height(sunShineHeight);
		
			//$('#sunShine img').css('width', '100%');
			//$('#sunShine img').css('height', '100%');
			
			//center
			marginTop = (sunShineHeight - windowHeight) / 2 * (-1);
			$('#background-img').css('margin-top', marginTop);
		}
		
		
	}
	
	var stepLeft = windowWidth * 0.03 + 240;
	$(".notice").css("left", stepLeft );
	$(".notice-arrow").css("left", stepLeft-50 );
	
	$("#camping-people input").click(function(){
		$("#notice-step0").fadeOut(800);
		$("#notice-arrow0").fadeOut(800);
		$("#notice-step1").fadeIn(1200);
		$("#notice-arrow1").fadeIn(1200);
	});
	
	/*
	
	if( windowWidth <= 960 )
	{
		$("#background").width(960);
		$("#background").height(480);
		$("#container").height(480);
		
	}
	else
	{
		$("#header-container").height(windowWidth/2);
		
	}
	*/
	
	
	//diy-button
	$("#diy-button").hover( diyButtonIn, diyButtonOut);
	
	function diyButtonIn()
	{
		if(diy == 0 && oneKey == 0) $("#diy-button").css("background", "url(../static/image/button2.png)");
	}
	
	function diyButtonOut()
	{
		if(diy == 0 && oneKey == 0) $("#diy-button").css("background", "url(../static/image/button.png)");
	}
	
	
	function stepMinusOne(){
		
		disableBasicInput();
		blinkBoy();
		needNumber = campingPeople;
		$("#suggestion-number").text(needNumber);
		$("#notice-step1").fadeOut(400);
		$("#notice-arrow1").fadeOut(400);
		
		if(diy == 0 && oneKey == 0)
		{
		//one-key disappear
			$("#diy-button").effect("drop", {direction:"up"});
			$("#do-not-worry").effect("drop", {direction:"up"});
			$("#one-key-button").effect("drop", {direction:"up"});
			$("#diy-button").effect("slide", {direction:"left"});
		//bag appear	
			$("#bag-head").fadeIn(800);
			
		//step1
        	$("#item-detail").effect("drop", {mode:"show",direction:"left"});
			
			diy = 1;
			$("#begin-order a").css("cursor","default");
		}
	}
	
	
	
	
	
	
	$("#diy-button").click(function() 
	{
		var cont = submit_form(1);
		
		if(cont == 1){
			
			stepMinusOne();
		}
		
		
    });
	
	
	//one-key-button
	$("#one-key-button").hover( oneKeyButtonIn, oneKeyButtonOut);
	
	function oneKeyButtonIn()
	{
		if(diy == 0 && oneKey == 0) $("#one-key-button").css("background", "url(../static/image/buttonGreen2.png)");
	}
	function oneKeyButtonOut()
	{
		if(diy == 0 && oneKey == 0) $("#one-key-button").css("background", "url(../static/image/buttonGreen.png)");
	}
	
	
	
	
	function stepMinusOneOneKey(){
		disableBasicInput();
		setTimeout("window.location.href = $SCRIPT_ROOT + '/_go_to_choose_tickets';", 500 );
	}
	
	$("#one-key-button").click(function() 
	{
		var cont = submit_form(0);
		
		if(cont == 1 ){
			isLeaving = 1;
			stepMinusOneOneKey();
			
		}
		
    });
	
	
	function disableBasicInput()
	{
		departDate = $("#depart-date input").val();
		$("#depart-date").text(departDate);
		returnDate = $("#return-date input").val();
		$("#return-date").text(returnDate);
		campingPeople = $("#camping-people input").val();
		$("#camping-people").text(campingPeople);
	}
	
	//next-destination
	$("#next-destination").hover( nextDestinationButtonIn, nextDestinationButtonOut);
	
	function nextDestinationButtonIn()
	{
		$("#next-destination").css("background", "url(../static/image/button2.png)");
	}
	function nextDestinationButtonOut()
	{
		$("#next-destination").css("background", "url(../static/image/button.png)");
	}
	
	
	//next-step-button
	$("#next-step-button").hover( nextStepButtonIn, nextStepButtonOut);
	
	function nextStepButtonIn()
	{
		if(stepNum != 5) $("#next-step-button").css("background", "url(../static/image/button2.png)");
	}
	function nextStepButtonOut()
	{
		if(stepNum != 5) $("#next-step-button").css("background", "url(../static/image/button.png)");
	}
	
	
	
	
	$("#next-step-button").click(function()
	{
		step();
	});
	
	$("#skip-step-button").click(function()
	{
		
		stepback();
	});
	
	
	function blinkBoy(){
			$("#boy").fadeIn(1000);
			/*
			$('#boy').fadeOut(50);
			$("#boy").fadeIn(100);
			$('#boy').fadeOut(50,function(){
				$("#boy").attr("src","../static/image/boy/boy_grey.png");
			});
			$('#boy').fadeIn(50,function(){
				$("#boy").attr("src","../static/image/boy/boy_origin.png");
			});
			$('#boy').fadeOut(50,function(){
				$("#boy").attr("src","../static/image/boy/boy_grey.png");
			});
			$('#boy').fadeIn(50,function(){
				$("#boy").attr("src","../static/image/boy/boy_origin.png");
			});
			$('#boy').fadeOut(50,function(){
				$("#boy").attr("src","../static/image/boy/boy_tent.png");
			});
			$('#boy').fadeIn(200);
			*/
			
		}
	
	
	function changeBoy(e){
		$("#boy").fadeOut(400);
		setTimeout('$("#boy").attr("src","../static/image/boy/boy_'+e+'.png");', 400 );
		
		$("#boy").fadeIn(400);
	}
	
	
	function step0(){
		needNumber = r["tent2"].num + r["tent4"].num + r["tent8"].num;
				alreadyNumber = 0;
				$("#already-number").text(alreadyNumber);
				$("#suggestion-number").text(needNumber-alreadyNumber);
				//updateAlreadyNumber();
				
				$("#suggestion-object").text("个帐篷没有防潮垫哦~");
				$("#step0-tent").effect("drop", {mode:"hide",direction:"right"});
				$("#item-detail").effect("drop", {mode:"hide",direction:"right"});
				
				changeBoy('pad');
				
				$("#step1-pad").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#item-detail").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#already-class").text("防潮垫");
				$("#object-class").text("帐篷");
				$("#next-step-button p").text("下一步，预定睡袋！");
				stepNum ++;
				$("#bag-tent").children("td").eq(1).html(r["tent2"].num+r["tent4"].num+r["tent8"].num);
				$("#bag-tent").css("display","block");
				//$("<tr id='bag-tent' style='display:block'><td>帐篷：</td><td>"+(r["tent2"].num + r["tent4"].num + r["tent8"].num)+"</td><td>个</td></tr>").insertAfter($("#bag-head"));
	}
	
	function step1(){
		needNumber = campingPeople;
				alreadyNumber = 0;
				$("#already-number").text(alreadyNumber);
				$("#suggestion-number").text(needNumber-alreadyNumber);
				
				$("#suggestion-object").text("个人没有睡袋哦~");
				$("#step1-pad").effect("drop", {mode:"hide",direction:"right"});
				$("#item-detail").effect("drop", {mode:"hide",direction:"right"});
				
				changeBoy('sleepingbag');
				$("#step2-sleepingbag").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#item-detail").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#already-class").text("睡袋");
				$("#object-class").text("人");
				$("#next-step-button p").text("下一步，预定帐篷灯！");
				//alert(stepNum);
				stepNum ++;
				$("#bag-pad").children("td").eq(1).html(r["pad"].num);
				$("#bag-pad").css("display","block");
				//$("<tr id='bag-pad' style='display:block'><td>防潮垫：</td><td>"+ r["pad"].num + "</td><td>个</td></tr>").insertAfter($("#bag-tent"));
				
	}
	
	function step2(){
		
				needNumber = r["tent2"].num + r["tent4"].num + r["tent8"].num;
				alreadyNumber = 0;
				$("#already-number").text(alreadyNumber);
				$("#suggestion-number").text(needNumber-alreadyNumber);
				
				$("#suggestion-object").text("个帐篷没有帐篷灯哦~");
				$("#step2-sleepingbag").effect("drop", {mode:"hide",direction:"right"});
				$("#item-detail").effect("drop", {mode:"hide",direction:"right"});
				
				changeBoy('light');
				$("#step3-light").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#item-detail").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#already-class").text("帐篷灯");
				$("#object-class").text("帐篷");
				$("#next-step-button p").text("是否需要登山包？");
				//alert(stepNum);
				stepNum ++;
				$("#bag-sleepingbag").children("td").eq(1).html(r["sleepingbag"].num);
				$("#bag-sleepingbag").css("display","block");
				//$("<tr id='bag-sleepingbag' style='display:block'><td>睡袋：</td><td>"+ r["sleepingbag"].num + "</td><td>个</td></tr>").insertAfter($("#bag-pad"));
				
	}
	
	function step3(){
		needNumber = campingPeople;
				alreadyNumber = 0;
				$("#already-number").text(alreadyNumber);
				$("#suggestion-number").text(needNumber-alreadyNumber);
				
				$("#suggestion-object").text("个人没有登山包哦~");
				$("#step3-light").effect("drop", {mode:"hide",direction:"right"});
				$("#item-detail").effect("drop", {mode:"hide",direction:"right"});
				
				changeBoy('backbag');
				$("#step4-backbag").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#item-detail").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#already-class").text("登山包");
				$("#object-class").text("人");
				$("#next-step-button p").text("选择露营地去~");
				stepNum ++;
				//$("<tr id='bag-light' style='display:block'><td>帐篷灯：</td><td>"+ r["light"].num + "</td><td>个</td></tr>").insertAfter($("#bag-sleepingbag"));
				$("#bag-light").children("td").eq(1).html(r["light"].num);
				$("#bag-light").css("display","block");
				
	}
	
	
	function stepback0(){
		window.location.href = $SCRIPT_ROOT + '/_equipment';	
	}
	
	function stepback1(){
		blinkBoy();
				$("#step1-pad").effect("drop", {mode:"hide",direction:"right"});
				$("#item-detail").effect("drop", {mode:"hide",direction:"right"});
        		$("#step0-tent").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#item-detail").delay(800).effect("drop", {mode:"show",direction:"left"});
				stepNum = 0;
				$("#begin-order a").css("cursor","default");
				$("#bag-tent").children("td").eq(1).html(r["tent2"].num+r["tent4"].num+r["tent8"].num);
	}
	function stepback2(){
		changeBoy('pad');
				$("#step2-sleepingbag").effect("drop", {mode:"hide",direction:"right"});
				$("#item-detail").effect("drop", {mode:"hide",direction:"right"});
        		$("#step1-pad").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#item-detail").delay(800).effect("drop", {mode:"show",direction:"left"});
				stepNum = 1;
				$("#bag-pad").children("td").eq(1).html(r["pad"].num);
	}
	function stepback3(){
		stepback3();	
				changeBoy('sleepingbag');
				$("#step3-light").effect("drop", {mode:"hide",direction:"right"});
				$("#item-detail").effect("drop", {mode:"hide",direction:"right"});
        		$("#step2-sleepingbag").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#item-detail").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#bag-sleepingbag").children("td").eq(1).html(r["sleepingbag"].num);
				stepNum = 2;
	}
	function stepback4(){
		stepback4();	
				changeBoy('light');
				$("#step4-backbag").effect("drop", {mode:"hide",direction:"right"});
				$("#item-detail").effect("drop", {mode:"hide",direction:"right"});
        		$("#step3-light").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#item-detail").delay(800).effect("drop", {mode:"show",direction:"left"});
				$("#bag-light").children("td").eq(1).html(r["light"].num);
				stepNum = 3;
	}
	
	
	function stepback()
	{
		
		$("#congratulation").css("display","none");
		$("#suggestion").css("display","block");
		
		switch (stepNum){
			case 0:
				stepback0();	
				
				break;
			case 1:
				stepback1();	
				
				
				
				break;
			case 2:
				stepback2();	
				
				
				break;
			case 3:
				
				stepback3();	
				break;
			case 4:
				
				stepback4();	
				break;
		}
	
		
	}
	
	function step()
	{
		
		$("#congratulation").css("display","none");
		$("#suggestion").css("display","block");
		
		switch (stepNum){
			case 0:
								
				var cont01 = submit_form_equipments('tent2');
				if(cont01 == 1){
					var cont02 = submit_form_equipments('tent4');
					if(cont02 == 1){
						var cont03 = submit_form_equipments('tent8');
						if(cont03 == 1){
							step0();
						}
					}
				}
				
				//alert(stepNum);
				break;
			case 1:
				
				var cont = submit_form_equipments('pad');
				
				if(cont == 1) step1();
				
				break;
			case 2:
				
				var cont = submit_form_equipments('sleepingbag');
				if(cont == 1) step2();
				
				break;
			case 3:
				
				
				var cont = submit_form_equipments('light');
				if(cont == 1) step3();
				
				//alert(stepNum);
				break;
			case 4:
				var cont = submit_form_equipments('backbag');
				if(cont == 1) {
					isLeaving = 1;
					window.location.href = $SCRIPT_ROOT + '/_go_to_choose_tickets';
				}
				break;
		}
	
		
	}
	
	

	
	
	$(window).resize(function() {
		pictureScale();
	});
	
});