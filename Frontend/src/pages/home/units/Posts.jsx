import React from "react";
import { Card, List } from "antd";
import { useNavigate } from "react-router-dom";

const Posts = (props) => {
  const navigate = useNavigate();
  const handleTrans = (cycleKey, postKey) => {
    navigate(`/hall/cycle/${cycleKey}/${postKey}`);
  };

  let postData = [];
  if (Array.isArray(props.post)) {
    props.post.forEach((item) => {
      console.log(item);
      if (Array.isArray(item.post)) {
        item.post.forEach((it) => {
          postData.push({
            cycleKey: item.cycleKey,
            post: it.postKey,
            title: it.title,
          });
        });
      }
    });
  }

  return (
    <Card title="帖子" style={{ marginTop: "20px" }}>
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          pageSize: 3,
        }}
        dataSource={postData}
        renderItem={(item) => {
          return (
            <Card
              hoverable
              key={item.cycleKey * 10007 + item.post}
              onClick={() => {
                handleTrans(item.cycleKey, item.post);
              }}
              style={{
                marginTop: "5px",
              }}
            >
              {item.title}
            </Card>
          );
        }}
      />
    </Card>
  );
};

export default Posts;
