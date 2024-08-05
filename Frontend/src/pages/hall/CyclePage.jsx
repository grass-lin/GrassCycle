import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { LikeOutlined, LikeFilled, MessageOutlined } from "@ant-design/icons";
import { Avatar, List, Button, Space, Card } from "antd";
import "./HallPage.css";
const postData = Array.from({
  length: 23,
}).map((_, i) => ({
  key: i,
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  isLiked: false,
  comments: i,
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App = () => {
  const { cycleID } = useParams();
  const [data, setData] = useState(postData);
  const navigate = useNavigate();

  const handleClickPost = (item) => {
    console.log(item);
    navigate(`${item.key}`);
  };

  const handleLike = (item) => {
    const newData = data.map((dataItem) => {
      if (dataItem.key === item.key) {
        return { ...dataItem, isLiked: !dataItem.isLiked };
      }
      return dataItem;
    });
    setData(newData);
  };
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={data}
      footer={
        <div>
          <p>this is cycle {cycleID}</p>
        </div>
      }
      renderItem={(item) => (
        <div className="post" style={{ marginTop: "20px" }}>
          <Card hoverable onClick={() => handleClickPost(item)}>
            <List.Item
              key={item.title}
              dependencies={data}
              extra={
                cycleID == 1 ? (
                  <img
                    width={272}
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                ) : null
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.title}
                description={item.description}
              />
              {item.content}
            </List.Item>
          </Card>
          <div className="downside">
            <Button
              icon={item.isLiked ? <LikeFilled /> : <LikeOutlined />}
              type={item.isLiked ? "primary" : "default"}
              onClick={() => {
                handleLike(item);
              }}
            >
              喜欢
            </Button>
            <IconText icon={MessageOutlined} text={item.comments} />
          </div>
        </div>
      )}
    />
  );
};
export default App;
