define(["jquery", "underscore", "zTree", "ajaxapi"], function(){
	
	// 缓存
	var cache = {
			" ": " "
	};
				
	// 办公系统页面的ajax处理
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
			// default
		}				
	};
	
	// 表单的上传等处理
	var form = function () {
		
	}
	
	// 点击侧边栏子栏btn，加载内容
	// 根据dataIndex来进行判断
	// 分各个页面进行处理
	var loadContent = function (dataIndex) {
		var	$content = $("#content");
			
		// 遍历content对象
		$.each(cache, function (name, value) {
			if (name == dataIndex) {		
				
				// 如果缓存中有，则取出来		
				$content.html(value);
			} else {
				// 如果没有则ajax 加载，添加到div.content 并且存入content
				switch(true){
					case (dataIndex >= 1 && dataIndex <= 15) : {
						
						// 办公系统
						var html = ajaxForWorkSys(dataIndex)();
						$content.html(html);		
					}break;
					case (dataIndex >= 16 && dataIndex <= 20) : {
								
					}break;
					case 3 : {
									
					}break;
					default:
					// default
				}
			}
		});
	}
	
	
	// zTree初始化
	function zTreeInit () {
	
		// 检测
		if ( $("#hehe").length === 0) return ;
		
		// 发送选中项的id会服务器，json
		$("#sendBtn").on("click", function (e) {
			var zTreeObj = $.fn.zTree.getZTreeObj("treeDemo"),
				data = [];
			var datastring = "";
								
			_.each(zTreeObj.getCheckedNodes(true), function (o) {
				if (o.level !== 0) {
					data.push(o.id);
					datastring += o.id + ","; 
				}
			});
			
			$("#tempBtn").attr("value", datastring.slice(0, datastring.length-1))
			
			/*
				$.ajax({
				type: "post",
				data: "checked="+JSON.stringify(data),
				url: "http://202.195.67.56/xgxt/admin.php?s=Display/getId",
				dataType: "json",
				success: function (data) {
					console.log(data);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(textStatus);
				}
			})
			*/
			
		});
		
	
		$("#hehe").on("click", function (e) {
			togglezTree($(this).next("ul#treeDemo"));
		});
		
		var togglezTree = function (o) {
			$(o).slideToggle("300");
		};
		
		// 用于捕获 checkbox / radio 被勾选 或 取消勾选的事件回调函数
		var onCheck = function (e, treeId, treeNode) {		
			var zTreeObj = $.fn.zTree.getZTreeObj("treeDemo"),
				value = "";
				
			 _.each(zTreeObj.getCheckedNodes(true), function (key) {
				return function (o) {
					if (o.level !== 0) {
						value += o[key] + ",";
					}
				}
			}("name"));
							
			$("#hehe").attr("value", value.slice(0, value.length-1));		
		};

		// 点击zTree的节点之前的回调函数
		// checkNode() 方法可以触发 beforeCheck / onCheck 事件回调函数。便于减少冗余代码
		var beforeClick = function (treeId, treeNode) {
			var zTreeObj = $.fn.zTree.getZTreeObj("treeDemo");
			zTreeObj.checkNode(treeNode, null, true, true);
			return false;
		};
		
		// 创建并添加zTreeNode
		var createzTreeNode = function (parent, o) {	
			var node = {
				id: o.id, 
				pId: parent && parent.id ? parent.id : 0, 
				name: o.title 
			};
			
			return node;
		};
		
		//对ajax获取到的data进行预处理
		var dataFilter = function (treeId, parentNode, responseData) {
			var zNodes = [],
				node = {};
			if (responseData) {
				_.each(responseData, function (o) {
					if(o._child) {
						zNodes.push(createzTreeNode(null, o));
						
						_.each(o._child, function (s) {
							zNodes.push(createzTreeNode(o, s));
						});
					} else {
						zNodes.push(createzTreeNode(null, o));
					}
				});
			}
			
			return zNodes;
		};

		var settings = {
			async: {
				enable: true,
				type: "get",
				url: "http://202.195.67.56/xgxt/admin.php?s=Display/getMenu",
				dataFilter: dataFilter
			},
			check: {
				enable: true, // 设置 zTree 的节点上是否显示 checkbox / radio
				chkStyle: "checkbox",
				chkType: {
					"Y": "ps",
					"N": "ps"
				}
			},
			view: {
				dblClickExpand: true
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onCheck: onCheck,
				beforeClick: beforeClick
			}
		};
		
		$.fn.zTree.init($("#treeDemo"), settings, null);
	}
	
	function init () {
		zTreeInit();
	}
　　
	return {
		init: init
	};
});