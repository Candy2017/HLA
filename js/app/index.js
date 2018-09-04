define(["jquery", "layui"], function ($) {
    var newCtrl = {};
    newCtrl.init = function (page) {
        
        layui.use('element', function () {
            var element = layui.element;



        });
        $('.language').click(function(){
            $('.select-lan').slideToggle(100);
            var icon = $(this).find('span');
            if($(icon).hasClass('layui-icon-down')){
                $(icon).removeClass('layui-icon-down').addClass('layui-icon-up')
            }else{
                $(icon).removeClass('layui-icon-up').addClass('layui-icon-down')
            }
        })
    };


    return newCtrl;
})