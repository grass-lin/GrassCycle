import React from "react";
import Profile from "./units/cards/Profile";
import CountPane from "./units/cards/CountPane";
import Focus from "./units/cards/Focus";
import Posts from "./units/cards/Posts";
import "./HomePage.css";
import { Row, Col } from "antd";

const CenterPage = () => {
  return (
    <Row gutter={[24]}>
      <Col span={10}>
        <Profile />
        <CountPane />
      </Col>
      <Col span={14}>
        <Focus />
        <Posts />
      </Col>
    </Row>
  );
};

export default CenterPage;
