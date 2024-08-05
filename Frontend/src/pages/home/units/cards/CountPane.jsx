import React from "react";
import { Card } from "antd";
import "../../HomePage.css";

const CountPane = () => {
  return (
    <Card
      bordered={true}
      className="CountPane-card"
      hoverable
      style={{ marginTop: "50px" }}
    >
      <p>Content1</p>
    </Card>
  );
};

export default CountPane;
