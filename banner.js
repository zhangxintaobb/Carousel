function Carousel(config) {
    // 定义变量
    var $box = $(config.box);//视口容器
    var imgArr = config.imgArr;// 图片数组
    var fadeTime = config.fadeTime; // 图片切换时间
    var index = 0;//索引页
    //轮播页面结构

    //一级结构
    //外层slider
    var $slider = $('<div class="slider" id="slider"></div>');
    //左右按钮
    $left = $('<span id="left"><</span>'),
        $right = $('<span id="right">></span>'),
        //下标
        $nav = $('<ul class="nav" id="navs"></ul>');
    //添加一级结构
    $box.append($slider);
    $box.append($left);
    $box.append($right);
    $box.append($nav);

    //二级结构--img
    $slider.prepend($('<div class="slide"><img src="' + imgArr[imgArr.length - 1] + '" alt=""></div>'));
    for (var i = 0; i < imgArr.length; i++) {
        var $img = $('<div class="slide"><img src=' + imgArr[i] + ' alt=" "></div>');
        $slider.append($img);
    }
    $slider.append($('<div class="slide"><img src="' + imgArr[0] + '" alt=""></div>'));
    //二级结构--li
    for (var j = 0; j < imgArr.length; j++) {
        var $li = $("<li>" + (j + 1) + "</li>");
        $nav.append($li);
    }


    //事件
    $boxNode = $box[0],
        $sliderNode = $slider[0],
        $rightNode = $right[0],
        $leftNode = $left[0],
        $navNode = $nav[0]
    // 鼠标划上轮播图
    $boxNode.onmouseover = function () {
        $right.css("opacity", "0.7");
        $left.css("opacity", "0.7");
        clearInterval(timer);
    }
    // 鼠标划出轮播图
    $boxNode.onmouseout = function () {
        $right.css("opacity", "0");
        $left.css("opacity", "0");
        timer = setInterval(next, 2000);
    }
    // 给上一页添加点击事件
    $leftNode.onclick = prev;
    // 给上一页添加点击事件
    $rightNode.onclick = next;

    function next() {
        if (index == imgArr.length - 1) {
            $slider.animate({ left: '-=' + 1200 }, 'slow', function () {
                $slider.css('left', -1200);
            });
            index = 0;
            indexbtn(0)
        }
        else {
            $('#slider').animate({ left: '-=' + 1200 }, 'slow');
            indexbtn(index + 1)
            index++;

        }
    }

    function prev() {
        if (index == 0) {
            $slider.animate(
                {left: '+=' + 1200 },
                'slow',
                function () {
                $slider.css('left', -1200 * imgArr.length);
            })
            indexbtn(imgArr.length - 1)
            index = imgArr.length - 1;

        }
        else {
            $slider.animate({ left: '+=' + 1200 }, 'slow');
            indexbtn(index - 1)
            index--;

        }
    }

    //下标
    function indexbtn(index) {
        for (var i = 0; i < imgArr.length; i++) {
            if ($($nav.children()[i]).hasClass("active")) {
                $($nav.children()[i]).removeClass("active");
            }
        }
        $($nav.children()[index]).addClass("active");
    }

    for (var i = 0; i < imgArr.length; i++) {
        (function (j) {
            $nav.children()[j].onclick = function () {
                jump(j)
                indexbtn(j);
                index = j;
            }
        })(i);
    }
    $($nav.children()[0]).addClass("active");
    function jump(goto){
        var step=goto - index
        if (step > 0) {
            step = '-=' + (step * 1200);
        } else if (step < 0) {
            step = '+=' + (step * -1200);
        } else {
          return 0;
        }
        $slider.animate({'left': step}, 'slow');
    }
    
    function move(dex){
        if (dex==0){
            $slider.animate(
                {left: '+=' + 1200 },
                'slow',
                function () {
                $slider.css('left', -1200 * imgArr.length);
            })
        }
        else{
            $slider.animate({ left: '-=' + 1200 }, 'slow', function () {
                $slider.css('left', -1200);
            });
            
        }
    }
    //开始播放
    timer = setInterval(next, fadeTime);
}