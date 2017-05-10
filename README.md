# jQuryPlugin
 
自己编写的jQuery插件，有很多功能不完善，后期会逐渐改善

#### 插件列表
1. jquery.calendar日历记事插件
默认参数配置
```javascript
    $('#calendar').Calendar({
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
    })
```
实例效果  

<p><iframe style="width: 100%; height: 300px" src="http://sandbox.runjs.cn/show/gtfvorkt" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>


|插件名称 | 用途 |
|---------|------|
|tabSwitch|标签页切换插件|
|zSlider  |焦点图插件|
|jPages   |翻页插件 |

    
    
     


