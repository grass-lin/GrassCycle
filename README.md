## 小草兴趣圈


这是一个前后端分离的web应用的代码仓库, 构建了一个可以多用户登录, 创建兴趣圈, 点赞, 发帖, 评论的平台. 整体功能类似于 **百度贴吧** 或**Reddit**


- 前端 React 框架 + Vite + Ant-design组件库
- 后端 Midway 框架


本项目提供源代码和打包好的可执行文件

开发环境node20, 打包版本的node环境为node18(pkg不支持node20的打包)

### 如何部署

#### 运行打包版本
这里有用pkg打包好的可执行程序(点我下载)[https://box.nju.edu.cn/d/d89a5746acc44bc0bfe5/]
- 请正确对应操作系统
- 启动步骤:
  1. 先运行后端(名为GrassCycleBackend的文件)
  2. 再运行前端(名为GrassCycle的文件)
  3. 随后访问http://localhost:5173即可访问前端页面
  4. 后端服务器运行在http://127.0.0.1:7001

#### 本地部署源码

部署源码请clone本代码
请确保环境中安装有node环境 (建议node20或更新)

后端: 
- 源代码保存在Backend/midway-project/src中
- 先执行```cd Backend/midway-project; npm install```借助npm安装项目依赖包
- ```npm run dev```即可运行后端代码并在http://127.0.0.1:7001启动后端

前端:
- 源代码保存在Fontend/src中
- 先执行```cd Fontend; npm install```借助npm安装项目依赖包
- ```npm run dev```即可运行前端代码并在http://localhost:5173启动前端

### 功能说明

#### 前端的技术细节
- 采用React框架 + Vite方案
- 使用ant-design设计的前端UI
- 全局使用react-router-dom提供的动态路由管理页面
- 使用react-redux管理全局状态

#### 后端的技术细节
- 采用Midway框架
- 采用本地json文档和本地存储图片的形式实现持久化

#### 额外实现的功能
1. 用户信息的丰富(简介, 头像)
2. 更丰富的UI交互和页面(查看关注圈子, 查看历史发帖)

#### 有待实现的部分
- 后端未采用数据库形式实现持久化, 在大规模数据面前效率低下
- 未进行服务器部署
- 整体项目的数据没有任何加密(包括前端token)
- 还有一些功能(比如查看历史点赞, 历史评论和使用ws实现消息实时提醒)由于时间原因没有做, 但是json文档持久化的时候也都准备了数据
- 项目整体(尤其是后端)并行度不高, 碍于初次接触web开发, 经验有限
