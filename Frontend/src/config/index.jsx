export default [
  {
    path: "/home",
    name: "home",
    icon: "UserOutlined",
    label: "个人中心",
    children: [
      {
        path: "home/profile",
        name: "profile",
        label: "个人信息",
      },
      {
        path: "home/mycenter",
        name: "mycenter",
        label: "我的空间",
      },
      {
        path: "home/likes",
        name: "likes",
        label: "点赞和评论",
      },
    ],
  },
  {
    path: "/hall",
    name: "hall",
    icon: "VideoCameraOutlined",
    label: "圈子大厅",
  },
  {
    path: "/message",
    name: "message",
    icon: "UploadOutlined",
    label: "消息",
  },
];
