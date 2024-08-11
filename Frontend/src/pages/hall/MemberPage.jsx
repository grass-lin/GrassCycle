import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  LikeOutlined,
  LikeFilled,
  MessageOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Avatar, List, Button, Space, Card } from "antd";
import {
  getCycle,
  postUserJoin,
  getUserData,
  postUserLike,
  deleteUserLike,
  deleteUserJoin,
} from "../../utils/index";
import "./HallPage.css";
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
  //const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  //const setSelectedKey = (target) => {
  //  dispatch(switchSelected(target));
  //};

  const getData = () => {
    getCycle({ cycleID: cycleID }).then((response) => {
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
    navigate(-1);
  };

  const inCycle = () => {
    if (userData.join.findIndex((item) => item.cycleKey == cycleID) == -1)
      return false;
    else return true;
  };

  if (loading || !userData) return <div>Loading...</div>;
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
          {inCycle() ? (
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
          <Button
            type="primary"
            onClick={() => {
              navigate("member");
            }}
          >
            查看圈子成员
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
        renderItem={(item) => {
          const isLiked = item.likeList.includes(Number(token));
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
                    avatar={<Avatar src={`${imageURL}${item.author.avatar}`} />}
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
