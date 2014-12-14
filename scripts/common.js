/*
 *
 */
require.config({
	paths: {		
		"jquery": "lib/jquery-2.1.1.min",
		"bootstrap": "lib/bootstrap.min",
		"underscore": "lib/underscore-min",
		"text": "lib/text",
		"datetimepicker": "lib/bootstrap-datetimepicker.min",
		"Animate": "module/common.animate",
		"Wechat": "module/common.wechat"
	},
	shim: {
		"underscore": {
			exports: "_"
		},
		"bootstrap": {
			deps: ["jquery"]
		},
		"datetimepicker": {
			deps: ["jquery", "bootstrap"]
		}
	}
});

require(["jquery"], function ($) {
	//正常页面
	if( $("#general-page").length ) {
		require(["Animate"], function (Animate) {
			Animate.init();
		});	
	}
		
	//微信页面
	if ( $("#my-wechatHoli-form").length ) {
		require(["Wechat"], function (Wechat) {
			Wechat.init(); 
		});
	}
});

