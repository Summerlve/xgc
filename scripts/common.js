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
		var $allNavbarBtn = $("a.my-navbar-btn"),
			$allSidebarBtn = $("li.my-sidebar-btn"),
			$allSidebarSubBtn = $("li.my-sidebar-subbtn"),
			allNavbarBtnView = [],
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
				el: $(value),
				dataIndex: $(value).data("index")
			});	
			allSidebarSubBtnView.push(view);
		});
		
		$.each($allNavbarBtn, function (key, value){
			var view = new views.navbarBtnView({
				el: value
			});
			allNavbarBtnView.push(view);		
		});	
　	});

	require(['models'], function (models){
		
		var tableCollection = new models.tableCollection;
	});
	
	$.getJSON("http://202.195.67.56/xgxt1/admin.php?s=/AuthManager/index.html",
		
		 function (data) {
			console.log(data);
		});
	
		
});
