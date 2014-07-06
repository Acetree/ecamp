		
		function validateMyAjaxInputsEquipment(e) {

    		
    		$.validity.start();
    
    		$('input[name='+e+']').match('number','请填写数字哦').range(0,99,'请填写0~99之间的数字哦');
			
    		var result = $.validity.end();
    		return result.valid;
			
			
		}
		
		
		function submit_form_equipments(e) {
			
			if (validateMyAjaxInputsEquipment(e)) {
				
				$.ajax({
            		type: "GET",
            		url: $SCRIPT_ROOT + '/_add_equipment',
            		data: {name:e, quantity:$('input[name='+e+']').val()},
            		dataType: "json",
            		success: function(data){
					
            		}
         		});
				return 1;
			}
			else{
				
				return 0;
			}
  		};
		
		
		function validateMyAjaxInputsBasic() {
			
			Date.prototype.yyyymmdd = function() {
   				var yyyy = this.getFullYear().toString();
   				var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   				var dd  = this.getDate().toString();
				return (mm.length==2?mm:"0"+mm[0]) + '/' + (dd.length==2?dd:"0"+dd[0]) + '/' + yyyy
   				
  			};

			d = new Date();
			
			
    		$.validity.start();
    
    		$('input[name="departDate"]').require('请填写出发时间哦').match('date','请选择日期，或者按mm/dd/yyyy格式输入').range(new Date(d.yyyymmdd()), new Date("07/04/2015"), '日期必须在今天之后，一年之内哦');
			$('input[name="returnDate"]').require('请填写返回时间哦').match('date','请选择日期，或者按mm/dd/yyyy格式输入').range(new Date($('input[name="departDate"]').val()), new Date("07/04/2015"), '返回日期必须在出发日期之后的一年以内哦');
    		$('input[name="campingPeople"]').require('请填写人数哦').match('number','人数是数字哦').range(1,30,'请填写1~30之间的人数，大于30人请返回首页选择“团队定制”');
    		
    		var result = $.validity.end();
    		return result.valid;
			
			
		}
		

		
		function submit_form(isDiy) {
			
			if (validateMyAjaxInputsBasic()) {
				
				$.ajax({
            		type: "GET",
            		url: $SCRIPT_ROOT + '/_start_order',
            		data: {depart_date:$('input[name="departDate"]').val(), return_date:$('input[name="returnDate"]').val(),camping_people:$('input[name="campingPeople"]').val(), is_diy:isDiy},
            		dataType: "json",
            		success: function(data){
						
            		}
         		});
				return 1;
        	}
			else{
				
				return 0;
			}
  		};
		