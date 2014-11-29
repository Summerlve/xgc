define(["jquery", "underscore"], function($, _){
	
	//缓存
	var cache = {
			" ": " "
	};
				
	// ajax函数，自己封装
	var ajaxForWorkSys = function (dataIndex) {
		switch(dataIndex){
			case 1 : {
				return function () {
					$.ajax({
						type: "GET",
						url: "http://202.195.67.56/xgxt1/admin.php?s=/AuthManager/index.html",
						dataType: "json",
						success: function (data) {
							require(["text!templates/template.html"], function(tpl){
								var wrapData = {
									data: data
								}
								var html = _.template(tpl)(wrapData);
								
								$("#content").html(html);
								
								// 添加到content里面，作为缓存
								cache[dataIndex] = html;
							});	
						},
						error: function (){
							console.log("error");
						}
					});
				};	
			}break;
			case 2 : {
				return function () {
					
				};			
			}break;
			case 3 : {
				return function () {
					
				}					
			}break;
			default:
			//default
		}				
	};
	
	//表单的上传等处理
	var form = function () {
		
	}
	
	//点击侧边栏子栏btn，加载内容
	var loadContent = function (dataIndex) {
	
		var	$content = $("#content");
			
				
			
		// 遍历content对象
		$.each(cache, function (name, value) {
			console.log("name: " + name);
			if (name == dataIndex) {		
				
				//如果缓存中有，则取出来		
				$content.html(value);
			} else {
			
				// 如果没有则ajax 加载，添加到div.content 并且存入content
				var html = ajaxForWorkSys(dataIndex)();
				$content.html(html);
			}
		});
	}
　　
	return {
		ajaxForWorkSys: ajaxForWorkSys,
		loadContent: loadContent
	}　
});