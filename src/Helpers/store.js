import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

const getFile = async function (fileName) {
  try {
    const url = await Storage.get(fileName, { validateObjectExistence: true });
    console.log(url);
    return url;
  } catch (error) {
    return -1;
  }
};

const storeFile = async function (file) {
  let name = uuidv4();
  try {
    await Storage.put(name, file);
    return getFile(name);
  } catch (e) {
    console.log("Error: ", e);
    return -1;
  }
};

export default storeFile;
