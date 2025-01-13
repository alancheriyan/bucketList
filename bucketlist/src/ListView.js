import { Card, Input, Checkbox, Button,Collapse } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import { collection, addDoc, doc, updateDoc, deleteDoc,Timestamp  } from "firebase/firestore";
import { db } from "./firebase"; // Firebase setup file
import { dbSetting } from "./dbSetting";

export const ListView = ({ data }) => {
  const [categories, setCategories] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = async (categoryId, itemId, isCompleted) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            todoList: category.todoList.map((item) =>
              item.id === itemId
                ? { ...item, isCompleted: !isCompleted }
                : item
            ),
          };
        }
        return category;
      })
    );

    // Update Firebase
    try {
      await updateDoc(doc(db, dbSetting.TodoListTable, itemId), { isCompleted: !isCompleted });
    } catch (error) {
      console.error("Error updating todo item:", error);
    }
  };

  // Handle input change for uncompleted items
  const handleInputChange = async (categoryId, itemId, newValue) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            todoList: category.todoList.map((item) =>
              item.id === itemId ? { ...item, description: newValue } : item
            ),
          };
        }
        return category;
      })
    );

    // Update Firebase
    try {
      await updateDoc(doc(db, dbSetting.TodoListTable, itemId), { description: newValue });
    } catch (error) {
      console.error("Error updating todo item:", error);
    }
  };

  // Add a new uncompleted item
  const addNewUncompletedItem = async (categoryId) => {
    try {
      // Add to Firebase and get the document reference
      const docRef = await addDoc(collection(db, dbSetting.TodoListTable), {
        categoryId,
        description: null,
        isCompleted: false,
        createdAt: Timestamp.now()
      });
  
      const newItem = {
        id: docRef.id, // Use Firebase-generated ID
        description: null,
        isCompleted: false,
      };
  
      // Update local state
      setCategories((prevCategories) =>
        prevCategories.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              todoList: [...category.todoList, newItem],
            };
          }
          return category;
        })
      );
    } catch (error) {
      console.error("Error adding todo item:", error);
    }
  };
  
  // Remove an uncompleted item
  const removeUncompletedItem = async (categoryId, itemId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            todoList: category.todoList.filter((item) => item.id !== itemId),
          };
        }
        return category;
      })
    );

    // Delete from Firebase
    try {
      await deleteDoc(doc(db, dbSetting.TodoListTable, itemId));
    } catch (error) {
      console.error("Error deleting todo item:", error);
    }
  };

  // Add a new category
  const addNewCategory = async (categoryName) => {
    try {
      // Add to Firebase and get the document reference
      const docRef = await addDoc(collection(db, dbSetting.CategoryTable), {
        categoryName,
        createdAt: Timestamp.now(), // Optionally include a timestamp
      });
  
      const newCategory = {
        id: docRef.id, // Use Firebase-generated ID
        categoryName,
        todoList: [],
      };
  
      // Update local state
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  

  const contentBuilder = (category) => {
    const completedItems = category.todoList.filter((item) => item.isCompleted);
    const uncompletedItems = category.todoList.filter((item) => !item.isCompleted);

    return (
      <>
        {uncompletedItems.length === 0 && completedItems.length === 0 && (
          <Button
            className="schoolbell-regular"
            icon={<PlusCircleOutlined />}
            type="dashed"
            onClick={() => addNewUncompletedItem(category.id)}
            style={{ marginBottom: "16px" }}
          >
            Add New Item
          </Button>
        )}

        {uncompletedItems.length > 0 && (
          <div>
            <h3>Uncompleted</h3>
            {uncompletedItems.map((item, index) => (
              <div
                key={item.id}
                style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
              >
                <Checkbox
                  checked={item.isCompleted}
                  onChange={() =>
                    handleCheckboxChange(category.id, item.id, item.isCompleted)
                  }
                />
                <Input
                  className="delius-regular"
                  value={item.description}
                  placeholder="New Item"
                  onChange={(e) =>
                    handleInputChange(category.id, item.id, e.target.value)
                  }
                  style={{ marginLeft: "8px", flex: 1 }}
                />
                <MinusCircleOutlined
                  style={{ marginLeft: "8px", color: "red", cursor: "pointer" }}
                  onClick={() => removeUncompletedItem(category.id, item.id)}
                />
                {index === uncompletedItems.length - 1 && (
                  <PlusCircleOutlined
                    style={{ marginLeft: "8px", color: "#1890ff", cursor: "pointer" }}
                    onClick={() => addNewUncompletedItem(category.id)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {completedItems.length > 0 && (
          <div style={{ marginTop: "16px" }}>
            <h3>Completed</h3>
            {completedItems.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
              >
                <Checkbox
                  checked={item.isCompleted}
                  onChange={() =>
                    handleCheckboxChange(category.id, item.id, item.isCompleted)
                  }
                />
                <Input
                  className="delius-regular"
                  value={item.description}
                  disabled
                  style={{ marginLeft: "8px", flex: 1 }}
                />
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div>

   
    <Collapse>
      {categories.map((category) => {
        const totalItems = category.todoList.length;
        const completedItems = category.todoList.filter((item) => item.isCompleted).length;
  
        return (
          <Collapse.Panel
            key={category.id}
            header={
              <span className="mystery-quest-regular">
                {category.categoryName}
              </span>
            }
            extra={
              <div
                style={{
                  background: "#f0f0f0",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {`${completedItems}/${totalItems}`}
              </div>
            }
          >
            {contentBuilder(category)}
          </Collapse.Panel>
        );
      })}
    </Collapse>
  
    <Button
      className="schoolbell-regular"
      icon={<PlusCircleOutlined />}
      type="primary"
      onClick={() => setIsModalVisible(true)}
      style={{ marginTop: "16px", display: "block", width: "100%" }}
    >
      Add New Category
    </Button>
  
    <AddCategoryModal
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      onAddCategory={addNewCategory}
    />
     </div>
  );
  
};
