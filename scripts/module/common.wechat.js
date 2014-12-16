define(["jquery", "underscore", "bootstrap", "datetimepicker"], function ($, _) {

	// 初始化函数
	var init = function () {
	
		var $dataPickerBg = $("#my-wecharHoli-formDatetimeBg"),
			$dataPickerEd = $("#my-wecharHoli-formDatetimeEd"),
			$dataPikrRm = $(".my-dataPikrRm"),
			$submit = $(".form-group button[type='submit']"),
			$byx = $("button.byx"),
			today = new Date();
				
		// 审批时点击不允许
	    $byx.on("click", function() {
			alert("您真的不允许可怜的学生党请个假吗？");
			alert("您真的不允许可怜的学生党请个假吗？");
	    });
	    
		// 检测	
		if ( $dataPickerBg.length === 0) return;
		
		// 日期选择中文
		$.fn.datetimepicker.dates['zh-CN'] = {
				days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
				daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
				daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
				months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				today: "今天",
				suffix: [],
				meridiem: ["上午", "下午"]
		};
			
		// 初始化两个dataPicker  
		$dataPickerBg.datetimepicker({
	        language:  'zh-CN',
	        weekStart: 1,
	        todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
	        showMeridian: 1,
	        startDate: today,
	        format: "yyyy-mm-dd hh:ii"
	    }).on("changeDate", function (e) {
			// 当选完开始时间之后，设置结束时间不能早于开始时间
			$dataPickerEd.datetimepicker( 'setStartDate', $("#timeBg").val() );
		});
	    
	    $dataPickerEd.datetimepicker({
	        language:  'zh-CN',
	        weekStart: 1,
	        todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
	        showMeridian: 1,
	        startDate: today,
	        format: "yyyy-mm-dd hh:ii"
	    }).on("changeDate", function (e) {
			$dataPickerBg.datetimepicker( 'setEndDate', $("#timeEd").val() );
		});
	    
	    // 点击x
	    $dataPikrRm.on("click" ,function (e) {
	    	// 两个时间选择器的初始时间都重置
	    	$dataPickerBg.datetimepicker( 'setEndDate', null );
			$dataPickerEd.datetimepicker( 'setStartDate', today );
			
			// placeholder恢复
	    	var $curInput = $(this).parent("span").siblings("input");
			$curInput.val($curInput.attr("placeholder"));
	    });
	    
	    // 点击提交申请
	    $submit.on("click", function (e) {
		 	var $curForm = $(".form-control"),
		 		isFill = true;
		 	
		 	_.each($curForm, function (o) {
			 	if (!$(o).val()){
			 		isFill = false
			 	}
		 	});
		 	
		 	if (isFill === false) {
			 	alert("请填写完申请");
			 	return false;
		 	}
		 	
		 	// 表单验证，验证电话号码	 	
	    }); 	    
	};
	
	return {
		init: init
	};	 	  
});