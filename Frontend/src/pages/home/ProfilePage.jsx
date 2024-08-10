import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getUserData } from "../../utils/index";
import { updateUserData } from "../../utils/index";
import "./HomePage.css";

const MyEditableForm = () => {
  const [form] = Form.useForm();
  const [isEditable, setIsEditable] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [profile, setProfile] = useState();
  const usertoken = localStorage.getItem("token");
  const getData = () => {
    getUserData({ userID: usertoken }).then((res) => {
      setProfile(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
    if (isEditable === true) {
      form.resetFields();
    }
  };

  const handleFinish = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    // 提交数据
    updateUserData(formData, { userID: usertoken })
      .then(() => {
        message.success("提交成功！");
        setIsEditable(false);
        getData();
      })
      .catch(() => {
        message.error("提交失败！");
      });
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleFinish}
        initialValues={{
          name: `${profile.profile.name}`,
          intro: `${profile.profile.intro}`,
        }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="昵称" name="name">
          <Input disabled={!isEditable} />
        </Form.Item>

        <Form.Item label="个人简介" name="intro">
          <Input.TextArea
            disabled={!isEditable}
            showCount
            maxLength={50}
            style={{ height: 100, resize: "none" }}
          />
        </Form.Item>

        <Form.Item label="更新头像">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // 阻止自动上传，手动上传
            disabled={!isEditable}
            maxCount={1}
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

        <div className="edit-submit">
          {!isEditable ? (
            <Button type="default" onClick={handleEditClick}>
              启用编辑
            </Button>
          ) : (
            <Button type="default" onClick={handleEditClick}>
              取消编辑
            </Button>
          )}
          {isEditable && (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>
    </div>
  );
};

export default MyEditableForm;
