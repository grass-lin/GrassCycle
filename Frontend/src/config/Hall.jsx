import { Space, Tag } from "antd";

import { useNavigate } from "react-router-dom";

const handleJoin = (to) => {
  const navigate = useNavigate();
  navigate(to);
  return <></>;
};

export default [
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
