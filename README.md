acm-resover
==================
本项目fork自[hiho-resolver](https://github.com/hiho-coder/hiho-resolver)，主要优化了动画效率，更改了界面配色，并丰富了文档。

# 截图

![screenshot](screenshots/shot1.gif)

使用教程
------------------------

数据输入的代码在`js/main.js`的最后，`$.getJSON("contest.json", function(data){..})`

默认是使用根目录下的`contest.json`，你可以根据自己需求修改。

封榜的时间默认是3600s，在`hiho-resolver.js` 最开头修改

json的格式如下：

```json
{
  problem_count: 10,
  solutions: {... },
  users: {... }
}
```

solution的格式，key可以任意，problem下标从1开始:

```
381503: {
  user_id: "1",
  problem_index: "1",
  verdict: "AC",
  submitted_seconds: 22
},
381504: {
  user_id: "2",
  problem_index: "1",
  verdict: "WA",
  submitted_seconds: 23
},
```

user的格式，其中key即为user的id，要和solution中对上：

```
1: {
  name: "花落人亡两不知",
  college: "HZNU"
},
2: {
  name: "大斌丶凸(♯｀∧´)凸",
  college: "HDU"
},
3: {
  name: "天才少女队",
  college: "PKU"
},
```

