import React, { useState, useEffect } from "react";
import Profile from "./units/Profile";
import CountPane from "./units/CountPane";
import Focus from "./units/Focus";
import Posts from "./units/Posts";
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

  return (
    <Row gutter={[24]}>
      <Col span={10}>
        <Profile name={userData.profile.name} intro={userData.profile.intro} />
        <Focus {...userData} />
      </Col>
      <Col span={14}>
        <CountPane
          likeNum={userData.likeNum}
          commentNum={userData.commentNum}
          postNum={userData.postNum}
        />
        <Posts {...userData} />
      </Col>
    </Row>
  );
};

export default CenterPage;
