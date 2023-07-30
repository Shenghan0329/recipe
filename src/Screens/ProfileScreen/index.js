import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../models";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { sub, setDbUser, dbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "");
  const [introduce, setIntroduce] = useState(dbUser?.introduce || "");
  const [image, setImage] = useState(dbUser?.introduce || "");
  const navigation = useNavigate();

  const createUser = async () => {
    try {
      console.log(sub);
      const user = await DataStore.save(
        new User({
          name,
          introduce,
          image,
          sub,
        })
      );
      console.log(user);
      setDbUser(user);
    } catch (e) {
      console.log("Errors", e.message);
    }
  };
  const updateUser = async () => {
    await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.name = name;
        updated.introduce = introduce;
        updated.image = image;
      })
    );
    navigation.goBack();
  };
  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
  };
  const signOut = () => {
    Auth.signOut();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
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
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
        style={{ paddingTop: 50 }}
      >
        <Input
          placeholder={name}
          onChange={(evt) => {
            console.log(evt);
            setName(evt.target.value);
          }}
        />
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
        <Input
          placeholder={introduce}
          onChange={(evt) => {
            console.log(evt);
            setIntroduce(evt.target.value);
          }}
        />
      </Form.Item>

      <Form.Item label="image" name="image">
        <Input
          placeholder={image}
          onChange={(evt) => {
            console.log(evt);
            setImage(evt.target.value);
          }}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" onClick={onSave}>
          Save
        </Button>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      ></Form.Item>
    </Form>
  );
};

export default Profile;
