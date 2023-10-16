import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

// Sample item: {name, label, function}
const DynamicInput = ({
  label = "List",
  name = "users",
  placeholder = "Add field",
  items = [],
}) => {
  return (
    <Form.Item label={label} style={{ marginBottom: 0 }}>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 0,
                  verticalAlign: "sup",
                  gap: "10px",
                }}
              >
                {items.map((item) => {
                  return (
                    <Form.Item
                      name={item.name || ""}
                      label={item.label || ""}
                      style={item.style || {}}
                      {...restField}
                    >
                      {item.function}
                    </Form.Item>
                  );
                })}
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                {placeholder}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default DynamicInput;
