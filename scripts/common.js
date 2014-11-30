/*
 *
 *
 */
require.config({
	paths: {		
		"jquery": "lib/jquery-2.1.1.min",
		"bootstrap": "lib/bootstrap.min",
		"underscore": "lib/underscore-min",
		"text": "lib/text",
		"coreAjax": "core/core.ajax",
		"coreAnimate": "core/core.animate"	
	},
	shim: {
		"underscore": {
			exports: "_"
		}
	}
});

require(["jquery", "underscore", "coreAjax", "coreAnimate", "bootstrap"], function ($, _, Ajax, Animate, bs) {
		
	var $allNavbarBtn = $("a.my-navbar-btn"),
		$allSidebarBtn = $("li.my-sidebar-btn"),
		$allSidebarSubBtn = $("li.my-sidebar-subbtn"),
		$header = $("span.my-sidebar-header-title"),
		$menuButton = $("button.my-navbar-mobile-menu");
	
	// 初始化header
	var header = $allNavbarBtn.filter(".active").text();
	$header.text(header);
	
	// 点击导航栏btn	
	$allNavbarBtn.on("click", function (e) {
		Animate.toggleActive($(this));
		Animate.toggleHeader($(this));
		e.stopPropagation();
	});
	
	// 点击侧边栏btn
	$allSidebarBtn.on("click", function (e) {
		Animate.toggleActive($(this));
		Animate.sidebarSubAnimate($(this)); // 侧边栏子栏收缩展开动画
		e.stopPropagation();
	});
			
	// 点击侧边栏子栏btn
	$allSidebarSubBtn.on("click", function (e) {
		Animate.toggleActive($(this));
		Ajax.loadContent($(this).data("index"));
	});
	
	$menuButton.on("click", function (e) {
		$('.collapse').collapse('toggle');
	});	
});

