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

import { Button, Form, Space, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
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
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

const Add = () => {
  const { dataSize, setDataSize } = useDataContext();
  const formRef = React.useRef(null);

  const [imgList, setImgList] = useState(null);
  const [currMethodImg, setCurrMethodImg] = useState(null);
  const [methodImgList, setMethodImgList] = useState([]); // 2D array

  // const handleOnChange = ({ fileList }) => {
  //   console.log(fileList);
  //   return fileList.map((file) => ({
  //     status: file.status,
  //     uid: file.uid,
  //     url: file.response ? file.response.data.url : file.url,
  //   }));
  // };
  const onFinish = (values) => {
    let file = values.file;
    console.log(file);
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
        maxWidth: "100%",
        paddingTop: "50px",
        paddingBottom: "30px",
      }}
    >
      <InputText
        label="Name"
        name="name"
        placeholder="Please enter the Dish Name"
      />
      <UploadImage
        fileList={imgList}
        setFileList={setImgList}
        label="Dish Image"
        name="img"
      />
      <Options
        label="Method"
        name="method"
        placeholder="Please enter the main technique for this dish"
        options={Object.keys(Method).map((key) => {
          return { value: key, content: Method[key] };
        })}
      />
      <InputText
        label="Level"
        name="level"
        rows={1}
        placeholder="Please enter the difficulty level"
      />
      <InputText label="Cook Time" name="cookTime" rows={1} />
      <InputValue label="Servings" name="peopleNum" />
      <InputText label="Taste" name="taste" rows={1} />
      <DynamicInput
        label="Tags"
        name="tags"
        placeholder="Add a new Tag"
        items={[
          {
            function: <InputText rows={2} wrapped={false} />,
            label: "",
            name: "tagName",
          },
        ]}
      />
      <DynamicInput
        label="Ingredients"
        name="mainIngredient"
        placeholder="Add an Ingredient"
        items={[
          {
            function: <InputText rows={1} wrapped={false} placeholder="Name" />,
            name: "name",
          },
          {
            function: (
              <InputText
                rows={1}
                required={false}
                wrapped={false}
                placeholder="Weight"
              />
            ),
            name: "weight",
          },
        ]}
      />
      <DynamicInput
        label="Accessories"
        name="accessories"
        placeholder="Add an Accessory"
        items={[
          {
            function: <InputText rows={1} wrapped={false} placeholder="Name" />,
            name: "name",
          },
          {
            function: (
              <InputText wrapped={false} rows={1} placeholder="Weight" />
            ),
            name: "weight",
          },
        ]}
      />
      <DynamicInput
        label="Steps"
        name="measures"
        placeholder="Add a step"
        items={[
          {
            function: (
              <InputText
                wrapped={false}
                rows={5}
                placeholder="Description for the step"
              />
            ),
            name: "des",
            style: { flexGrow: 1 },
          },
          {
            isFile: true,
            function: (others) => {
              return (
                <UploadImage
                  required={false}
                  fileList={currMethodImg}
                  name="picture"
                  setFileList={(img) => {
                    setCurrMethodImg(img);
                    setMethodImgList((props) => [...props, img]);
                  }}
                  others={others}
                />
              );
              // return (
              //   <InputText
              //     wrapped={false}
              //     rows={5}
              //     placeholder="Description for the step"
              //   />
              // );
            },
            name: "picture",
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
