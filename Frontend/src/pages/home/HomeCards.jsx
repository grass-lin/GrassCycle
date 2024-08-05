import React from "react";
import { Col, Card, Row } from "antd";
import "./HomePage.css";

export const MyFocus = () => {
  return (
    <Card
      title="我的关注"
      bordered={true}
      style={{ width: 400, height: 300 }}
      hoverable
      className="home-card"
    >
      <p>Content1</p>
      <p>Content2</p>
      <p>Content3</p>
    </Card>
  );
};

export const HotPosts = () => {
  return (
    <Card
      title="点赞和评论"
      bordered={true}
      style={{ width: 400, height: 300 }}
      hoverable
      className="hotPosts-card"
    >
      <p>Content1</p>
      <p>Content2</p>
      <p>Content3</p>
    </Card>
  );
};
