/*
 *先看完backbone，再重写一遍
 *
 */
var core = (function (core, $) {

	//缓存
	var content = {
			" ": " "
	};
			
	// 切换btn的.active
	var toggleActive = function (o) {
	
		var className = "active";
		switch (true) {
			case o.hasClass("my-navbar-btn"): {
			
				// 导航栏按钮
				o.addClass(className).
					siblings().
					removeClass(className);
			}break;
			case o.hasClass("my-sidebar-btn"): {
			
				// 侧边栏按钮
				o.addClass(className).
					siblings().
					removeClass(className);
			}break;
			case o.hasClass("my-sidebar-subbtn"): {
			
				// 侧边栏子栏按钮
				o.addClass(className).
					siblings("li.my-sidebar-subbtn").
					removeClass(className).
					parent().
				 	siblings("ul.my-sidebar-sub").
				 	children("li.my-sidebar-subbtn").
					removeClass(className);
			}break;
			default:
				//default 
		}	
	};
	
	// 点击导航栏的btn切换header
	var toggleHeader = function (o) {	
		var $header = $("span.my-sidebar-header-title");
		$header.text(o.text());
	};
		
	// 点击侧边栏btn时，侧边栏子栏收缩展开的动画
	var sidebarSubAnimate = function (o) {	
	
		var	$allSidebarSub = $("ul.my-sidebar-sub"),
			$cur = o.next("ul.my-sidebar-sub");
		
		// 将其他的my-sidebar-sub进行slideUp
		if ($allSidebarSub.is(":visible")){
			$allSidebarSub.slideUp();
		}
		
		// 优化动画效果
		if ($cur.is(":animated")){
			$cur.stop(true);
		}
		
		$cur.slideToggle();
	};
	
	// ajax函数，自己封装
	var ajax = function () {
		
	};
	
	//表单的上传等处理
	var form = function () {
		
	}
	
	//点击侧边栏子栏btn，加载内容
	var loadContent = function (o) {
	
		var curName = o.attr("data-index"),
			$content = $("#content");
		
		// 遍历content对象
		$.each(content, function (name, value) {
			if (curName === name) {				
				$content.empty().append(value);
			} else {
			
				// ajax 加载，添加到div.content 并且存入content
				
				//一下为测试用数据，实际要用ajax加载
				var $tmp = $("<li>" + curName +"</li>");
				$content.
					empty().
					append($tmp);
								
				// 添加到content里面，作为缓存
				content[curName] = $tmp;
			}
		});
	}
		
	// 初始化，绑定事件等
	core.init = function () {
	
		var $allNavbarBtn = $("a.my-navbar-btn"),
			$allSidebarBtn = $("li.my-sidebar-btn"),
			$allSidebarSubBtn = $("li.my-sidebar-subbtn"),
			$header = $("span.my-sidebar-header-title");
		
		// 初始化header
		var header = $allNavbarBtn.filter(".active").text();
		$header.text(header);
	
	    // 点击导航栏btn	
		$allNavbarBtn.on("click", function (e) {
			toggleActive($(this));
			toggleHeader($(this));
			e.stopPropagation();
		});
		
		// 点击侧边栏btn
		$allSidebarBtn.on("click", function (e) {
			toggleActive($(this));
			sidebarSubAnimate($(this)); // 侧边栏子栏收缩展开动画
			e.stopPropagation();
		});
				
		// 点击侧边栏子栏btn
		$allSidebarSubBtn.on("click", function (e) {
			toggleActive($(this));
			loadContent($(this));
		});
	}

	return core;
}(core || {}, jQuery));


$(function (){
	
	// 调用init方法，进行初始化
	core.init();	
});
