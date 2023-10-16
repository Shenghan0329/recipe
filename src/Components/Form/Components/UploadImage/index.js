import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { message, Upload, Form } from "antd";

const UploadImage = ({
  fileList,
  setFileList,
  multi = false,
  required = true,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const beforeUpload = (file) =>
    new Promise((resolve, reject) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        reject(file);
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        reject(file);
        return;
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
    } else {
      setImageUrl("");
    }
  };
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={!multi ? false : true}
      fileList={fileList}
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
  );
};

export default UploadImage;
