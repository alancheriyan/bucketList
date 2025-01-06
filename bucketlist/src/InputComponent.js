import React from "react";
import { Input } from 'antd';
import { PlusCircleOutlined} from '@ant-design/icons';
export const InputComponent = ({ label }) => {
  return (
    <div >
   <Input placeholder={label} suffix={<PlusCircleOutlined />}/>
  </div>
  
  );
};
