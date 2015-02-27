// model
var resultItem = Backbone.Model.extend({
	defaults: {
		timeRange: "",
		isAllow: "",
		kind: "",
		reason: ""
	}	
});

// collection
var resultList = Backbone.Collection.extend({
	model: resultItem,
	localStorage: new Backbone.LocalStorage("results")
});
var results = new resultList(); // 所有结果

// view
var appView = Backbone.View.extend({
	template: _.template($("#appView").html()),
	render: function () {
		this.$el.html(this.template());
		return this;
	},
});
var App = new appView(); // App的初始界面

var applyView = Backbone.View.extend({
	template: _.template($("#applyView").html()),
	events: {
		"click .my-wechatHoli-returnBtn": "returnBtnClick"
	},
	initialize: function () {
		_.bindAll(this, "returnBtnClick");
/* 		$("body").on("click", ".my-wechatHoli-returnBtn", this.returnBtnClick.bind(this)); */
	},
	render: function () {
		this.$el.html(this.template());
		return this;
    },
    returnBtnClick: function (e) {
    	this.remove();
    	router.navigate("", {trigger: true, replace: true});
    },
	timePickerInit: function  () {
		// 时间选择器的初始化函数
		var $dataPickerBg = $(".my-wecharHoli-formDatetimeBg");
		var	$dataPickerEd = $(".my-wecharHoli-formDatetimeEd");
		var	$dataPikrRm = $(".my-dataPikrRm");
		var	$submit = $("form button[type='submit']");
		var	today = new Date( Date.parse( new Date() ) + 30*60*1000 );
			  
		// 检测	
		if ( $dataPickerBg.length === 0) return;
		
		// 日期选择中文
		$.fn.datetimepicker.dates['zh-CN'] = {
				days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
				daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
				daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
				months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				today: "今天",
				suffix: [],
				meridiem: ["上午", "下午"]
		};
		
		// 初始化两个dataPicker  
		$dataPickerBg.datetimepicker({
		    language:  'zh-CN',
		    weekStart: 1,
		    todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
		    showMeridian: 1,
		    startDate: today,
		    format: "yyyy-mm-dd hh:ii"
		}).on("changeDate", function (e) {
			// 当选完开始时间之后，设置结束时间不能早于开始时间
			$dataPickerEd.datetimepicker("setStartDate", $("#timeBg").val());
		});
		
		$dataPickerEd.datetimepicker({
		    language:  'zh-CN',
		    weekStart: 1,
		    todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
		    showMeridian: 1,
		    startDate: today,
		    format: "yyyy-mm-dd hh:ii"
		}).on("changeDate", function (e) {
			$dataPickerBg.datetimepicker("setEndDate", $("#timeEd").val());
		});
		
		// 点击x
		$dataPikrRm.on("click" ,function (e) {
			today = new Date( Date.parse( new Date() ) + 30*60*1000 );
			// 两个时间选择器的初始时间都重置
			$dataPickerBg.datetimepicker("setEndDate", null);
			$dataPickerEd.datetimepicker("setStartDate", today);
			
			// placeholder恢复
			var $curInput = $(this).prev("input");
			$curInput.val("");
		});
		
		// 点击提交申请
		$submit.on("click", function (e) {
			console.log("`132");
		 	var $curForm = $(".form-control"),
		 		isFill = true;
		 	
		 	_.each($curForm, function (o) {
			 	if (!$(o).val()){
			 		isFill = false
			 	}
		 	});
		 	
		 	if (isFill === false) {
			 	alert("请填写完申请");
			 	return false;
		 	}
		 	
		 	// todo 表单验证，验证电话号码	 	
		}); 	    
	}
});
var apply = new applyView(); // 请假申请	

var resultView = Backbone.View.extend({
	template: _.template($("#resultView").html()),
	events: {
		"click .my-wechatHoli-returnBtn": "returnBtnClick"
	},
	initialize: function () {
		_.bindAll(this, "returnBtnClick");
/* 		$("body").on("click", ".my-wechatHoli-returnBtn", this.returnBtnClick); */
		results.fetch(); // 获取结果
	},
  	render: function () {
  		var tableView = new resultTableView();
	  	this.$el.html(this.template()).find(".my-wechatHoli-content").append(tableView.render().el);
		return this;
    },
	returnBtnClick: function (e) {
    	this.remove();
    	router.navigate("", {trigger: true, replace: true});
    }
});
var result = new resultView(); // 查看结果

var resultTableView = Backbone.View.extend({
	tagName: "table",
	className: "table",
	initialize: function () {
		_.bindAll(this, "addOne");
	},
	render: function () {
		results.each(this.addOne);
		return this;
	},
	addOne: function (model) {
	    var item = new resultItemView({model: model});
		this.$el.append(item.render().el);
    }
});

var resultItemView = Backbone.View.extend({
	tagName: "tr",
/* 	className: "warning", */
	template: _.template($("#resultItemView").html()),
	events: {
		"click a": "details"
	},
	initialize: function () {
		_.bindAll(this, "render", "details");
	},
	render: function () {
		var miniResults = {}
		miniResults.timeRange = this.model.get("timeRange");
		miniResults.isAllow = this.model.get("isAllow");
		this.$el.html(this.template(miniResults));
		return this;
	},
	details: function (e) {
		e.preventDefault();
		var details = new detailsView({model: this.model});
		result.remove();
		$("body").prepend(details.render().el);
	}
});

var detailsView = Backbone.View.extend({
	template: _.template($("#detailsView").html()),
	events: {
		"click .my-wechatHoli-returnBtn": "returnBtnClick"
	},
	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	returnBtnClick: function () {
		this.remove();
		result = new resultView();
		$("body").prepend(result.render().el);
	}
});

var previousView = null; // 前一个View

// router
var appRouter = Backbone.Router.extend({
	routes: {
		"": "AppInit",
		"apply": "apply",
		"result": "result",
	},
	initialize: function (options) {
		Backbone.history.start();
	},
	apply: function () {
		App.remove();
		apply = new applyView(); // tmd ncbug卧槽
		previousView = apply;
		$("body").prepend(apply.render().el).removeClass("my-wechatHoli-body");
		apply.timePickerInit();
	},
	result: function () {
		App.remove();
		result = new resultView(); // tmd ncbug卧槽
		previousView = result;
		$("body").prepend(result.render().el).removeClass("my-wechatHoli-body");
	},
	AppInit: function () {
		if (previousView !== null) previousView.remove();
		$("body").prepend(App.render().el).addClass("my-wechatHoli-body");
	}
});
var router = new appRouter(); // 路由


