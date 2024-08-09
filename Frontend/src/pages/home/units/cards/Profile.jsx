import React from "react";
import { Card } from "antd";
import "../../HomePage.css";

const Profile = ({ name, intro }) => {
  return (
    <Card title="个人资料" bordered={true} hoverable>
      <p className="profile-name">{name}</p>
      <p>{intro}</p>
    </Card>
  );
};

export default Profile;
