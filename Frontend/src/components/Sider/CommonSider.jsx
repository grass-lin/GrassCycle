import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Menuconfig from "../../config/Menu";
import * as Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { switchSelected } from "../../store/reducers/Menu";
import "./CommonSider.css";

const { Sider } = Layout;

const CommonSider = ({ collapsed, selected }) => {
  const iconToElement = (name) => React.createElement(Icon[name]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const setSelectedKey = (target) => {
    dispatch(switchSelected(target));
  };

  const item = Menuconfig.map((icon) => {
    const child = {
      icon: iconToElement(icon.icon),
      label: `${icon.label}`,
      key: `${icon.key}`,
    };
    if (icon.children) {
      child.children = icon.children.map((item) => {
        return {
          label: item.label,
          key: item.key,
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
        items={item}
        selectedKeys={[selected]}
        onClick={(e) => {
          navigate(e.key);
          setSelectedKey(e.key);
        }}
      />
    </Sider>
  );
};
export default CommonSider;
