//   readonly id: string;
//   readonly meauID: number;
//   readonly name: string;
//   readonly tags?: (string | null)[] | null;
//   readonly img: string;
//   readonly url: string;
//   readonly level?: string | null;
//   readonly peopleNum?: number | null;
//   readonly taste?: string | null;
//   readonly cookTime?: string | null;
//   readonly mainIngredient?: Ingredient[] | null;
//   readonly accessories?: (Ingredient | null)[] | null;
//   readonly measure?: Measure[] | null;
//   readonly techniques?: string | null;
//   readonly scrapyTime?: string | null;
//   readonly method?: Method | keyof typeof Method | null;
//   readonly userID: string;
//   readonly prepareTime?: string | null;

import { Button, Form, Space, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
// import "dotenv/config";
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
import { DataStore } from "@aws-amplify/datastore";
import storeFile from "../../Helpers/store";

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

  const store = async function (recipe) {
    let fail = 0;
    let result = { ...recipe };
    result["url"] = "NA";
    result["meauID"] = dataSize + 1;
    result["peopleNum"] = parseInt(recipe.peopleNum);
    result["tags"] = result["tags"]?.map((item) => item.tagName);
    result["mainIngredient"] = result.mainIngredient.map(
      (item) => new Ingredient(item)
    );
    result["accessories"] = result.accessories.map(
      (item) => new Ingredient(item)
    );
    let img = await storeFile(result["img"][0]);
    if (img === -1) return -1;
    result["img"] = img;
    for (let i = 0; i < result["measure"].length; i++) {
      const res = await parseMeasure(result["measure"][i], i + 1);
      if (res === -1) {
        fail = -1;
        console.log("Fail in uploading");
        break;
      }
      result["measure"][i] = res;
    }
    if (fail === -1) return -1;
    result["method"] = Method[recipe.method];
    result.scrapyTime = new Date().toISOString();
    // result.userID = process.env.ADMIN_USER;
    const user = await DataStore.query(User);
    result.userID = user[0].id;
    console.log(result);
    try {
      await DataStore.save(new Recipes(result));
      return 0;
    } catch (error) {
      console.log("Failed to store to database" + error);
      return -1;
    }
  };

  const parseMeasure = async (measure, index) => {
    let storedLink = await storeFile(measure.picture[0]);
    if (storedLink === -1) return -1;
    measure.picture = [storedLink];
    measure.step = index + "";
    console.log(measure);
    return new Measure(measure);
  };
  const onFinish = async (values) => {
    console.log(values);
    store(values);
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
      <UploadImage label="Dish Image" name="img" />
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
      <InputText label="Prepare Time" name="prepareTime" rows={1} />
      <InputValue label="Servings" name="peopleNum" />
      <InputText label="Taste" name="taste" rows={1} />
      <DynamicInput
        label="Tags"
        name="tags"
        placeholder="Add a new Tag"
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
        name="mainIngredient"
        required={true}
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
        required={true}
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
        name="measure"
        required={true}
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
                <UploadImage required={false} name="picture" others={others} />
              );
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
