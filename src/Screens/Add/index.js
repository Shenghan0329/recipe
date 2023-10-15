//  readonly id: string;
// readonly meauID: number;
//   readonly name: string;
// readonly tags?: (string | null)[] | null;
// readonly img: string;
//     readonly url: string;
//   readonly level?: string | null;
//   readonly peopleNum?: number | null;
//   readonly taste?: string | null;
//   readonly cookTime?: string | null;
// readonly mainIngredient?: Ingredient[] | null;
// readonly accessories?: (Ingredient | null)[] | null;
// readonly measure?: Measure[] | null;
//   readonly techniques?: string | null;
//     readonly scrapyTime?: string | null;
//   readonly method?: Method | keyof typeof Method | null;
// readonly userID: string;
//   readonly prepareTime?: string | null;

import { Button, Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import React from "react";
import InputText from "../../Components/Form/Components/Input/Text";
import Options from "../../Components/Form/Components/Input/Options";
import DataContextProvider, {
  useDataContext,
} from "../../Contexts/DataContext";
import { User, Recipes, Method, Measure, Ingredient } from "../../models";
import InputValue from "../../Components/Form/Components/Input/InputValue";

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
  const { dataSize, setDataSize } = useDataContext();
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
  useEffect(() => {
    console.log(dataSize);
  }, [dataSize]);
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
      <InputText label="Name" name="name" />
      <Options
        label="Method"
        name="method"
        options={Object.keys(Method).map((key) => {
          return { value: key, content: Method[key] };
        })}
      />
      <InputText label="Level" name="level" rows={1} />
      <InputValue label="Servings" name="peopleNum" />
      <InputText label="Taste" name="taste" rows={1} />
      <InputText label="Cook Time" name="cookTime" rows={1} />
      <InputText label="Techniques" name="techniques" rows={4} />
      <Options
        label="Difficulty"
        name="difficulty"
        options={[
          { value: "0", content: 0 },
          { value: "1", content: 1 },
          { value: "2", content: 2 },
          { value: "3", content: 3 },
        ]}
      />

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
