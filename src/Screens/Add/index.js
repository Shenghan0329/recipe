import { Button, Form, Input, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
const { Option } = Select;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Add = () => {
  const formRef = React.useRef(null);
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };
  const onFill = () => {
    formRef.current?.setFieldsValue({
      note: "Hello world!",
      difficulty: "0",
    });
  };
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
  return (
    <Form
      {...layout}
      ref={formRef}
      name="control-ref"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        paddingTop: "50px",
        paddingBottom: "30px",
      }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="difficulty"
        label="Difficulty"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onDiffChange}
          allowClear
        >
          <Option value="0">0</Option>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Add;
