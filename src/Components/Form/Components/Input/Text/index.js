import { Form, Input } from "antd";
const { TextArea } = Input;

const InputText = ({
  label = "",
  name = label,
  placeholder = "",
  required = true,
  rows = 1,
  wrapped = true,
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
      {rows === 1 ? (
        <Input placeholder={placeholder} />
      ) : (
        <TextArea rows={rows} placeholder={placeholder} />
      )}
    </Form.Item>
  ) : rows === 1 ? (
    <Input placeholder={placeholder} />
  ) : (
    <TextArea rows={rows} placeholder={placeholder} />
  );
};

export default InputText;
