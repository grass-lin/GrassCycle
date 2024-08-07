import React from "react";
import { useDispatch } from "react-redux";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, Dropdown, Avatar } from "antd";
import { collapseMenu, switchSelected } from "../../store/reducers/Menu";
import "./CommonHeader.css";
import user from "../../assets/user.png";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
  const dispatch = useDispatch();
  const setSelectedKey = (target) => {
    dispatch(switchSelected(target));
  };

  const setCollapsed = () => {
    dispatch(collapseMenu());
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toMycenter = () => {
    navigate("/home/mycenter");
    setSelectedKey("/home/mycenter");
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => toMycenter()}
          target="_blank"
          rel="noopener noreferrer"
        >
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => logout()} target="_blank" rel="noopener noreferrer">
          退出
        </a>
      ),
    },
  ];
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={
          collapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: "24px" }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: "24px" }} />
          )
        }
        onClick={() => setCollapsed()}
        style={{
          width: 48,
          height: 32,
          backgroundColor: "#ffffff",
        }}
      />
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar size={36} src={user} />
        </a>
      </Dropdown>
    </Header>
  );
};
export default CommonHeader;
/*
 */
