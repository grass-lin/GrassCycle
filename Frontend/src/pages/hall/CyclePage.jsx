import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { LikeOutlined, LikeFilled, MessageOutlined } from "@ant-design/icons";
import { Avatar, List, Button, Space, Card } from "antd";
import { getPosts } from "../../utils/index";
import "./HallPage.css";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App = () => {
  const { cycleID } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getPostsData = () => {
    getPosts({ cycleID: cycleID }).then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    getPostsData();
  }, []);

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
