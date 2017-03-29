(function ($) {
    var Calendar = function (options, object) {
        //获取当前日期
        var adDay = new Date().getDate();
        //获取当前月份
        var adMonth = new Date().getMonth();
        //获取当前年份
        var adYear = new Date().getFullYear();
        var dDay = adDay;
        var dMonth = adMonth;
        var dYear = adYear;
        var instance = object;

        var settings = $.extend({}, $.fn.Calendar.defaults, options);

        function lpad(value, length, pad) {
            if (typeof pad == 'undefined') {
                pad = '0';
            }
            var p;
            for (var i = 0; i < length; i++) {
                p += pad;
            }
            return (p + value).slice(-length);
        }

        var mouseOver = function () {
            $(this).addClass('c-nav-btn-over');
        };
        var mouseLeave = function () {
            $(this).removeClass('c-nav-btn-over');
        };
        var mouseOverEvent = function () {
            $(this).addClass('c-event-over');
        };
        var show = function(){
            var mousePosition = (function(event){
                var e = event || window.event;
                var x = e.pageX || e.clientX;
                var y = e.pageY || e.clientY;
                return {
                    x:x - parseInt($('#calendar')[0].getBoundingClientRect().left) - parseInt($('#calendar').css("width")) / 3,
                    y:y + 20
                }
            })(event);
            $('div.c-event-grid').css({
                "display":"block",
                "top":mousePosition.y,
                "left":mousePosition.x
            });
            
            for (var i = 0; i < settings.events.length; i++) {
                var d = settings.events[i].datetime;
                if (d.getDate() == $(this).attr('data-event-day') && (d.getMonth() - 1) == dMonth && d.getFullYear() == dYear) {
                    var date = d.getFullYear()+'/'+lpad(d.getMonth(), 2) + '/' + lpad(d.getDate(), 2) + ' ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);
                    var item = $('<div>').addClass('c-event-item');
                    var title = $('<div>').addClass('title').html(date + '  ' + settings.events[i].title);
                    var description = $('<div>').addClass('description').html(settings.events[i].description );
                    item.attr('data-event-day', d.getDate());
                    item.append(title).append(description);
                }
            }
            $('.c-event-list').empty().append(item);

        };
        var hide = function(){
            $('.c-event-grid').css("display","none");
            
        }

        var mouseLeaveEvent = function () {
            $(this).removeClass('c-event-over')
        };
        var mouseOverItem = function () {
            $(this).addClass('c-event-over');
        };
        var mouseLeaveItem = function () {
            $(this).removeClass('c-event-over')
        };
        var nextMonth = function () {
            if (dMonth < 11) { //月份是从0开始算起的
                dMonth++;
            } else {
                dMonth = 0;
                dYear++;
            }
            print();
        };
        var previousMonth = function () {
            if (dMonth > 0) {
                dMonth--;
            } else {
                dMonth = 11;
                dYear--;
            }
            print();
        };

        function loadEvents() {
            if (typeof settings.url != 'undefined' && settings.url != '') {
                $.ajax({url: settings.url,
                    async: false,
                    success: function (result) {
                        settings.events = result;
                    }
                });
            }
        }

        function print() {
            loadEvents();
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay();
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth , 0).getDate();

            var cBody = $('<div>').addClass('c-grid');
            var cEvents = $('<div>').addClass('c-event-grid');
            var cEventsBody = $('<div>').addClass('c-event-body');
            cEvents.append($('<div>').addClass('c-event-title').html(settings.eventTitle));
            cEvents.append(cEventsBody);

            var cPrevious = $('<div>').addClass('c-previous c-grid-title');
            var cMonth = $('<div>').addClass('c-month c-grid-title');
            var cNext = $('<div>').addClass('c-next c-grid-title');
            cPrevious.html(settings.textArrows.previous);
            cMonth.html(settings.months[dMonth] + ' ' + dYear);
            cNext.html(settings.textArrows.next);
            //添加向前后的按钮及月份改变事件
            cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
            cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);

            cBody.append(cPrevious);
            cBody.append(cMonth);
            cBody.append(cNext);
            //生成星期信息
            for (var i = 0; i < settings.weekDays.length; i++) {
                var cWeekDay = $('<div>').addClass('c-week-day');
                cWeekDay.html(settings.weekDays[i]);
                cBody.append(cWeekDay);
            }

            var day = 1;
            var dayOfNextMonth = 1;
            for (var i = 1; i < 43; i++) {
                var cDay = $('<div>');
                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month');
                    cDay.html(dLastDayOfPreviousMonth + i- dWeekDayOfMonthStart);
                } else if (day <= dLastDayOfMonth) {
                    cDay.addClass('c-day');
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-today');
                    }
                    for (var j = 0; j < settings.events.length; j++) {
                        var d = settings.events[j].datetime;
                        if (d.getDate() == day && (d.getMonth() - 1) == dMonth && d.getFullYear() == dYear) {
                            cDay.addClass('c-event').attr('data-event-day', d.getDate());
                            cDay.on('mousemove',mouseOverEvent).on('click', show).on('mouseleave', mouseLeaveEvent);
                        }
                    }
                    cDay.html(day++);
                } else {
                    cDay.addClass('c-day-next-month');
                    cDay.html(dayOfNextMonth++);
                }
                cBody.append(cDay);
            }

            var eventList = $('<div>').addClass('c-event-list');
            $(instance).addClass('calendar').on("mouseleave",hide);
            cEventsBody.append(eventList);
            $(instance).html(cBody).append(cEvents);
        }

        return print();
    }

    $.fn.Calendar = function (config) {
        return this.each(function () {
            return Calendar(config, $(this));
        });
    };

    // 默认配置参数
    $.fn.Calendar.defaults = {
        weekDays: ['一', '二', '三', '四', '五', '六', '日'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        textArrows: {previous: '&lt;', next: '&gt;'},
        eventTitle: '活动事件',
        url: '',
        events: [
            {title: '活动一', description: '在***开会', datetime: new Date(2017, 3, 13, 17, 30)},
            {title: '活动二', description: '在***开会', datetime: new Date(2017, 3, 25, 16,00)},
            {title: '活动三', description: '在***开会', datetime: new Date(2017, 4, 2, 16, 20)}
        ]
    };

}(jQuery));