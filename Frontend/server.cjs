const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5173;

// 设置静态文件夹
app.use(express.static(path.join(__dirname, "dist")));

// 如果用户访问的路径没有匹配的静态文件，则返回 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
