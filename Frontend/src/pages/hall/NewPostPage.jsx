import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Form, Button, Input, Upload, message } from "antd";
import { postNewPost } from "../../utils/index";
import "./HallPage.css";

const maxPhotoCount = 5;
const NewPostPage = () => {
  const navigate = useNavigate();

  const [fileList, setFileList] = useState([]);
  const { cycleID } = useParams();

  const usertoken = localStorage.getItem("token");

  const handleFinish = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    formData.append("userID", usertoken);

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    console.log(formData.entries());
    postNewPost(formData, { cycleID: cycleID })
      .then(() => {
        message.success("提交成功！");
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      })
      .catch(() => {
        message.error("提交失败！");
      });
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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
        <span>here is cycle 1</span>
      </div>
      <Form layout="horizontal" onFinish={handleFinish}>
        <Form.Item label="标题" name="title">
          <Input.TextArea
            showCount
            maxLength={40}
            style={{ resize: "none" }}
            placeholder="请填写标题"
          />
        </Form.Item>

        <Form.Item label="内容" name="content">
          <Input.TextArea
            showCount
            maxLength={400}
            style={{ height: 400, resize: "none" }}
            placeholder="请添加内容"
          />
        </Form.Item>

        <Form.Item label="上传图片">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // 阻止自动上传，手动上传
            maxCount={maxPhotoCount}
          >
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />

              <div
                style={{
                  marginTop: 8,
                }}
              >
                上传
              </div>
            </button>
          </Upload>
        </Form.Item>
        <div className="photo-des">{`最多支持上传${maxPhotoCount}张图片`}</div>
        <Form.Item style={{ marginTop: 20 }} className="submit-button">
          <Button type="primary" htmlType="submit" size="large">
            发布帖子
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewPostPage;
