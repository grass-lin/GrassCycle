import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal, Form, Input } from "antd";
import { getHallData, postNewCycle } from "../../utils/index";
import { useNavigate } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";
import "./HallPage.css";

const App = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const usertoken = localStorage.getItem("token");

  const handleJoin = (to) => {
    navigate(`cycle/${to}`);
  };

  const config = [
    {
      title: "兴趣圈",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "人数",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    //{
    //title: "标签",
    //key: "tags",
    //dataIndex: "tags",
    //render: (_, { tags }) => (
    //<>
    //{tags.map((tag) => {
    //let color = tag.length > 3 ? "geekblue" : "green";
    //if (tag === "loser") {
    //color = "volcano";
    //}
    //return (
    //<Tag color={color} key={tag}>
    //{tag.toUpperCase()}
    //</Tag>
    //);
    //})}
    //</>
    //),
    //},
    {
      title: "选项",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleJoin(record.key);
            }}
          >
            进圈
          </a>
        </Space>
      ),
    },
  ];
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((val) => {
      postNewCycle({ ...val, userID: usertoken }).then(() => {
        handleCancel();
        getCycleData();
      });
    });
  };

  const getCycleData = () => {
    getHallData().then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    getCycleData();
  }, []);

  return (
    <>
      <div className="hall-header">
        <Button
          type="primary"
          icon={<PlusCircleFilled />}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          创建新圈子
        </Button>
      </div>
      <Table
        columns={config}
        dataSource={data}
        size="large"
        pagination={{
          pageSize: 8,
        }}
      />
      <Modal
        open={isModalOpen}
        title={"新建圈子"}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          labelAlign="left"
        >
          <Form.Item
            label="圈子名字"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入圈子名字",
              },
            ]}
          >
            <Input placeholder="请输入圈子名字" />
          </Form.Item>
          <Form.Item
            label="圈子描述"
            name="description"
            rules={[
              {
                required: true,
                message: "请添加描述",
              },
            ]}
          >
            <Input.TextArea
              placeholder="请添加描述"
              style={{ height: 60, resize: "none" }}
              showCount
              maxLength={30}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default App;
