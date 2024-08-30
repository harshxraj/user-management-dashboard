import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { User } from "../services/api";

interface UserModalProps {
  visible: boolean;
  onClose: () => void;
  currentUser?: User | null;
  onSave: any;
}

const UserModal: React.FC<UserModalProps> = ({ visible, onClose, currentUser, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields(); // Reset form fields whenever the modal is opened
      if (currentUser) {
        form.setFieldsValue(currentUser); // Set form fields with the current user's data
      }
    }
  }, [visible, currentUser, form]);

  const handleSubmit = (values: Omit<User, "id">) => {
    onSave(currentUser ? { ...values, id: currentUser.id } : values);
  };

  return (
    <Modal
      title={currentUser ? "Edit User" : "Add User"}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the name" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["company", "name"]}
          label="Department"
          rules={[{ required: true, message: "Please enter the department" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
