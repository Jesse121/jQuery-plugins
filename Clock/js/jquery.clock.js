;
(function($, window, document, undefined) {
    $.fn.clock = function(options) {
        //设置默认参数
        var defaults = {
            h_radius: "10%", //边框圆角弧度
            h_borderColor: "#ccc", //边框颜色
            h_backColor: "yellow", //背景颜色
            h_width: "300px", //宽度
            h_height: "300px", //高度
            h_secondHandColor: "red", //秒针颜色
            h_frontColor: "darkgreen",
            h_thinHandColor: "green", //分针颜色
            h_hourLength: "", //时针长度
            h_minuteLength: "", //分针长度
            h_secondLength: "", //秒针长度
            h_hourNumShow: true, //是否显示正点时间数字
            h_hourNumSize: "", //正点时间数字大小
            h_hourNumColor: "green",
            h_hourNumRadii: "", //正点时间数字半径
            h_minuteNumShow: true, //是否显示逢5分钟数字
            h_minuteHeight: "", //普通分针刻度高度
            h_minuteWidth: 1,
            h_minute5Height: "", //逢5分针刻度高度
            h_minute5Width: "",
            h_minute15Height: "", //逢15分针刻度高度
            h_minute15Width: ""
            // h_linkText: "Clock",
            // h_linkUrl: "http://tree.com/texiao/clock/",
            // h_linkColor: "deeppink",
            // h_linkSize: "16px",
        };
        var settings = $.extend({}, defaults, options);
        var h_Clock = $(this);
        if (h_Clock.length < 1){
            throw(new Error("未添加<div id='clock'></div>结构代码"));
        };
        h_Clock.attr('class', 'clock');
        h_Clock.append('<div class="smalltree"></div><div class="bigtree"></div><div class="secondtree"></div><div class="minutetree"></div><div class="hourtree"></div>')
        h_Clock.css({ "width": settings.h_width, "height": settings.h_height, "background-color": settings.h_backColor, "border-color": settings.h_borderColor })
        var h_Big = h_Clock.find(".bigtree"),
            h_Small = h_Clock.find(".smalltree"),
            h_Second = h_Clock.find(".secondtree"),
            h_Minute = h_Clock.find(".minutetree"),
            h_Hour = h_Clock.find(".hourtree")
            h_minRadius = Math.min(h_Clock.width(), h_Clock.height()) / 2;
        //------------------------------------------------------
        if (settings.h_minuteHeight == "") {
            settings.h_minuteHeight = h_minRadius / 25;
        }
        if (settings.h_minute5Height == "") {
            settings.h_minute5Height = settings.h_minuteHeight + 4;
        }
        if (settings.h_minute5Width == "") {
            settings.h_minute5Width = settings.h_minuteWidth + 7;
        }
        if (settings.h_minute15Height == "") {
            settings.h_minute15Height = settings.h_minute5Height + 8;
        }
        if (settings.h_minute15Width == "") {
            settings.h_minute15Width = settings.h_minute5Width + 4;
        }
        if (settings.h_hourNumRadii == "") {
            settings.h_hourNumRadii = h_minRadius * 4 / 5;
        }
        if (settings.h_hourNumSize == "") {
            settings.h_hourNumSize = h_minRadius / 5;
        }
        if (settings.h_hourLength == "") {
            settings.h_hourLength = h_minRadius / 2;
        }
        h_Hour.height(settings.h_hourLength);
        if (settings.h_minuteLength == "") {
            settings.h_minuteLength = h_minRadius * 4 / 5;
        }
        h_Minute.height(settings.h_minuteLength);
        if (settings.h_secondLength == "") {
            settings.h_secondLength = h_minRadius* 6 / 5;
        }
        h_Second.height(settings.h_secondLength);
        //------------------------------------------------------
        var h_now, h_second, h_minute, h_hour, h_secondRadian, h_minuteRadian, h_hourRadian;
        setInterval(
            function() {
                h_now = new Date();
                h_second = h_now.getSeconds();
                h_secondRadian = h_second * 6;
                h_minute = h_now.getMinutes();
                h_minuteRadian = (h_minute * 6) + (h_second / 10);
                h_hour = h_now.getHours();
                h_hourRadian = (h_hour * 30) + (h_minuteRadian / 12)
                h_Second.css({ "transform": " rotate(" + h_secondRadian + "deg)" })
                h_Minute.css({ "transform": " rotate(" + h_minuteRadian + "deg)" })
                h_Hour.css({ "transform": " rotate(" + h_hourRadian + "deg)" })
            }, 50)
        //设置圆心大小圆位置
        h_Big.css({ "left": (h_Clock.width() - h_Big.width()) / 2, "top": (h_Clock.height() - h_Big.height()) / 2 })
        h_Small.css({ "left": (h_Clock.width() - h_Small.width()) / 2, "top": (h_Clock.height() - h_Small.height()) / 2 })
        //设置秒针位置
        h_Second.css({ "left": (h_Clock.width() - h_Second.width()) / 2, "top": (h_Second.height() - h_Clock.height() / 2 ), "background-color": settings.h_secondHandColor })
        //设置分针位置，边框圆角
        h_Minute.css({
            "left": (h_Clock.width() - h_Minute.width()) / 2,
            "top": (h_Clock.height() / 2 - h_Minute.height()),
            "border-radius": h_Minute.width() / 2,
            "background-color": settings.h_thinHandColor
        })
        //设置时针位置，边框圆角
        h_Hour.css({
            "left": (h_Clock.width() - h_Hour.width()) / 2,
            "top": (h_Clock.height() / 2 - h_Hour.height()),
            "border-radius": h_Hour.width() / 2,
            "background-color": settings.h_frontColor
        })
        function createsSaletree(width, height, deg, color, radii) {
            var h_scale = $('<div class="scaletree"></div>');
            h_scale.css({ "width": width, "height": height, "z-index": 80, "transform-origin": "50% 100%", "background-color": color })
            h_scale.appendTo(h_Clock).css({
                "left": (h_Clock.width() - h_scale.width()) / 2,
                "top": (h_Clock.height() / 2 - h_scale.height()),
                "transform": "rotate(" + deg + "deg) translateY(" + (h_scale.height() - radii) + "px)"
            })
        }
        function createNum(deg, zindex, color, text, textcolor, textsize, radii) {
            var h_width = textsize * 2 + 2;
            var h_height = textsize;
            var h_scale = $('<div class="scaletree"></div>')
            if (text != "") {
                h_scale.html('<span style="color:' + textcolor + ';display:block;font-size:' + textsize + 'px;position:absolute;bottom:0px;font-weight:bold;text-align:center;width:100%;transform:rotate(-' + deg + 'deg)">' + text + "<span>");
            }
            h_scale.css({ "width": h_width, "height": h_height, "z-index": zindex, "transform-origin": "50% 100%", "background-color": color })
            h_scale.appendTo(h_Clock).css({
                "left": (h_Clock.width() - h_scale.width()) / 2,
                "top": h_minRadius - h_scale.height(),
                "transform": "rotate(" + deg + "deg) translateY(" + (h_scale.height() - radii) + "px) "
            })
        }
        if (settings.h_hourNumShow) {
            //时针刻度数字
            for (var i = 0; i < 12; i++) {
                var h_deg = 360 * i / 12
                var h_hourNum = i;
                if (h_hourNum == 0)
                    h_hourNum = 12
                createNum(h_deg, 90, "transparent", h_hourNum, settings.h_hourNumColor, settings.h_hourNumSize, settings.h_hourNumRadii);
            }
        }
        var h_scaleRadii = h_minRadius * 39 / 40;
        //分针刻度数字
        for (var i = 0; i < 60; i++) {
            var h_hudu = 360 * i / 60
            var h_text = "";
            if ((i % 5) == 0) {
                if (i > 0) { h_text = i; } else { h_text = 60; }
                if (settings.h_minuteNumShow) {
                    createNum(h_hudu, 80, "transparent", h_text, "green", settings.h_minute5Height + 4, h_scaleRadii - 4);
                } else {
                    if ((i % 15) == 0) {
                        createsSaletree(settings.h_minute15Width, settings.h_minute15Height, h_hudu, settings.h_frontColor, h_scaleRadii);
                    } else {
                        createsSaletree(settings.h_minute5Width, settings.h_minute5Height, h_hudu, settings.h_frontColor, h_scaleRadii);
                    }
                }
            } else {
                createsSaletree(settings.h_minuteWidth, settings.h_minuteHeight, h_hudu, settings.h_frontColor, h_scaleRadii);
            }
        }
        //---------------------------------------------------
        // h_Clock.append('<div class="clocktext"><a href="http://tree.com/texiao/clock/" target="_blank" class="clocklink" style="text-decoration:none">Clock</a></div>')
        // h_Clock.find(".clocktext").css({ "width": h_Clock.width(), "position": "absolute", "top": h_minRadius * 6 / 5, "text-align": "center" })
        // var h_ClockLink = h_Clock.find(".clocklink");
        // h_ClockLink.text(settings.h_linkText);
        // h_ClockLink.attr("href", settings.h_linkUrl);
        // h_ClockLink.attr("title", settings.h_linkText);
        // h_ClockLink.css({ "color": settings.h_linkColor, "font-size": settings.h_linkSize })
        //----------------------------------------------------
        h_Clock.show();
    }
}(jQuery, window, document));
