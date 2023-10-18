import React from "react";
import { InputNumber, Form } from "antd";
const onChange = (value) => {
  // console.log("changed", value);
};
const InputValue = ({
  min = 1,
  max = 10,
  label = "",
  placeholder = "",
  name = label,
  wrapped = true,
  others = {},
}) => {
  return wrapped ? (
    <Form.Item name={name} label={label} {...others}>
      <InputNumber
        min={min}
        max={max}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Form.Item>
  ) : (
    <InputNumber
      min={min}
      max={max}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
export default InputValue;
