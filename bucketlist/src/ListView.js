import { Avatar, Card, Input, Checkbox } from "antd";
import React, { useState } from "react";

export const ListView = ({ data }) => {
  const [categories, setCategories] = useState(data);

  // Handle checkbox change
  const handleCheckboxChange = (categoryId, itemId, isCompleted) => {
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
  };

  // Handle input change for uncompleted items
  const handleInputChange = (categoryId, itemId, newValue) => {
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
  };

  const contentBuilder = (category) => {
    const completedItems = category.todoList.filter((item) => item.isCompleted);
    const uncompletedItems = category.todoList.filter((item) => !item.isCompleted);

    return (
      <>
        {uncompletedItems.length > 0 && (
          <div>
            <h3>Uncompleted</h3>
            {uncompletedItems.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <Checkbox
                  checked={item.isCompleted}
                  onChange={() =>
                    handleCheckboxChange(category.id, item.id, item.isCompleted)
                  }
                />
                <Input
                  value={item.description}
                  onChange={(e) =>
                    handleInputChange(category.id, item.id, e.target.value)
                  }
                  style={{ marginLeft: "8px", flex: 1 }}
                />
              </div>
            ))}
          </div>
        )}
        {completedItems.length > 0 && (
          <div style={{ marginTop: "16px" }}>
            <h3>Completed</h3>
            {completedItems.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <Checkbox
                  checked={item.isCompleted}
                  onChange={() =>
                    handleCheckboxChange(category.id, item.id, item.isCompleted)
                  }
                />
                <Input
                  value={item.description}
                  disabled
                  style={{ marginLeft: "8px", flex: 1 }}
                />
              </div>
            ))}
          </div>
        )}
        {uncompletedItems.length === 0 && completedItems.length === 0 && (
          <p>No items available</p>
        )}
      </>
    );
  };

  return (
    <div>
      {categories.map((category) => {
        const totalItems = category.todoList.length;
        const completedItems = category.todoList.filter((item) => item.isCompleted).length;

        return (
          <Card
            key={category.id}
            style={{ marginBottom: "16px", position: "relative" }}
          >
            {/* Status in the top-right corner */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#f0f0f0",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {`${completedItems}/${totalItems}`}
            </div>
            <Card.Meta
              avatar={
                <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${category.id}`} />
              }
              title={category.categoryName}
              description={contentBuilder(category)}
            />
          </Card>
        );
      })}
    </div>
  );
};