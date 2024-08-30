import React, { useEffect, useState } from "react";
import { Button, Layout, message } from "antd";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";
import { User, getUsers, addUser, editUser, deleteUser } from "./services/api";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 12, total: 0 });

  useEffect(() => {
    fetchUsers();
  }, [pagination.current]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
      setPagination((prev) => ({ ...prev, total: response.data.length }));
    } catch (error) {
      message.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (user: Omit<User, "id">) => {
    try {
      const response = await addUser(user);
      setUsers((prevUsers) => [...prevUsers, { ...response.data, id: prevUsers.length + 1 }]); // Use a unique ID
      message.success("User added successfully.");
      closeModal();
    } catch (error) {
      message.error("Failed to add user.");
    }
  };

  const handleEditUser = async (updatedUser: User) => {
    try {
      await editUser(updatedUser.id, updatedUser);
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      message.success("User updated successfully.");
      closeModal();
    } catch (error) {
      message.error("Failed to update user.");
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      message.success("User deleted successfully.");
    } catch (error) {
      message.error("Failed to delete user.");
    }
  };

  const openModal = (user: User | null) => {
    setCurrentUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setCurrentUser(null);
    setModalVisible(false);
  };

  return (
    <Layout>
      <Header style={{ color: "white", textAlign: "center" }}>User Management Application</Header>
      <Content style={{ padding: "20px" }}>
        <Button type="primary" onClick={() => openModal(null)} style={{ marginBottom: "20px" }}>
          Add User
        </Button>
        <UserTable
          users={users}
          loading={loading}
          onDelete={handleDeleteUser}
          onEdit={openModal}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page) => setPagination((prev) => ({ ...prev, current: page })),
          }}
        />
        <UserModal
          visible={modalVisible}
          onClose={closeModal}
          currentUser={currentUser}
          onSave={currentUser ? handleEditUser : handleAddUser}
        />
      </Content>
    </Layout>
  );
};

export default App;
