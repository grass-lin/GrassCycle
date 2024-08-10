import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { getHallData } from "../../utils/index";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 3 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
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

  const getCycleData = () => {
    getHallData().then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    getCycleData();
  }, []);

  return (
    <Table
      columns={config}
      dataSource={data}
      size="large"
      pagination={{
        pageSize: 8,
      }}
    />
  );
};
export default App;
