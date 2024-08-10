import React, { useState, useEffect } from "react";
import Profile from "./units/cards/Profile";
import CountPane from "./units/cards/CountPane";
import Focus from "./units/cards/Focus";
import Posts from "./units/cards/Posts";
import "./HomePage.css";
import { Row, Col } from "antd";
import { getUserData } from "../../utils";

const CenterPage = () => {
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState();

  const getData = () => {
    getUserData({ userID: token }).then(({ data }) => {
      setUserData(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const likeNum = userData.like.length;
  const commentNum = userData.post.length;

  return (
    <Row gutter={[24]}>
      <Col span={10}>
        <Profile name={userData.profile.name} intro={userData.profile.intro} />
        <CountPane likeNum={likeNum} commentNum={commentNum} />
      </Col>
      <Col span={14}>
        <Focus />
        <Posts />
      </Col>
    </Row>
  );
};

export default CenterPage;
