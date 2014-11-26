/*
 * 学工处用
 *
 *
 *
 */

//RequireJS配置
require.config({
	baseUrl: "scripts/lib/",
	paths: {
		"jquery": "jquery-2.1.1.min",
		"underscore": "underscore-min",
		"backbone": "backbone-min",
		"views": "../views/views",
		"models": "../models/models",
		"routers": "../routers/routers",
	},
	shim: {
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"underscore": {
　　　　　　　exports: "_"
		}
	}
});

require(["jquery", "underscore", "backbone"], function ($, _, Backbone) {
	require(['views'], function (views){
		var	$allSidebarBtn = $("li.my-sidebar-btn"),
			$allSidebarSubBtn = $("li.my-sidebar-subbtn"),
			allSidebarBtnView = [],
			allSidebarSubBtnView = [];
			
		$.each($allSidebarBtn, function (key, value) {
			var view = new views.sidebarBtnView({
				el: value
			});
			allSidebarBtnView.push(view);
		});
		
		$.each($allSidebarSubBtn, function (key, value) {
			var view = new views.sidebarSubBtnView({
				el: value
			});
			allSidebarSubBtnView.push(view);
		});
　	});



});
