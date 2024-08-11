import React from "react";
import { Card, List } from "antd";
import { useNavigate } from "react-router-dom";
import "../HomePage.css";

const Focus = (props) => {
  const navigate = useNavigate();
  const handleTrans = (cycleKey) => {
    navigate(`/hall/cycle/${cycleKey}`);
  };

  const focus = props.join.map((item) => (
    <Card
      hoverable
      key={item.cycleKey}
      onClick={() => {
        handleTrans(item.cycleKey);
      }}
    >
      {item.name}
    </Card>
  ));
  return (
    <Card title="关注圈子" className="Focus-card" style={{ marginTop: "50px" }}>
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          pageSize: 3,
        }}
        dataSource={props.join}
        renderItem={(item) => {
          return (
            <Card
              hoverable
              key={item.cycleKey}
              onClick={() => {
                handleTrans(item.cycleKey);
              }}
              style={{
                marginTop: "5px",
              }}
            >
              {item.name}
            </Card>
          );
        }}
      />
    </Card>
  );
};

export default Focus;
