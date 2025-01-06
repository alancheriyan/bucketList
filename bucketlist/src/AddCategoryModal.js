import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

const AddCategoryModal = ({ visible, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleOk = () => {
    if (categoryName) {
      onAddCategory(categoryName);
      setCategoryName(""); // Reset the input field
      onClose(); // Close the modal
    }
  };

  const handleCancel = () => {
    setCategoryName(""); // Reset the input field
    onClose(); // Close the modal
  };

  return (
    <Modal
      title="Add New Category"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add"
      cancelText="Cancel"
    >
      <Input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Enter category name"
      />
    </Modal>
  );
};

export default AddCategoryModal;
