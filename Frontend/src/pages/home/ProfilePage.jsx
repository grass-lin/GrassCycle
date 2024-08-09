import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Upload } from "antd";
import SubButton from "./units/SubButton";
import { baseURL } from "../../utils/axios";
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const ProfilePage = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  return (
    <>
      <Checkbox
        checked={!componentDisabled}
        onChange={(e) => setComponentDisabled(!e.target.checked)}
      >
        启用编辑
      </Checkbox>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="昵称">
          <Input />
        </Form.Item>
        <Form.Item label="个人简介">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="上传头像"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action={`${baseURL}/api/upload`} listType="picture-card">
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
                选择图片
              </div>
            </button>
          </Upload>
        </Form.Item>
      </Form>
      <SubButton isAllowEdit={!componentDisabled} />
    </>
  );
};
export default ProfilePage;
