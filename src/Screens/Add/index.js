//   readonly id: string;
//     readonly meauID: number;
//   readonly name: string;
//   readonly tags?: (string | null)[] | null;
//   readonly img: string;
//     readonly url: string;
//   readonly level?: string | null;
//   readonly peopleNum?: number | null;
//   readonly taste?: string | null;
//   readonly cookTime?: string | null;
//   readonly mainIngredient?: Ingredient[] | null;
//   readonly accessories?: (Ingredient | null)[] | null;
//   readonly measure?: Measure[] | null;
//   readonly techniques?: string | null;
//     readonly scrapyTime?: string | null;
//   readonly method?: Method | keyof typeof Method | null;
// readonly userID: string;
//   readonly prepareTime?: string | null;

import { Button, Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import React from "react";
import InputText from "../../Components/Form/Components/Input/Text";
import Options from "../../Components/Form/Components/Input/Options";
import InputValue from "../../Components/Form/Components/Input/InputValue";
import DynamicInput from "../../Components/Form/Components/Input/DynamicInput";
import UploadImage from "../../Components/Form/Components/UploadImage";
import DataContextProvider, {
  useDataContext,
} from "../../Contexts/DataContext";
import { User, Recipes, Method, Measure, Ingredient } from "../../models";

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

  const [imgList, setImgList] = useState(null);
  const [currMethodImg, setCurrMethodImg] = useState(null);
  const [methodImgList, setMethodImgList] = useState([]); // 2D array

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
  useEffect(() => {
    console.log(imgList);
  }, [imgList]);
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
      <Form.Item
        label="Dish Image"
        name="dishImage"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <UploadImage fileList={imgList} setFileList={setImgList} />
      </Form.Item>
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
      <DynamicInput
        label="Tags"
        name="tags"
        items={[
          {
            function: <InputText rows={1} wrapped={false} />,
            label: "",
            name: "tagName",
          },
        ]}
      />
      <DynamicInput
        label="Ingredients"
        name="ingredients"
        items={[
          {
            function: <InputText rows={1} wrapped={false} />,
            label: "Name",
            name: "ingreName",
          },
          {
            function: <InputText rows={1} required={false} wrapped={false} />,
            label: "Weight",
            name: "ingreWeight",
          },
        ]}
      />
      <DynamicInput
        label="Accessories"
        name="accessories"
        items={[
          {
            function: <InputText rows={1} wrapped={false} />,
            label: "Name",
            name: "accName",
          },
          {
            function: <InputText rows={1} required={false} wrapped={false} />,
            label: "Weight",
            name: "accWeight",
          },
        ]}
      />
      <DynamicInput
        label="Measures"
        name="measures"
        items={[
          {
            function: <InputText wrapped={false} rows={1} />,
            label: "Description",
            name: "description",
          },
          {
            function: (
              <UploadImage
                required={false}
                fileList={currMethodImg}
                setFileList={(img) => {
                  setCurrMethodImg(img);
                  setMethodImgList((props) => [...props, img]);
                }}
              />
            ),
            label: "Image",
            name: "methodImage",
          },
        ]}
      />
      <InputText label="Techniques" name="techniques" rows={4} />
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
