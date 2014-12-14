define(["jquery"], function($){
	require(["bootstrap"]); // 防止异步加载的时候bootstrap晚于jquery
	
	// 切换btn的.active
	function toggleActive (o) {
	
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
	}
	
	// 点击导航栏的btn切换header
	function toggleHeader (o) {	
		var $header = $("span.my-sidebar-header-title");
		$header.text(o.text());
	}
		
	// 点击侧边栏btn时，侧边栏子栏收缩展开的动画
	function sidebarSubAnimate (o) {	
	
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
	}
	
	//授权页面的动画效果
	function permissionAnimate() {
		$(".authMngr-fahr-checkbox input[type='checkbox']").on("click", function () {
	    	var isChecked = $(this).is(":checked");
	        $(this).closest("dt.authMngr-fahr-checkbox").
	                next("dd").
	                find("input[type='checkbox']").
	                prop("checked", isChecked);
	    });
	    
	    $(".authMngr-son-checkbox input[type='checkbox']").on("click", function () {
	        var $closestDD = $(this).closest("dd"),
	            allSonCheckbox = $closestDD.find("input[type='checkbox']"),
	            isChecked = false,
	            temp;
	
	        $.each(allSonCheckbox, function (key, value) {
	            temp = $(value).is(":checked");
	            if (temp === true){
	                isChecked = temp;
	            } 
	        });
	
	        $closestDD.
	                prev("dt").
	                find("input[type='checkbox']").
	                prop("checked", isChecked);
	    });
	}
	
	//初始化函数
	function init () {
	
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
		});
		
		//响应式中的menu按钮
		$menuButton.on("click", function (e) {	
			$(".collapse").collapse('toggle');
		});	
		
		//授权页面的动画效果，先判断，有再执行（添加事件）
		if ( $(".authMngr-fahr-checkbox").length !== 0) {
			permissionAnimate();
		}	
	};
	
	return {
		init: init
	};　　
});