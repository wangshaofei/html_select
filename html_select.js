/**
 *  一个jquery的拓展。
 *  这个拓展是用来需要美化html的select控件的html页面。
 *     原理：1、用css将select的样式写好（定义class），
 *           2、影藏select
 *           3、创建div作为select的选择框并赋予select的样式，创建ul作为下拉框
 *           4、添加事件
 *           5、修改成需要的样式。
 *     使用方法：
 *           1、$('#select的id').dropDown({
 *                  'class' : 添加的class名称,
 *                  'callback' : 毁掉函数,
 *               })。
 */

//应用严格模式
'use strict';

// 添加jquery拓展
$.fn.extend({
    // dropDown 方法
    'dropDown': function(config) {
        // src select控件对象
        var src = $(this);
        src.hide();
        
        // 创建新的选择框
        var d = $('<div>');
        d.attr('id', 'dropDown_' + src.attr('id'));
        d.addClass($(src).attr('class'));
        
        
        // 设置默认值
        d.text(src.find('option[value=' + src.val() + ']').text() !== '' ? src.find('option[value=' + src.val() + ']').text() : '请选择');
        d.css({
            'display': 'inline-block',
            'cursor': 'pointer',
            'line-height': src.height() + 'px',
            'text-align': 'center',
            'width': 'auto',
            'padding': '0 30px 0 20px'
        });
        
        // 点击事件
        d.click(function(e) {
            // 防止事件穿透
            var e = e || window.event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            // 隐藏其他select的下拉框
            hideAll();
            // 获得option
            var os = $('#' + src.attr('id')).find('option');
            // 如果option为空就返回
            if (os.length <= 0) return false;
            // 创建下拉框
            var div = $('<div/>');
            var div2 = $('<div/>');
            div2.addClass('clearfix');
            div.addClass('div_model');
            if(config && config['class']){
                div.addClass(config['class']);
            }            
            var ul = $('<ul/>');
            for (var i = 0; i < os.length; i++) {
                var li = $('<li/>');
                li.text($(os[i]).text());
                li.attr('value', $(os[i]).val());
                li.click(function(e) {
                    var e = e || window.event;
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                    d.text($(this).text());
                    // 赋值原select控件
                    src.val($(this).attr('value'));
                    hideAll();
                    if (config &&　config.callback) {
                        // 绑定回调函数
                        config.callback.call(src);
                    }
                });

                ul.append(li);
            }
            ul.appendTo(div2);
             div2.appendTo(div)
            // 弹出框定位
            div.css({
                'top': e.pageY,
                'left': e.pageX
            });
            div.appendTo($('body'));
        });

        src.after(d);

        $('body').click(function() {
            $('.div_model').remove();
        });

        function hideAll() {
            $('.div_model').remove();
        }
    }
});