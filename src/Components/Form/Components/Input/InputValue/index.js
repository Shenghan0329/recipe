import React from "react";
import { InputNumber, Form } from "antd";
const onChange = (value) => {
  // console.log("changed", value);
};
const InputValue = ({
  min = 1,
  max = 10,
  label = "",
  name = label,
  wrapped = true,
}) => {
  return wrapped ? (
    <Form.Item name={name} label={label}>
      <InputNumber min={min} max={max} onChange={onChange} />
    </Form.Item>
  ) : (
    <InputNumber min={min} max={max} onChange={onChange} />
  );
};
export default InputValue;
