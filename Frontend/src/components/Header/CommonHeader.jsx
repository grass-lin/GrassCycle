import React from "react";
import { useDispatch } from "react-redux";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, Dropdown, Avatar, theme } from "antd";
import { collapseMenu } from "../../store/reducers/Menu";
import "./CommonHeader.css";

const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const setCollapsed = () => {
    dispatch(collapseMenu());
  };
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => logout(!collapsed)}
          target="_blank"
          rel="noopener noreferrer"
        >
          退出
        </a>
      ),
    },
  ];
  return (
    <Header
      className="header-container"
      style={{ padding: 0, background: "#213547" }}
    >
      <Button
        type="text"
        icon={
          collapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: "24px" }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: "24px" }} />
          )
        }
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: 64,
          height: 64,
          backgroundColor: "#ffffff",
        }}
      />
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar size={36} src="../../assets/user.png" />
        </a>
      </Dropdown>
    </Header>
  );
};
export default CommonHeader;
/*
 */
