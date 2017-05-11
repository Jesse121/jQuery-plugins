/**
 * name     tabSwitch
 * @authors Jesse (jesse152@163.com)
 * @date    2016-05-14 16:14:01
 * @version 1.0
 */
;(function($, window, document,undefined){
	$.fn.tabSwitch = function (options) {
	    return this.each(function () {
	        var defaults = {
	            operate: 'click',   //切换方式
	            auto: true,         //是否自动切换
	            time: 4000,			//自动切换过渡时间
	            delay: true,		//是否延迟切换
	            delayTime: 500		//延迟时间
	        };

	        var settings = $.extend({}, defaults, options),
	        
	        $self = $(this),
	        items = $self.children('ul.menu').children('li'),
	        tabBox = $self.children('div.main'),
	        tabBoxItems = tabBox.children('div.tab'),
	        timer;

	        var methods = {
		        tabHandle : function (index) {
		            items.eq(index).addClass('on').siblings().removeClass('on');
		            tabBoxItems.eq(index).show().siblings().hide();
		        },
		        delay : function (index) {
		            if(settings.delay){
		            	setTimeout(function () {
		            		methods.tabHandle(index); 
		            	}, settings.delayTime);
		            }else{
		            	methods.tabHandle(index);
		            }
		        },
		        start : function () {
		            if (settings.auto){
		            	timer = setInterval(methods.autoRun, settings.time);
		            }else{
		            	return;
		            } 
		        },
		        autoRun : function () {
		            var on = $self.find('li.on'),
		                firstItem = items.eq(0),
		                len = items.length,
		                index = on.index() + 1,
		                item = index === len ? firstItem : on.next('li'),
		                i = index === len ? 0 : index;

		            on.removeClass('on');
		            item.addClass('on');
		            tabBoxItems.eq(i).show().siblings().hide();
		        }
	        };

	        items.bind(settings.operate, function () {
	            var index = items.index($(this));
	            methods.delay(index);
	        });

	        if (settings.auto) {
	            methods.start();
	            $self.hover(function () {
	                clearInterval(timer);
	                timer = undefined;  
	            }, function () {
	                methods.start();
	            });
	        }
	        
	    });
	};
})(jQuery, window, document);
