import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import UploadImage from "../../UploadImage";

// Sample item: {name, label, function, isFile}
const DynamicInput = ({
  label = "List",
  name = "users",
  placeholder = "Add field",
  items = [],
  required = false,
}) => {
  return (
    <Form.Item label={label} style={{ marginBottom: 0 }} required={required}>
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
                {items.map((item, index) => {
                  return !item.isFile ? (
                    <Form.Item
                      name={[name, item.name || ""]}
                      key={name + index}
                      label={item.label || ""}
                      style={item.style || {}}
                      {...restField}
                    >
                      <div>{item.function}</div>
                    </Form.Item>
                  ) : (
                    item.function({
                      key: name + index,
                      name: [name, item.name || ""],
                      ...restField,
                    })
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
