/**
 * server.js —— Node.js HTTP 服务器入口
 * 功能：
 *   1. 访问 http://localhost:3000/ 返回首页（Hello World 页面）
 *   2. 提供接口 http://localhost:3000/api/time 返回当前服务器时间（JSON）
 * 说明：只使用 Node.js 内置模块（http / fs / path），无需安装任何第三方依赖。
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
// 只允许本机访问；如果想让局域网内其他设备也能访问，把 HOST 改成 '0.0.0.0'
const HOST = '127.0.0.1';

/** 获取当前服务器时间，返回格式化后的中文时间对象 */
function getServerTime() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const weeks = ['日', '一', '二', '三', '四', '五', '六'];
  return {
    full: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
          `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    weekday: weeks[now.getDay()],
    timestamp: now.getTime()
  };
}

/** 创建 HTTP 服务器 */
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // 1. 接口：/api/time —— 返回当前服务器时间（JSON）
  if (url.pathname === '/api/time') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(getServerTime()));
    return;
  }

  // 2. 页面：/ —— 返回首页 index.html
  if (url.pathname === '/') {
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 服务器内部错误：无法读取 index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // 3. 其他路径：统一返回 404
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 页面不存在');
});

/** 启动服务器 */
server.listen(PORT, HOST, () => {
  console.log(`✅ 网站已启动：http://${HOST}:${PORT}`);
  console.log(`   当前服务器时间：${getServerTime().full}`);
});
