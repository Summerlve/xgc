define(["jquery", "underscore", "backbone", "models"], function ($, _, Backbone, models){
	//侧边栏子栏按钮
	//此view将会很复杂，是ajax的开关 
	var sidebarSubBtnView =  Backbone.View.extend({
		initialize: function (){		
		},
		events: {
			"click": "sidebarSubBtnClick"
		},
		sidebarSubBtnClick: function () {
			this.toggleActive(this.$el);
			this.doAjax(this.dataIndex);
			return false;// 取消事件冒泡
		},
		toggleActive: function (o) {
			o.addClass("active").
				siblings("li.my-sidebar-subbtn").
				removeClass("active").
				parent().
			 	siblings("ul.my-sidebar-sub").
			 	children("li.my-sidebar-subbtn").
				removeClass("active");
		},
		doAjax: function (dataIndex) {
			switch(dataIndex){
				case 1 : {
					this.collection = new models.tableCollection({
						
						
					});
				}break;
				case 2 : {
							
				}break;
				case 3 : {
								
				}break;
				default:
				//default
			}
			
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
			this.toggleActive(this.$el);
			this.sidebarSubAnimate(this.$el);
			return false;// 取消事件冒泡
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
	
	//导航栏按钮
	var navbarBtnView = Backbone.View.extend({
		initialize: function (){			
		},
		events: {
			"click": "navbarBtnClick"
		},
		navbarBtnClick: function () {
			this.toggleActive(this.$el);
			this.toggleHeader(this.$el);
		},
		toggleActive: function (o) {
			o.addClass("active").
					siblings().
					removeClass("active");
		},
		toggleHeader: function (o) {
			var $header = $("span.my-sidebar-header-title");
			$header.text(o.text());
		}
	});
	
	return {
		navbarBtnView: navbarBtnView,
		sidebarBtnView: sidebarBtnView,
		sidebarSubBtnView: sidebarSubBtnView
	}
});