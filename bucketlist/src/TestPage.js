import React, { useState } from "react";
import { InputComponent } from "./InputComponent";

export const TestPage = () => {
  const [textValue, setTextValue] = useState("");

  const CategoryChange = (e) => {
    setTextValue(e);
    console.log(e);
  };

  return (
    <div>
      <InputComponent label="New Category" TextValue={textValue} CategoryChange={CategoryChange} />
    </div>
  );
};
