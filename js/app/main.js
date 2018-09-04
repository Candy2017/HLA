require.config({
	paths:{
		jquery:"../lib/jquery.min",
		layui:"../../layui/layui"
	},
	shim:{
		
	}
});
require(['jquery'],function($){
	var currentPage = $("#current-page").attr("current-page");
	var targetModule = $("#current-page").attr("target-module");
	if(targetModule){
		//页面加载完毕后再执行相关业务代码比较稳妥
		$(function(){
			require([targetModule],function(targetModule){
				// 不要在这里写业务代码
	          	//全部统一调用init方法
				  //也就是每个模块都暴露一个init方法用于事件监听，页面内容加载等
	          	targetModule.init(currentPage);
			})
		});
		return;
	}
});   