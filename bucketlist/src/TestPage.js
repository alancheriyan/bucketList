import React, { useState } from "react";
import { InputComponent } from "./InputComponent";
import { ListView } from "./ListView";

export const TestPage = () => {
  const [textValue, setTextValue] = useState("");

  const data=[{
    id:"1",
    categoryName: "Movie",
    todoList:[{
      id:"1",
      description:"testMovie",
      isCompleted:false
    },
    {
      id:"2",
      description:"testMovie1",
      isCompleted:true
    }
  ,
  {
    id:"3",
    description:"testMovie2",
    isCompleted:false
  }
  ]
  },
  {
    id:"2",
    categoryName: "Place to visit",
    todoList:[
  ]
  }]



  const CategoryChange = (e) => {
    setTextValue(e);
    console.log(e);
  };

  return (
    <div>
      {/* <InputComponent label="New Category" TextValue={textValue} CategoryChange={CategoryChange} /> */}

      <ListView data={data}/>
    </div>
  );
};
