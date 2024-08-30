import React from "react";
import { Table, Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { User } from "../services/api";

interface UserTableProps {
  users: User[];
  loading: boolean;
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
}

const UserTable: React.FC<UserTableProps> = ({ users, loading, onDelete, onEdit, pagination }) => {
  const columns: ColumnsType<User> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Department", dataIndex: ["company", "name"], key: "company" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      rowKey="id"
      pagination={pagination}
      scroll={{ x: 600 }}
    />
  );
};

export default UserTable;
