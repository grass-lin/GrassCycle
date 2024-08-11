import React from "react";
import Comments from "./units/Comments";
import Likes from "./units/Likes";
import { Row, Col } from "antd";

const LikePage = () => {
  return (
    <Col>
      <Likes />
      <Comments />
    </Col>
  );
};

export default LikePage;
