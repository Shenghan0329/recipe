import { Button, Form, Input, Select, Upload } from "antd";
const { Option } = Select;

const Options = ({
  label = "",
  name = label,
  placeholder = "",
  required = true,
  wrapped = true,
  options = [{ value: "1", content: "Default Content" }],
  others = {},
}) => {
  return wrapped ? (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: { required },
        },
      ]}
      {...others}
    >
      <Select placeholder={placeholder} allowClear>
        {options.map((obj, i) => (
          <Option key={obj.value + i} value={obj.value}>
            {obj.content}
          </Option>
        ))}
      </Select>
    </Form.Item>
  ) : (
    <Select placeholder={placeholder} allowClear>
      {options.map((obj, i) => (
        <Option key={obj.value + i} value={obj.value}>
          {obj.content}
        </Option>
      ))}
    </Select>
  );
};

export default Options;
