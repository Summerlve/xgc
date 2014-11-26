define(["jquery", "underscore", "backbone"], function ($, _, Backbone){
	//侧边栏子栏按钮
	//此view将会很复杂，是ajax的开关 
	var sidebarSubBtnView =  Backbone.View.extend({
		initialize: function (){	
			
		},
		events: {
			"click": "sidebarSubBtnClick"
		},
		sidebarSubBtnClick: function () {
			this.toggleActive(this.$el)
		},
		toggleActive: function (o) {
			o.addClass("active").
				siblings("li.my-sidebar-subbtn").
				removeClass("active").
				parent().
			 	siblings("ul.my-sidebar-sub").
			 	children("li.my-sidebar-subbtn").
				removeClass("active");
		}
	});
	
	//侧边栏按钮
	var sidebarBtnView = Backbone.View.extend({
		initialize: function (){	
			
		},
		events: {
			"click": "sidebarBtnClick"
		},
		sidebarBtnClick: function () {
			this.toggleActive(this.$el)
			this.sidebarSubAnimate(this.$el)
		},
		toggleActive: function (o) {
			o.addClass("active").
					siblings().
					removeClass("active");
		},
		sidebarSubAnimate: function (o) {
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
	});
	
	return {
		sidebarBtnView: sidebarBtnView,
		sidebarSubBtnView: sidebarSubBtnView
	}
});