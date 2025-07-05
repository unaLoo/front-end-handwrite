/**
 * JSONP 的实现
 */

/** Loop`s Tips:
1. 前端定义一个回调函数（如 handleResponse(data)）。
2. 动态创建一个 <script> 标签，并将这个回调函数名作为参数传递给服务器（通常是 callback=xxx）。
3. 服务器接收到请求后，返回一段 JavaScript 脚本，内容是调用该回调函数并传入 JSON 数据。
4. 浏览器加载脚本后自动执行回调函数，完成数据处理。
 */

// 前端创建元素发起请求：

function handleResponse(data) {
    console.log("收到数据：", data);
    // 处理数据
}
const script = document.createElement('script');
script.src = 'https://api.example.com/jsonp?callback=handleResponse';
document.body.appendChild(script);

// 后端接口会响应js代码，浏览器收到后会自动执行：
app.get('/jsonp', (req, res) => {
  const callback = req.query.callback;
  const data = { name: "李四", age: 30 };

  // 返回一段字符串 JS 代码
  res.send(`${callback}(${JSON.stringify(data)})`);
});

