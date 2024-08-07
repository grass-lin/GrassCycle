import React from "react";
import { Form, Input, Button, message } from "antd";
import "./LoginPage.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchSelected } from "../../store/reducers/Menu";

const checkLoginInfo = async (val) => {
  return {
    data: {
      token: "hello",
      status: 1,
    },
  };
};
const LoginPage = () => {
  const dispatch = useDispatch();

  const setSelectedKey = (target) => {
    dispatch(switchSelected(target));
  };

  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    return <Navigate to="home/mycenter" replace />;
  }
  const handleSubmit = (val) => {
    if (!val.username || !val.password) {
      return message.open({
        type: "warning",
        content: "请输入用户名或密码",
      });
    }

    checkLoginInfo(val).then(({ data }) => {
      // 0 ---- success
      // 1 ---- new username
      // 2 ---- wrong password
      if (data.status == 0) {
        localStorage.setItem("token", data.token);
        setSelectedKey("/home/mycenter");
        navigate("/home/mycenter");
      } else if (data.status == 1) {
        localStorage.setItem("token", data.token);
        setSelectedKey("/home/profile");
        navigate("/home/profile");
      } else if (data.status == 2) {
        return message.open({
          type: "error",
          content: "密码错误",
        });
      }
    });
  };
  return (
    <Form className="login-container" onFinish={handleSubmit}>
      <div className="login_title">兴趣圈登录</div>
      <Form.Item label="账号" name="username">
        <Input placeholder="请输入账号" />
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input.Password placeholder="请输入账号" />
      </Form.Item>
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
