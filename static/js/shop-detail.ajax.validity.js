		function submit_form_order_info() {
			if (validateMyAjaxInputOrderInfo()) {
				$.ajax({
            		type: "GET",
            		url: $SCRIPT_ROOT + '/_order_info',
            		data: {doInsurance:$('input[name="insurance"]:checked').val(), note1:$('textarea[name="note1"]').val()},
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
		
		
			
		function validateMyAjaxInputOrderInfo() {

    		
    		$.validity.start();
    
    		$('textarea[name="note1"]').maxLength( 140 , '最多可以写140个汉字哦' )
			
    		var result = $.validity.end();
    		return result.valid;
			
			
		}
		
		function validateMyAjaxInputContactInfo() {

    		
    		$.validity.start();
			
			$('input[name="name"]').require('请输入您的姓名哦').maxLength( 4, '最多可以输入四个汉字哦' );
			
    		$('input[name="email"]').require('请输入您的电子邮箱哦').match( 'email', '电子邮箱格式填错了哦' );
			$('input[name="tel"]').require('请输入您的电话哦').match('number','手机号码是11位数字哦').maxLength(11, '手机号码是11位数字哦').minLength(11, '手机号码是11位数字哦');
    		$('textarea[name="note2"]').maxLength( 140 , '最多可以写140个汉字哦' );
			
    		var result = $.validity.end();
    		return result.valid;
			
			
		}