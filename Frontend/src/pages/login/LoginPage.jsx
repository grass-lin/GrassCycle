import React from "react";
import { Form, Input, Button, message } from "antd";
import "./LoginPage.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchSelected } from "../../store/reducers/Menu";
import { handleLoginInfo } from "../../utils/index";

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

    handleLoginInfo(val).then(({ data }) => {
      // 0 ---- success
      // 1 ---- new username
      // 2 ---- wrong password
      if (data.status == 0) {
        localStorage.setItem("token", data.id);
        message.success("登录成功!!");
        setTimeout(() => {
          setSelectedKey("/home/mycenter");
          navigate("/home/mycenter");
        }, 2000);
      } else if (data.status == 1) {
        localStorage.setItem("token", data.id);
        message.success("新用户注册成功!!");
        setTimeout(() => {
          setSelectedKey("/home/profile");
          navigate("/home/profile");
        }, 2000);
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
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit">
          登录或注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
