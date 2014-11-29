define(["jquery", "underscore"], function($, _){
	
	//缓存
	var cache = {
			" ": " "
	};
				
	//办公系统页面的ajax处理
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
	//根据dataIndex来进行判断
	//分各个页面进行处理
	var loadContent = function (dataIndex) {
		var	$content = $("#content");
			
		// 遍历content对象
		$.each(cache, function (name, value) {
			if (name == dataIndex) {		
				
				//如果缓存中有，则取出来		
				$content.html(value);
			} else {
				// 如果没有则ajax 加载，添加到div.content 并且存入content
				switch(true){
					case (dataIndex >= 1 && dataIndex <= 15) : {
						
						//办公系统
						var html = ajaxForWorkSys(dataIndex)();
						$content.html(html);		
					}break;
					case (dataIndex >= 16 && dataIndex <= 20) : {
								
					}break;
					case 3 : {
									
					}break;
					default:
					//default
				}
			}
		});
	}
　　
	return {
		ajaxForWorkSys: ajaxForWorkSys,
		loadContent: loadContent
	}　
});