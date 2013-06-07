$.fn.extend({
    'dropDown': function(callback) {
        var src = $(this);
        src.hide();
        var d = $('<div>');
        d.attr('id', 'dropDown_' + src.attr('id'));
        d.addClass($(src).attr('class'));
        d.text(src.find('option[value=' + src.val() + ']').text() !== '' ? src.find('option[value=' + src.val() + ']').text() : '请选择');
        d.css({
            'display': 'inline-block',
            'cursor': 'pointer',
            'line-height': src.height() + 'px',
            'text-align': 'center',
            'width': 'auto',
            'padding': '0 30px 0 20px'
        });

        d.click(function(e) {
            var e = e || window.event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            hideAll();
            os = $('#' + src.attr('id')).find('option');
            if (os.length <= 0) return false;
            var div = $('<div/>');
            div.addClass('div_model');
            var ul = $('<ul/>');
            for (var i = 0; i < os.length; i++) {
                var li = $('<li/>');
                li.text($(os[i]).text());
                li.attr('value', $(os[i]).val());
                li.click(function(e) {
                    var e = e || window.event;
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                    d.text($(this).text());

                    src.val($(this).attr('value'));
                    hideAll();
                    if (callback) {
                        callback.call(src);
                    }
                });

                ul.append(li);
            }
            ul.appendTo(div);

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