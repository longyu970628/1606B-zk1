//渲染search列表
$('.input').on('input', function() {
    var val = $(this).val();
    if (!val) {
        $('.list').html('');
    } else {
        $.ajax({
            url: '/api/search?key=' + val,
            dataType: 'json',
            success: function(res) {
                if (res.code === 0) {
                    var str = '';
                    $.each(res.data, function(i, v) {
                        str += '<li>' + v.tit + '</li>';
                    });
                    $('.list').html(str);
                }
            },
            error: function(error) {
                console.warn(error);
            }
        })
    }
});

//渲染新闻列表
$.ajax({
    url: '/api/list',
    dataType: 'json',
    success: function(res) {
        if (res.code === 0) {
            var str = '';
            $.each(res.data, function(i, v) {
                str += '<div class="conList"><p>' + v.title + '</p><img src="' + v.url + '" alt=""></div>';
            });
            $('.content').html(str);
        }
    },
    error: function(error) {
        console.warn(error);
    }
});