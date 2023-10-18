import React, { useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { message, Upload, Form, Button } from "antd";

const UploadImage = ({
  label = "",
  name = label,
  fileList = [],
  setFileList,
  multi = false,
  required = false,
  others = {},
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const handleOnChange = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList?.map((f) => f.originFileObj);
  };
  const beforeUpload = (file) =>
    new Promise((resolve, reject) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        reject(file);
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        reject(file);
      }
      !multi ? setFileList([file]) : setFileList((files) => [...files, file]);
      resolve(file);
    });
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleChange = (info) => {
    if (info.file.status == "uploading") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
      info.file.status = "done";
    } else {
      setImageUrl("");
    }
    console.log(info.fileList);
  };
  return (
    <Form.Item
      label={label}
      name={name}
      valuePropName="fileList"
      getValueFromEvent={handleOnChange}
      rules={[
        {
          required: { required },
        },
      ]}
      {...others}
    >
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={!multi ? false : true}
        fileList={fileList}
        maxCount={!multi ? 1 : 10}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={() => {}}
      >
        {imageUrl && !multi ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          <PlusOutlined />
        )}
      </Upload>
    </Form.Item>
  );
};

export default UploadImage;
