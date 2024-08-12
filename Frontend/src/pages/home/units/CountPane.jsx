import React from "react";
import { Card } from "antd";
import "../HomePage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchSelected } from "../../../store/reducers/Menu";
import { LikeFilled, CommentOutlined, BookOutlined } from "@ant-design/icons";

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
  return (
    <Card bordered={true}>
      <div className="countpane-card">
        <IconText text1="点赞数" icon={LikeFilled} text2={props.likeNum} />
        <IconText text1="发帖数" icon={BookOutlined} text2={props.postNum} />
        <IconText
          text1="评论数"
          icon={CommentOutlined}
          text2={props.commentNum}
        />
      </div>
    </Card>
  );
};

export default CountPane;
