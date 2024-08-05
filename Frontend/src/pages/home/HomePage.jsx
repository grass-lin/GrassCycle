import React from "react";
import { Space } from "antd";
import { MyFocus, HotPosts } from "./HomeCards";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="leftpart">
      <MyFocus />
      <Space />
      <HotPosts />
    </div>
  );
};

export default HomePage;
