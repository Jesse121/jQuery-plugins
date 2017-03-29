/**
 * 
 * @authors Jesse (jesse152@163.com)
 * @date    2016-11-30 21:06:50
 */

(function($, window, document, undefined) {
    $.extend($, {
        /**
         * [fixedWidth 定宽输出函数]
         * @param  {[type]} str    [需要定宽输出的字符串]
         * @param  {[type]} length [定宽值]
         * @param  {[type]} char   [末尾的符号，默认是省略号]
         */
        fixedWidth: function(str, length, char) {
            str = str.toString(); //把参数转化为字符串
            if (!char) char = "……";
            var num = length - lengthB(str); //获取字符串的字节数与指定长度的差值
            if (num < 0) {
                str = substringB(str, length - lengthB(char)) + char;
            }
            return str;

            function substringB(str, length) { //指定的字节数截取字符串
                var num = 0,
                    len = str.length,
                    tenp = "";
                if (len) {
                    for (var i = 0; i < len; i++) {
                        if (num > length) break;
                        if (str.charCodeAt(i) > 255) { //如果是双字节字符，中文
                            num += 2;
                            tenp += str.charAt(i);
                        } else {
                            num++;
                            tenp += str.charAt(i);
                        }
                    }
                    return tenp;
                } else {
                    return null;
                }
            }

            function lengthB(str) {
                var num = 0,
                    len = str.length;
                if (len) {
                    for (var i = 0; i < len; i++) {
                        if (str.charCodeAt(i) > 255) {
                            num += 2;
                        } else {
                            num++;
                        }
                    }
                    return num;
                } else {
                    return 0;
                }
            }
        }
    })
})(jQuery, window, document);
