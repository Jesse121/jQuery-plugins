/**
 * @authors Jesse (jesse152@163.com)
 * @date    2016-05-14 09:40:58
 * @version 1.0
 */
;
(function($, window, document, undefined) {
    var zSlider = function(element, options) {
        this.$element = element;
        this.timer = undefined;
        this.defaults = {
            pic_class:'Zslider-img',
            animate: 'roll',
            direction: 'horizontal', //滚动方向,vertical重直滚动,horizontal水平滚动
            event: "click",
            duration: 3000, //播放频率
            speed: 500, //滚动速度
            auto: true //是否自动播放
        };
        this.options = $.extend({}, this.defaults, options);
        // console.log(this.options);
    };
    zSlider.prototype = {
        //初始化数据
        init: function() {
            //开始的索引
            this.index = 0;
            //图片宽度
            this.width = $('.' + this.options.pic_class, this.$element).find('img:first').width();
            //图片高度
            this.height = $('.' + this.options.pic_class, this.$element).find('img:first').height();
            //图片大包装盒
            this.img_wrop = this.$element.find('.' + this.options.pic_class);
            //所有小包装盒
            this.img_box = this.img_wrop.children();
            //所有图片
            this.imgs = this.$element.find('.' + this.options.pic_class + ' img');
            //图片数量
            this.number = this.imgs.length;
            //设置slider的为绝对定位
            this.$element.css({ 'position': 'relative' });
            //设置包装盒为相对定位
            this.img_wrop.css({ 'position': 'absolute', top: '0px', left: '0px' });
            //如果为水平滚动，设置大包装盒的宽度，图片小包装盒为左浮动
            if (this.options.direction == 'horizontal' && this.options.animate == 'roll') {
                this.img_wrop.css({ 'width': this.width * this.number + 'px' });
                this.img_box.css({ 'float': 'left' });
            }
            //生成导航
            this.createNav();
            //是否自动播放
            if (this.options.auto) this.play();
            //绑定事件，切换图片
            this.bind(this.options.event);
        },
        createNav: function() {
            this.$element.append('<div class="nav"></div>');
            this.$nav = this.$element.find('.nav');
            for (var i = 1; i <= this.number; i++) {
                this.$nav.append('<span>●</span>')
            }
            this.$nav.css({
                'position': 'absolute',
                'z-index': 3,
                'left': '50%',
                'bottom': '20px',
                'text-align': 'center',
                'font-size': '0',
                'border-radius': '10px',
                'background-color': ' rgba(255,255,255,0.3)',
                'filter': 'alpha(opacity:30)'
            });
            this.$nav.find('span').css({
                'display': 'inline-block',
                'font-size': '14px',
                'color': '#fff',
                'text-decoration': 'none',
                'cursor': 'pointer',
                'margin': '2px'
            });
            this.$nav.find('span:first').addClass('on');
            this.$nav.find('.on').css({ 'color': 'orange' });
            var nav_margin_left = this.$nav.width() * (-0.5);
            //获取导航margin-left的偏移量，必需先设置好span的大小之后在获取,否则获取的将是父素的宽度
            this.$nav.css({ 'margin-left': nav_margin_left + 'px' });
        },
        play: function() {
            var Z = this;
            if (this.timer){
                clearInterval(this.timer);
                timer = undefined;
            };
            this.timer = setInterval(function() {
                Z.index++;
                if (Z.index >= Z.number) { //如果索引大于或者等于图片总数
                    Z.index = 0;
                }
                Z.$nav.children().eq(Z.index).addClass('on').css({ 'color': 'orange' })
                                 .siblings().removeClass('on').css({ 'color': '#fff' });
                Z[Z.options.animate](); //图片动画
            }, this.options.duration);
        },
        roll: function() {
            var Z = this;
            if (Z.options.direction == 'vertical') { //如果是垂直滚动
                $(Z.img_wrop).animate({
                    top: -Z.height * Z.index + 'px'
                }, Z.options.speed);
            } else {
                $(Z.img_wrop).animate({
                    left: -Z.width * Z.index + 'px'
                }, Z.options.speed);
            }
        },
        bind: function(type) {
            var Z = this;
            this.$nav.children().bind(type, function() {
                // console.log(Z.$nav.children());
                Z.index = $(this).index(); //当前this指向的导航元素对象,例如span对象
                console.log(Z.index);
                Z.$nav.children().eq(Z.index).addClass('on').css({ 'color': 'orange' })
                                            .siblings().removeClass('on').css({ 'color': '#fff' });
                //停止当前所有动面，如果没有这一句，在快速切换导航时，图片将一直切换,直到所有动画执行完并，造成效果不佳。
                $(Z.img_wrop).stop();
                Z[Z.options.animate](); //图片动画
                clearInterval(Z.$element.timer);
            });
            this.$nav.bind('mouseleave', function() {
                if (Z.options.auto) {
                    Z.play();
                }
            });
        }
    };
    $.fn.zSlider = function(options) {
        var obj = new zSlider(this, options);
        obj.init();
        return this; //返回jQuery选择器的集合，以便链式调用
    };
})(jQuery, window, document);
