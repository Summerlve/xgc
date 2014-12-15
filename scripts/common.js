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
		"zTree": "lib/jquery.ztree.all-3.5.min",
		"ajaxapi": "lib/ajaxapi",
		"think": "lib/think",
		"qtip": "lib/jquery.qtip.min",
		"Animate": "module/common.animate",
		"Ajax": "module/common.ajax",
		"Wechat": "module/common.wechat"		
	},
	shim: {
		"jquery": {
			exports: "$"
		},
		"underscore": {
			exports: "_"
		},
		"bootstrap": {
			deps: ["jquery"]
		},
		"datetimepicker": {
			deps: ["jquery", "bootstrap"]
		},
		"zTree": {
			deps: ["jquery"]
		},
		"ajaxapi": {
			deps: ["jquery"]
		},
		"think": {
			deps: ["jquery"]
		},
		"qtip": {
			deps: ["jquery"],
			exports: "qtip"
		}
	}
});

require(["Animate", "Wechat", "Ajax"], function (Animate, Wechat, Ajax) {
	Animate.init();
	Ajax.init();
	Wechat.init();
});

