import React from "react";
import Comments from "./units/cards/Comments";
import Likes from "./units/cards/Likes";
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
