import { Button, Form, Input, Select, Upload } from "antd";
const { Option } = Select;

const Options = ({
  label = "",
  name = label,
  placeholder = "",
  required = true,
  wrapped = true,
  options = [{ value: "1", content: "Default Content" }],
}) => {
  const onDiffChange = (value) => {
    // switch (value) {
    //   case "0":
    //     formRef.current?.setFieldsValue({
    //       note: "Hi, man!",
    //     });
    //     break;
    //   case "1":
    //     formRef.current?.setFieldsValue({
    //       note: "Hi, lady!",
    //     });
    //     break;
    //   case "2":
    //     formRef.current?.setFieldsValue({
    //       note: "Hi, lady!",
    //     });
    //     break;
    //   case "3":
    //     formRef.current?.setFieldsValue({
    //       note: "Hi, lady!",
    //     });
    //     break;
    //   default:
    //     break;
    // }
  };
  return wrapped ? (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: { required },
        },
      ]}
    >
      <Select placeholder={placeholder} onChange={onDiffChange} allowClear>
        {options.map((obj) => (
          <Option value={obj.value}>{obj.content}</Option>
        ))}
      </Select>
    </Form.Item>
  ) : (
    <Select placeholder={placeholder} onChange={onDiffChange} allowClear>
      {options.map((obj) => (
        <Option value={obj.value}>{obj.content}</Option>
      ))}
    </Select>
  );
};

export default Options;
