import React from "react";
import CommonSider from "../components/Sider/CommonSider";
import CommonHeader from "../components/Header/CommonHeader";
import RouterAuth from "../router/RouterAuth";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const MainPage = () => {
  const collapsed = useSelector((state) => state.menu.isCollapse);
  return (
    <RouterAuth>
      <Layout style={{ minHeight: "100vh" }}>
        <CommonSider collapsed={collapsed} />
        <Layout>
          <CommonHeader collapsed={collapsed} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RouterAuth>
  );
};

export default MainPage;
