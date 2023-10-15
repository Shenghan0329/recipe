import React from "react";
import { InputNumber, Form } from "antd";
const onChange = (value) => {
  // console.log("changed", value);
};
const InputValue = ({ min = 1, max = 10, label, name = label }) => {
  return (
    <Form.Item name={name} label={label}>
      <InputNumber min={min} max={max} onChange={onChange} />
    </Form.Item>
  );
};
export default InputValue;
