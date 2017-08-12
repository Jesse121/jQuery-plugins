### jQuery Plugins
 
这里展示的主要是自己在前端开发工作中用到的jQuery插件，部分插件是网上他人开发的但不适合直接拿来使用到项目中，于是自己尝试着修改了代码。还有些插件是因项目需要完全由自己开发的。

#### Calendar 日历记事插件
##### 主要功能：
首先需要展示的是一份万年历，可通过顶部的左右箭头切换月份，其次根据活动日期安排在日历中点击该天便可展示该天的活动详情。活动时间安排可通过ajax获取已达到自动更新的目的
##### 参数配置
```javascript
    $('#calendar').Calendar({
        weekDays: ['一', '二', '三', '四', '五', '六', '日'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        textArrows: {previous: '&lt;', next: '&gt;'},
        eventTitle: '活动事件',
        //通过ajax获取活动时间安排的数据接口
        url: '',
        //若不通过ajax获取，也可设置events参数设置
        events: [
            {title: '活动一', description: '在***开会', datetime: new Date(2017, 3, 13, 17, 30)},
            {title: '活动二', description: '在***开会', datetime: new Date(2017, 3, 25, 16,00)},
            {title: '活动三', description: '在***开会', datetime: new Date(2017, 4, 2, 16, 20)}
        ]
    })
```
##### 实例效果  
点此查看[Demo](http://sandbox.runjs.cn/show/gtfvorkt)

参考地址：[https://github.com/jhonis/e-calendar](https://github.com/jhonis/e-calendar)

### fixedWidth 固定字符串字节数输出
##### 主要功能：
在新闻消息列表中经常需要新闻字符串长度基本相同，过长的部分用省略号表示，同时鼠标移上会有title提示信息
##### 参数配置
```js
$('li a').fixedWidth({
    len:28,     //保留的字符串字节数
    char:"……",   //多余的部分以此符号代替
    title:false //是否设置title提示信息
}); 
```
##### 实例效果  
点此查看[Demo](http://sandbox.runjs.cn/show/jhiqrrap)

### Clock 时钟插件
##### 主要功能：
在页面上展示动态时钟
##### 参数配置
```js
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
};
```
##### 实例效果  
点此查看[Demo](http://sandbox.runjs.cn/show/axtzssky)  
参考地址：[http://hovertree.com/texiao/hoverclock/](http://hovertree.com/texiao/hoverclock/)

### tabSwitch 标签页切换插件
##### 主要功能：
标签页切换插件，可以设置是否自动切换，触发切换操作的方式，这类插件在一般官网首页用的比较多
##### 参数配置
```js
var defaults = {
    operate: 'click',   //切换方式
    auto: true,         //是否自动切换
    time: 4000,         //自动切换过渡时间
    delay: false,       //是否延迟切换
    delayTime: 300      //延迟时间
};
```
##### 实例效果  
点此查看[Demo](http://sandbox.runjs.cn/show/ugdmpau5)

### zSlider 焦点图插件
##### 主要功能：
焦点图自动切换，在一般首页头图中经常用到
##### 参数配置
```js
this.defaults = {
    pic_class:'Zslider-img',
    animate: 'roll',
    direction: 'horizontal', //滚动方向,vertical重直滚动,horizontal水平滚动
    event: "click",
    duration: 3000, //播放频率
    speed: 500, //滚动速度
    auto: true //是否自动播放
};
```
##### 实例效果  
点此查看[Demo](http://sandbox.runjs.cn/show/1gucutro)

