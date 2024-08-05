import React from "react";
import { useNavigate } from "react-router-dom";
import Menuconfig from "../../config/index";
import * as Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./CommonSider.css";

const { Sider } = Layout;

const CommonSider = ({ collapsed }) => {
  const iconToElement = (name) => React.createElement(Icon[name]);

  const navigate = useNavigate();

  const item = Menuconfig.map((icon) => {
    const child = {
      key: `${icon.path}`,
      icon: iconToElement(icon.icon),
      label: `${icon.label}`,
    };
    if (icon.children) {
      child.children = icon.children.map((item) => {
        return {
          key: item.path,
          label: item.label,
        };
      });
    }
    return child;
  });
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <h3 className="title-font">{collapsed ? "兴趣圈" : "小草兴趣圈"}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["home"]}
        items={item}
        onClick={(e) => {
          navigate(e.key);
        }}
      />
    </Sider>
  );
};
export default CommonSider;
