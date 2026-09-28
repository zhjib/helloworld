/**
 * api/time.js —— Vercel 部署用的无服务器函数（Serverless Function）
 *
 * 关键说明：
 *   Vercel 不会运行 server.js 这种常驻监听端口的服务器，
 *   它会把 api/ 目录下每个 .js 文件自动变成一个接口。
 *   因此部署到 Vercel 时：/api/time 由本文件响应，/ 由 public/index.html 响应。
 *
 * 本地运行时仍然使用 server.js（它同样提供 /api/time 接口），两套代码行为一致。
 */

module.exports = (req, res) => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const weeks = ['日', '一', '二', '三', '四', '五', '六'];

  res.status(200).json({
    full:
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
      `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    weekday: weeks[now.getDay()],
    timestamp: now.getTime()
  });
};
