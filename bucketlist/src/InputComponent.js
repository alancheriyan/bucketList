import React from "react";
import { Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export const InputComponent = ({ label, TextValue, CategoryChange }) => {
  return (
    <div>
      <Input
        placeholder={label}
        value={TextValue}
        onChange={(e) => CategoryChange(e.target.value)} // Call CategoryChange from parent
        suffix={<PlusCircleOutlined />}
      />
    </div>
  );
};
