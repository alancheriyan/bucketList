import React from "react";
import { ListView } from "./ListView";

export const TestPage = () => {


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
  }];



  return (
    <div className="listview">
      {/* <InputComponent label="New Category" TextValue={textValue} CategoryChange={CategoryChange} /> */}

      <ListView data={data}/>
    </div>
  );
};
