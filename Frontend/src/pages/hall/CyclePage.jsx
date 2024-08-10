import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { switchSelected } from "../../store/reducers/Menu";
import {
  LikeOutlined,
  LikeFilled,
  MessageOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Avatar, List, Button, Space, Card } from "antd";
import {
  getPosts,
  postUserJoin,
  getUserData,
  postUserLike,
  deleteUserLike,
  deleteUserJoin,
} from "../../utils/index";
import "./HallPage.css";
import { useDispatch } from "react-redux";
import { imageURL } from "../../utils/axios";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App = () => {
  const { cycleID } = useParams();

  const [cycleData, setCycleData] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const setSelectedKey = (target) => {
    dispatch(switchSelected(target));
  };

  const getData = () => {
    getPosts({ cycleID: cycleID }).then((response) => {
      setCycleData(response.data);
      setLoading(false);
    });
    getUserData({ userID: token }).then((response) => {
      setUserData(response.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClickPost = (item) => {
    navigate(`${item.key}`);
  };

  const handleLike = (item, isLiked) => {
    if (isLiked == false) {
      postUserLike(
        { userID: token },
        { cycleID: cycleID, postKey: item.key }
      ).then(() => {
        getData();
      });
    } else {
      deleteUserLike(
        { userID: token },
        { cycleID: cycleID, postKey: item.key }
      ).then(() => {
        getData();
      });
    }
  };

  const handleJoin = (type) => {
    if (type) {
      postUserJoin({ userID: token }, { cycleID: cycleID }).then(() => {
        getData();
      });
    } else {
      deleteUserJoin({ userID: token }, { cycleID: cycleID }).then(() => {
        getData();
      });
    }
  };

  const handleGoBack = () => {
    navigate("/hall");
    setSelectedKey("/hall");
  };

  if (loading || !userData) {
    return <div>Loading...</div>;
  } else
    return (
      <div>
        <div className="cycle-header">
          <Button
            type="primary"
            icon={<LeftOutlined />}
            onClick={() => {
              handleGoBack();
            }}
          >
            返回上一级
          </Button>
          <span className="new-cancel">
            {userData.join.includes(`${cycleID}`) ? (
              <Button onClick={() => handleJoin(false)}>取消关注</Button>
            ) : (
              <Button type="primary" onClick={() => handleJoin(true)}>
                关注圈子
              </Button>
            )}
            <Button
              type="primary"
              onClick={() => {
                navigate("new");
              }}
            >
              发布帖子
            </Button>
          </span>
        </div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 4,
          }}
          dataSource={cycleData}
          footer={
            <div>
              <p>this is cycle {cycleID}</p>
            </div>
          }
          renderItem={(item) => {
            const isLiked = item.likeList.includes(token);
            return (
              <div className="post" style={{ marginTop: "20px" }}>
                <Card hoverable onClick={() => handleClickPost(item)}>
                  <List.Item
                    key={item.key}
                    dependencies={cycleData}
                    extra={
                      item.photos.length ? (
                        <img width={272} src={`${imageURL}${item.photos[0]}`} />
                      ) : null
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src={`${imageURL}${item.author.avator}`} />
                      }
                      title={item.author.name}
                      description={item.author.intro}
                    />
                    <div>
                      <h3>{item.title}</h3>
                      {item.content}
                    </div>
                  </List.Item>
                </Card>
                <div className="downside">
                  <Button
                    icon={isLiked ? <LikeFilled /> : <LikeOutlined />}
                    type={isLiked ? "primary" : "default"}
                    onClick={() => {
                      handleLike(item, isLiked);
                    }}
                  >
                    喜欢
                  </Button>
                  <IconText icon={LikeOutlined} text={item.likes} />
                  <IconText icon={MessageOutlined} text={item.comments} />
                </div>
              </div>
            );
          }}
        />
      </div>
    );
};
export default App;
