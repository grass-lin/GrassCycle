import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  List,
  Card,
  Avatar,
  message,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import PostContent from "./Post/Content";
import { getPost, postComment } from "../../utils/index";
import { imageURL } from "../../utils/axios";

const App = () => {
  const [form] = Form.useForm();
  const { cycleID, postID } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState();
  const [commentList, setCommentList] = useState();
  const usertoken = localStorage.getItem("token");
  const getPostData = () => {
    getPost({ cycleID: cycleID, postID: postID }).then(({ data }) => {
      setPostData(data);
      setCommentList(data.commentList);
    });
  };

  const handleComment = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append("userID", usertoken);

    postComment(formData, { cycleID: cycleID, postID: postID }).then(() => {
      getPostData();
      message.success("发布成功");
      form.resetFields();
    });
  };

  useEffect(() => {
    getPostData();
  }, []);

  if (!postData || !commentList) {
    return <div>Loading...</div>;
  }

  const { key, ...content } = postData;
  return (
    <div>
      <Button
        type="primary"
        icon={<LeftOutlined />}
        onClick={() => {
          navigate(-1);
        }}
      >
        返回上一级
      </Button>
      <Row justify="center">
        <Col span={18}>
          <Row>
            <PostContent {...content} />
            <List
              itemLayout="vertical"
              style={{ width: "100%" }}
              header={<h3>评论</h3>}
              size="small"
              pagination={{
                pageSize: 3,
              }}
              dataSource={postData.commentList}
              renderItem={(item) => {
                return (
                  <div className="post" style={{ marginTop: "20px" }}>
                    <Card>
                      <List.Item key={item.key}>
                        <List.Item.Meta
                          avatar={
                            <Avatar src={`${imageURL}${item.author.avatar}`} />
                          }
                          title={item.author.name}
                          description={item.author.intro}
                        />
                        <div>{item.content}</div>
                      </List.Item>
                    </Card>
                  </div>
                );
              }}
            />
          </Row>
          <Form
            form={form}
            name="comment"
            onFinish={handleComment}
            autoComplete="off"
          >
            <Form.Item
              label="发布评论"
              name="content"
              rules={[
                {
                  required: true,
                  message: "请添加内容",
                },
              ]}
            >
              <Input.TextArea
                showCount
                maxLength={200}
                style={{ height: 120, resize: "none" }}
                placeholder="发布你的新评论吧"
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                发布评论
              </Button>
            </Form.Item>
          </Form>{" "}
        </Col>
      </Row>
    </div>
  );
};
export default App;
