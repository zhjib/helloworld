# HelloWorld 网站（周锦博）

我的第一个 AI 开发的网站：首页显示 “Hello World！我是周锦博，我的第一个AI开发的网站” 和当前服务器时间。

## 目录结构

```
helloworld-site/
├── package.json      # 项目配置
├── server.js         # 本地运行的 HTTP 服务器（node server.js）
├── api/
│   └── time.js       # Vercel 部署用的时间接口（Serverless Function）
└── public/
    └── index.html    # 前端页面
```

## 本地运行

```bash
node server.js
```

然后浏览器打开 http://localhost:3000

## 在线访问

部署在 Vercel：https://helloworld-你的用户名.vercel.app
