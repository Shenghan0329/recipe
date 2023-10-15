import { Form, Input } from "antd";
const { TextArea } = Input;

const InputText = ({ label, name = label, required = true, rows = 1 }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: { required },
        },
      ]}
    >
      {rows === 1 ? <Input /> : <TextArea rows={rows} />}
    </Form.Item>
  );
};

export default InputText;
