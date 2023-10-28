import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

const getFile = async function (fileName) {
  try {
    const url = await Storage.get(fileName, { validateObjectExistence: true });
    // console.log(url);
    return url;
  } catch (error) {
    return -1;
  }
};

export const getUrl = async function (url) {
  if (typeof url !== "string") {
    return "";
  }
  if (url.includes("http")) {
    return url;
  } else {
    return getFile(url);
  }
};

const storeFile = async function (file) {
  let name = uuidv4();
  try {
    await Storage.put(name, file);
    return name;
  } catch (e) {
    console.log("Error: ", e);
    return -1;
  }
};

export default storeFile;
