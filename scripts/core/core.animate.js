define(["jquery"], function($){
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
	
	return {
		toggleActive: toggleActive,
		toggleHeader: toggleHeader,
		sidebarSubAnimate: sidebarSubAnimate
	}
　　　
});