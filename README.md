### jQuery-plugins
 
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

### Clock 时钟插件

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

### tabSwitch 标签页切换插件

### zSlider 焦点图插件

### jPages 翻页插件

