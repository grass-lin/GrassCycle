import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  LikeFilled,
  CommentOutlined,
  BookOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { List, Button, Space, Card, Row, Col } from "antd";
import { getHallData, getUserData } from "../../utils/index";
import "./HallPage.css";
import { ProfileCard } from "./Post/Content";

const IconText = ({ icon, text }) => (
  <Space style={{ marginRight: "40px" }}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App = () => {
  const { cycleID } = useParams();

  const [memberData, setMemberData] = useState();

  const navigate = useNavigate();

  const getData = () => {
    getHallData().then(({ data }) => {
      const index = data.findIndex((item) => item.key == cycleID);
      const memberList = data[index].member;
      if (Array.isArray(memberList)) {
        Promise.all(
          memberList.map((item) => {
            return getUserData({ userID: item }).then(({ data }) => {
              let likeNum = 0;
              let postNum = 0;
              let commentNum = 0;
              let temp = data.like.find((item) => item.cycle == cycleID);
              if (temp) {
                likeNum = temp.post.length;
              }

              temp = data.post.find((item) => item.cycleKey == cycleID);
              if (temp) {
                postNum = temp.post.length;
              }

              temp = data.comment.find((item) => item.cycleKey == cycleID);
              if (temp) {
                commentNum = temp.post.reduce((count, post) => {
                  return count + post.comment.length;
                }, 0);
              }
              return {
                key: data.id,
                name: data.profile.name,
                intro: data.profile.intro,
                avatar: data.profile.avatar,
                likeNum: likeNum,
                postNum: postNum,
                commentNum: commentNum,
              };
            });
          })
        ).then((members) => {
          setMemberData(members);
        });
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (!memberData) return <div>Loading...</div>;

  return (
    <div>
      <div className="cycle-header">
        <Button
          type="primary"
          icon={<LeftOutlined />}
          onClick={() => {
            navigate(-1);
          }}
        >
          返回上一级
        </Button>
      </div>
      <Row justify="center">
        <Col span={16}>
          <h2>圈子成员</h2>
          <List
            itemLayout="vertical"
            size="small"
            pagination={{
              pageSize: 4,
            }}
            dataSource={memberData}
            renderItem={(item) => (
              <div className="post" style={{ marginTop: "20px" }}>
                <List.Item key={item.key}>
                  <Card>
                    <ProfileCard
                      name={item.name}
                      intro={item.intro}
                      avatar={item.avatar}
                    />
                    <span className="member-container">
                      <IconText
                        icon={LikeFilled}
                        text={`圈内点赞数${item.likeNum}`}
                      ></IconText>
                      <IconText
                        icon={BookOutlined}
                        text={`圈内发帖数${item.postNum}`}
                      ></IconText>
                      <IconText
                        icon={CommentOutlined}
                        text={`圈内评论数${item.commentNum}`}
                      ></IconText>
                    </span>
                  </Card>
                </List.Item>
              </div>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
export default App;
