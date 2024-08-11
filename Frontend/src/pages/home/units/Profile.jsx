import React from "react";
import { Card } from "antd";
import "../HomePage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchSelected } from "../../../store/reducers/Menu";

const Profile = ({ name, intro }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setSelectedKey = (target) => {
    dispatch(switchSelected(target));
  };
  return (
    <Card
      title="个人资料"
      bordered={true}
      hoverable
      onClick={() => {
        navigate("/home/profile");
        setSelectedKey("/home/profile");
      }}
    >
      <p className="profile-name">{name}</p>
      <p>{intro}</p>
    </Card>
  );
};

export default Profile;
