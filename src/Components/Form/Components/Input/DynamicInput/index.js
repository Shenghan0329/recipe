import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

// Sample item: {function}
const DynamicInput = ({ label = "List", name = "users", items = [] }) => {
  return (
    <Form.Item label={label} style={{ marginBottom: 0 }}>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 0,
                }}
                align="baseline"
              >
                {items.map((item) => {
                  return (
                    <Form.Item
                      style={{
                        marginBottom: 0,
                      }}
                      {...restField}
                    >
                      {item}
                    </Form.Item>
                  );
                })}
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default DynamicInput;
