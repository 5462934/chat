'use strict';

const http = require('http');
// 模板引擎
const artTemplate = require('art-template');

const path = require('path');

// 处理键值对
const querystring = require('querystring');

let myMsgs = [];

// 建立http服务器
let server = http.createServer((req, res) => {
  
  if (req.method == 'GET' && req.url == '/') {
    let htmlStr = artTemplate(path.join(__dirname, 'index.html'), {
      msgs: myMsgs
    });

    res.end(htmlStr);
  } else if (req.method == 'POST' && req.url == '/sendMsg') {
    // 接收请求体数据
    req.on('data', data => {
      let str = data.toString(); // 表单数据键值对字符串
      let formObj = querystring.parse(str); // 解析json字符串
      // 将数据添加进数组
      myMsgs.push({
        nickname: formObj.nickname,
        msg: formObj.msg
      });

      // 响应页面数据
      let htmlStr = artTemplate(path.join(__dirname, 'index.html'), {
        msgs: myMsgs
      });

      res.end(htmlStr);
    })
  } else {
    res.end('ok');
  }
})


server.listen(8888);
require('./base.js')(server);