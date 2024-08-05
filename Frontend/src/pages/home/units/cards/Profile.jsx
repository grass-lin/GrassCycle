import React from "react";
import { Card } from "antd";
import "../../HomePage.css";

const Profile = () => {
  return (
    <Card title="个人资料" bordered={true} hoverable className="profile-card">
      <p>Content1</p>
      <p>Content2</p>
      <p>Content3</p>
    </Card>
  );
};

export default Profile;
