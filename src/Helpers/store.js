import { Storage } from "@aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";
import { DataStore } from "@aws-amplify/datastore";
import { Recipes } from "../models";
import images from "../data/images.json";

// aba7ef4a-2ae2-4443-b7ec-3deb033b3181
// https://quotes.toscrape.com/
// 8bde6c99-ec8b-4802-a496-bca0586d931f
// b0efff65-c3a2-4cc2-8764-3b32f9d476cb
// 411afbbd-90d6-4f2c-9806-a705aa146cd2

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

const getFileFromUrl = async function(url){
  // let file = await fetch(url)

  const proxyParams = {
    // api_key: 'aba7ef4a-2ae2-4443-b7ec-3deb033b3181',
    api_key: '411afbbd-90d6-4f2c-9806-a705aa146cd2',
    url: url
  };

  const proxyUrl = 'https://proxy.scrapeops.io/v1/?' + 'api_key=' +proxyParams.api_key + '&' + "url=" + proxyParams.url;

  let res = await fetch(proxyUrl)
  if(res.status>400) {
    console.log("Bad Response");
    return -1;
  }

  let blob = await res.blob()
   // Gets the response and returns it as a blob
  let name = uuidv4();
  let file = new File([blob],name);

    // // Download to Test
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.style.display = 'none';
    // a.href = url;
    // // the filename you want
    // a.download = 'todo-1';
    // document.body.appendChild(a);
    // a.click();
    // window.URL.revokeObjectURL(url);

  console.log(file);
  return file;
}
const storeImg = async function(recipe){
  // let img = recipe.img;
  let r = images.filter(ele=>ele.meauID==recipe.meauID)[0];
  if(r==null) return;
  let img = r.img;
  if(!img.includes("http")) return;
  let file = await getFileFromUrl(img);
  let f;
  if(file==-1){
    console.log("Fetch failed");
    f = images.filter(ele=>ele.meauID==recipe.meauID)[0].img;
  }else{
    f = await storeFile(file);
  }
  if(f==-1){
    console.log("Store failed");
    return;
  }else{
    let res = Recipes.copyOf(recipe,updated=>{
      updated.img = f;
    })
    console.log(recipe);
    console.log(res);
    DataStore.save(res);
  }
}


export default storeFile;
export {getFileFromUrl,storeImg};
