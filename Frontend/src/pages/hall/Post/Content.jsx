import React from "react";
import { Card, Avatar } from "antd";
import { imageURL } from "../../../utils/axios";
import "../HallPage.css";

export const ProfileCard = (props) => {
  console.log(props);
  const headerContainer = {
    body: {
      padding: 0,
    },
  };
  return (
    <Card styles={headerContainer}>
      <div className="post-header">
        <div className="avatar">
          <Avatar size="large" src={`${imageURL}${props.avatar}`} />
        </div>
        <div>
          <h4>{props.name}</h4>
          <div style={{ marginBottom: "10px" }}>{props.intro}</div>
        </div>
      </div>
    </Card>
  );
};

const App = (props) => {
  const imgList = props.photos.map((item) => (
    <img
      key={item}
      className="img-container"
      width={243}
      src={`${imageURL}${item}`}
    />
  ));

  return (
    <Card style={{ width: "100%" }}>
      <h2>帖子详情</h2>
      <ProfileCard {...props.author} />
      <p>{props.content}</p>
      {imgList}
    </Card>
  );
};

export default App;
