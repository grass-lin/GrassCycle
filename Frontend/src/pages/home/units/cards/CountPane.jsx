import React from "react";
import { Card } from "antd";
import "../../HomePage.css";
import { LikeFilled, CommentOutlined } from "@ant-design/icons";

const IconText = ({ text1, icon, text2 }) => {
  return (
    <span className="icon-text">
      {text1}
      {React.createElement(icon)}
      {text2}
    </span>
  );
};
const CountPane = (props) => {
  console.log(props);
  return (
    <Card bordered={true} style={{ marginTop: "50px" }}>
      <div className="countpane-card">
        <IconText text1="点赞数" icon={LikeFilled} text2={props.likeNum} />
        <IconText
          text1="回复数"
          icon={CommentOutlined}
          text2={props.commentNum}
        />
      </div>
    </Card>
  );
};

export default CountPane;
