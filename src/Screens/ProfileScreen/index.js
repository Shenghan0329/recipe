import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../models";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadImage from "../../Components/Form/Components/UploadImage";
import storeFile from "../../Helpers/store";

const Profile = ({ afterSubmit = () => {} }) => {
  const { sub, setDbUser, dbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "Please enter your name");
  const [introduce, setIntroduce] = useState(
    dbUser?.introduce || "Please introduce yourself"
  );
  const navigation = useNavigate();
  const formRef = React.useRef(null);

  const createUser = async (values) => {
    let user = { ...values };
    let image = await storeFile(values["image"][0]);
    if (image === -1) return -1;
    user["image"] = image;
    user["sub"] = sub;
    try {
      console.log(sub);
      const u = await DataStore.save(new User(user));
      console.log(u);
      setDbUser(u);
    } catch (e) {
      console.log("Errors", e.message);
      return -1;
    }
    return 0;
  };
  const updateUser = async (values) => {
    let image = await storeFile(values["image"][0]);
    if (image === -1) return -1;
    try {
      await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.name = values.name;
          updated.introduce = values.introduce;
          updated.image = image;
        })
      );
    } catch (e) {
      console.log("Errors", e.message);
      return -1;
    }
    return 0;
  };
  const onSave = async (values) => {
    let res;
    if (dbUser) {
      res = await updateUser(values);
    } else {
      res = await createUser(values);
    }
    console.log(res == 0 ? "Save success" : "Save failed");
  };
  const signOut = () => {
    Auth.signOut();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    onSave(values);
    afterSubmit();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      ref={formRef}
      initialValues={{
        name: dbUser?.name ? name : "",
        introduce: dbUser?.introduce ? introduce : "",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
        style={{ paddingTop: 50 }}
      >
        <Input placeholder={name} />
      </Form.Item>

      <Form.Item
        label="introduce"
        name="introduce"
        rules={[
          {
            required: true,
            message: "Please Introduce Yourself",
          },
        ]}
      >
        <Input placeholder={introduce} />
      </Form.Item>

      <UploadImage label="Profile Image" name="image" required={false} />

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;
