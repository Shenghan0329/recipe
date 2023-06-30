import { DataStore } from "@aws-amplify/datastore";
import { User, Recipes, Method } from "../models";
import { Buffer } from "buffer";
var iconv = require("iconv-lite");

const recipe = {
  meauID: 1,
  name: "柠檬戚风蛋糕",
  tags: "健脑益智,保肝,动脉硬化,防癌,延年益寿,美容护肤,镇静助眠,美容养颜,益智,润肺生津,润肺止咳,降血压,抗衰老",
  method: "烘焙",
  img: "http://s1.st.meishij.net/r/141/154/4351141/a4351141_151783971393229.jpg",
  url: "m",
  level: "初级入门",
  peopleNum: "3人份",
  taste: "甜味",
  prepareTime: "5分钟",
  cookTime: "<60分钟",
  mainIngredient:
    '{"mainIngredientList": [{"weight": "3\\u4e2a", "name": "\\u9e21\\u86cb", "imgUrl": "http://images.meishij.net/p/20110718/769130e8c9a062a32ed14383c083561f_60x60.jpg"}, {"weight": "50\\u514b", "name": "\\u4f4e\\u7b4b\\u9762\\u7c89", "imgUrl": "http://site.meishij.net/shicaiimg/243/shicai25243_60x60.jpg"}, {"weight": "30\\u514b", "name": "\\u725b\\u5976", "imgUrl": "http://images.meishij.net/p/20110719/6f1b7f40cb46e52033747505bef1a2e1_60x60.jpg"}, {"weight": "40\\u514b", "name": "\\u7ec6\\u7802\\u7cd6", "imgUrl": "http://images.meishij.net/p/20130312/f5b5fca4dc738167b871559a100a8a11_60x60.jpg"}, {"weight": "20\\u514b", "name": "\\u7389\\u7c73\\u6cb9", "imgUrl": "http://site.meishij.net/shicaiimg/112/shicai1362_60x60.jpg"}, {"weight": "2\\u514b", "name": "\\u67e0\\u6aac\\u76ae\\u788e", "imgUrl": "http://images.meishij.net/p/20130918/c06c2fa329d52abb6e5cad538d6ad30c_60x60.jpg"}]}',
  accessories:
    '{"accessoriesList": [{"name": "\\u7535\\u52a8\\u6253\\u86cb\\u5668", "weight": ""}, {"name": "\\u624b\\u52a8\\u6253\\u86cb\\u5668", "weight": ""}, {"name": "\\u70e4\\u7bb1", "weight": ""}]}',
  measure:
    '{"measureList": [{"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783743456530.jpg"], "step": "1.", "des": "\\u5148\\u5c06\\u9e21\\u86cb\\u7684\\u86cb\\u767d\\u4e0e\\u86cb\\u9ec4\\u5206\\u5f00\\u653e\\u5728\\u4e24\\u4e2a\\u65e0\\u6c34\\u65e0\\u6cb9\\u76c6\\u5185\\uff1b\\uff08\\u9e21\\u86cb\\u662f\\u5e26\\u58f350\\u514b\\u4ee5\\u4e0a\\u76843\\u4e2a\\uff0c\\u51b7\\u85cf\\u4fdd\\u5b58\\u7684\\uff0c\\u4e0d\\u8981\\u7528\\u5ba4\\u6e29\\u7684\\uff0c\\u7279\\u522b\\u590f\\u5929\\u65f6\\uff09"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783752597589.jpg"], "step": "2.", "des": "\\u5148\\u628a\\u7389\\u7c73\\u6cb9\\u4e0e\\u86cb\\u9ec4\\u6df7\\u5408\\u6405\\u6253\\u5747\\u5300\\uff1b\\uff08\\u6df7\\u5408\\u5b8c\\u6210\\u540e\\uff0c\\u86cb\\u9ec4\\u6db2\\u5fae\\u5fae\\u53d1\\u767d\\uff0c\\u65e0\\u6cb9\\u82b1\\uff0c\\u505a\\u597d\\u8fd9\\u4e00\\u6b65\\u621a\\u98ce\\u4e0d\\u5bb9\\u6613\\u51fa\\u73b0\\u5e03\\u4e01\\u5c42\\uff09"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783761887394.jpg"], "step": "3.", "des": "\\u518d\\u628a\\u725b\\u5976\\uff08\\u6e05\\u6c34\\uff09\\u5206\\u6b21\\u52a0\\u5165\\u5230\\u86cb\\u9ec4\\u6db2\\u4e2d\\u6405\\u6253\\u5747\\u5300\\uff0c\\u6df7\\u5408\\u5b8c\\u6210\\u540e\\u86cb\\u9ec4\\u6db2\\u660e\\u663e\\u53d1\\u767d\\uff0c\\u6ca1\\u6709\\u6cb9\\u82b1\\u6d6e\\u5728\\u4e0a\\u9762\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783766184104.jpg"], "step": "4.", "des": "\\u52a0\\u51652\\u514b\\u7684\\u67e0\\u6aac\\u76ae\\u788e\\u4e0e\\u86cb\\u9ec4\\u6db2\\u4f53\\u6df7\\u5408\\u6405\\u62cc\\u5747\\u5300\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783794732828.jpg"], "step": "5.", "des": "\\u52a0\\u5165\\u8fc7\\u7b5b\\u7684\\u4f4e\\u7b4b\\u9762\\u7c89\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783802700601.jpg"], "step": "6.", "des": "\\u8f7b\\u8f7b\\u6405\\u62cc\\u81f3\\u5747\\u5300\\u65e0\\u9897\\u7c92\\u72b6\\u5373\\u53ef\\uff1b\\uff08\\u6ce8\\u610f\\u4e0d\\u8981\\u8fc7\\u5ea6\\u6405\\u62cc\\uff0c\\u4e0d\\u8981\\u6709\\u9897\\u7c92\\uff0c\\u4e0d\\u7136\\u6210\\u54c1\\u4f1a\\u975e\\u5e38\\u7c97\\u7cd9\\uff09"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783810381690.jpg"], "step": "7.", "des": "\\u63a5\\u7740\\u6211\\u4eec\\u6765\\u6253\\u53d1\\u86cb\\u767d\\uff0c\\u4e00\\u4e2a\\u6253\\u53d1\\u6210\\u529f\\u7684\\u86cb\\u767d\\u662f\\u505a\\u51fa\\u597d\\u621a\\u98ce\\u7684\\u57fa\\u7840\\uff1a"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783818483616.jpg"], "step": "8.", "des": "\\u7528\\u86cb\\u52a8\\u6253\\u86cb\\u5668\\u5c06\\u86cb\\u767d\\u6253\\u81f3\\u7c97\\u6ce1\\uff08\\u6ce8\\u610f\\u6253\\u81f3\\u6ca1\\u6709\\u6db2\\u4f53\\u86cb\\u767d\\u65f6\\u5c31\\u53ef\\u4ee5\\uff09\\uff0c\\u8fd9\\u662f\\u52a0\\u5165\\u4e00\\u534a\\u768420\\u514b\\u7ec6\\u7802\\u7cd6\\uff0c\\uff08\\u6ce8\\u610f\\u662f\\u4e00\\u534a\\uff0c\\u4e0d\\u662f\\u5e73\\u5e38\\u505a\\u621a\\u98ce\\u65f6\\u7684\\u4e09\\u5206\\u4e4b\\u4e00\\uff09\\u7ee7\\u7eed\\u6253\\u53d1\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783826312141.jpg"], "step": "9.", "des": "\\u7ee7\\u7eed\\u6253\\u53d1\\u81f3\\u6709\\u6bd4\\u8f83\\u7ec6\\u817b\\u7684\\u6ce1\\u6cab\\uff0c\\u4f53\\u79ef\\u4e5f\\u660e\\u663e\\u589e\\u5927\\u65f6\\uff0c\\u52a0\\u5165\\u5269\\u4e0b\\u4e00\\u534a\\u768420\\u514b\\u7ec6\\u7802\\u7cd6\\uff0c\\u7ee7\\u7eed\\u6253\\u53d1\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783835360598.jpg"], "step": "10.", "des": "\\u7ee7\\u7eed\\u6253\\u53d1\\u81f3\\u86cb\\u767d\\u975e\\u5e38\\u7ec6\\u817b\\uff0c\\u63d0\\u8d77\\u6253\\u86cb\\u5668\\u4f1a\\u5448\\u4e00\\u4e2a\\u5c16\\u5c16\\u7684\\u5c0f\\u89d2\\uff08\\u70e4\\u7bb1\\u4e0a\\u4e0b\\u706b130\\u5ea6\\u9884\\u70ed10\\u5206\\u949f\\uff09\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783842752502.jpg"], "step": "11.", "des": "\\u5148\\u53d6\\u4e09\\u5206\\u4e4b\\u4e00\\u7684\\u86cb\\u767d\\u5230\\u5230\\u86cb\\u9ec4\\u7cca\\u4e2d\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783850784568.jpg"], "step": "12.", "des": "\\u7528\\u522e\\u5200\\u6216\\u624b\\u52a8\\u6253\\u86cb\\u5668\\u4ece\\u4e0b\\u5f80\\u4e0a\\u7ffb\\u62cc\\uff0c\\u52a8\\u4f5c\\u8f7b\\u67d4\\u5373\\u53ef\\uff0c\\u4e0d\\u7528\\u8fc7\\u4efd\\u5c0f\\u5fc3\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783858750023.jpg"], "step": "13.", "des": "\\u5c06\\u6df7\\u5408\\u597d\\u7684\\u86cb\\u9ec4\\u7cca\\uff0c\\u5012\\u5165\\u5269\\u4e0b\\u4e09\\u5206\\u4e4b\\u4e8c\\u7684\\u86cb\\u767d\\u91cc\\uff0c\\u7ee7\\u7eed\\u7528\\u7ffb\\u62cc\\u7684\\u65b9\\u5f0f\\u6df7\\u5408\\u5747\\u5300\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783866629733.jpg"], "step": "14.", "des": "\\u6df7\\u5408\\u597d\\u7684\\u86cb\\u7cd5\\u9762\\u7cca\\u7ec6\\u817b\\u6709\\u5149\\u6cfd\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783874717616.jpg"], "step": "15.", "des": "\\u5012\\u5165\\u516d\\u5bf8\\u7684\\u86cb\\u7cd5\\u6a21\\u5177\\u4e2d\\uff0c\\u8f7b\\u6454\\u4e24\\u4e0b\\u9707\\u53bb\\u5927\\u7684\\u6c14\\u6ce1\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783888748327.jpg"], "step": "16.", "des": "\\u5c06\\u86cb\\u7cd5\\u6a21\\u5177\\u8fde\\u540c\\u70e4\\u76d8\\u4e00\\u8d77\\u653e\\u5165130\\u5ea6\\u9884\\u70ed\\u597d\\u7684\\u70e4\\u7bb1\\uff0c\\u4e2d\\u4e0b\\u5c42130\\u5ea6\\u70d8\\u70e420\\u5206\\u949f\\u5de6\\u53f3\\uff0c\\u76f4\\u63a5\\u8c03\\u81f3160\\u5ea6\\uff0c\\u7ee7\\u7eed20\\u5206\\u949f\\u5de6\\u53f3\\u3002\\uff08\\u6ce8\\u610f\\u4e00\\u5b9a\\u8981\\u6309\\u81ea\\u5bb6\\u70e4\\u7bb1\\u6e29\\u5ea6\\u8c03\\u6574\\uff09"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783897867049.jpg"], "step": "17.", "des": "\\u8fd9\\u662f\\u86cb\\u7cd5\\u70d8\\u711930\\u5206\\u949f\\u5de6\\u53f3\\u65f6\\u7684\\u72b6\\u6001\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783905657607.jpg"], "step": "18.", "des": "\\u86cb\\u7cd5\\u70e4\\u597d\\u51fa\\u7089\\u540e\\u572820cm\\u9ad8\\u5904\\u81ea\\u7531\\u843d\\u4f53\\u6454\\u4e00\\u4e0b\\uff0c\\u7acb\\u523b\\u5012\\u6263\\u5728\\u53e6\\u4e00\\u4e2a\\u6a21\\u5177\\u4e0a\\u9762\\u76f4\\u81f3\\u51b7\\u5374\\uff1b"}, {"picture": ["http://s1.st.meishij.net/rs/141/154/4351141/n4351141_151783974175211.jpg"], "step": "19.", "des": "\\u5b8c\\u5168\\u51b7\\u5374\\u540e\\uff0c\\u5373\\u53ef\\u8131\\u6a21\\uff01\\u621a\\u98ce\\u86cb\\u7cd5\\u53ef\\u4ee5\\u624b\\u5de5\\u8131\\u6a21\\uff0c\\u4e5f\\u53ef\\u4ee5\\u7528\\u8131\\u6a21\\u5200\\u6765\\u8131\\u6a21\\u54e6\\uff01"}]}',
  techniques:
    "打发蛋白时要注意，打蛋器的头不要只定在一点，手拿着打蛋器匀速画圈，这样打出的蛋白才会均匀。",
  scrapyTime: "2018-02-26 11:20:49",
};

const convert = function (recipeList) {};

const textToBinary = (str = "") => {
  let res = "";
  res = str
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(2);
    })
    .join("");
  return res;
};
const convertOne = function () {
  const result = { ...recipe };
  const changeList = ["mainIngredient", "accessories", "measure"];
  for (let i = 0; i < changeList.length; i++) {
    result[changeList[i]] = JSON.parse(recipe[changeList[i]]);
  }
  console.log(result);
  var fileBuffer = new Buffer("烘焙", "binary");
  var file = fileBuffer.toString("gbk");
  console.log(file, fileBuffer);
  console.log(recipe.method === "烘焙");
  return result;
};

// console.log(convertOne(recipe));

export default async function setDefaultUser() {
  DataStore.query(User).then(async (results) => {
    console.log(results);
    if (results.length === 0) {
      //   const defaultUser = await DataStore.save(
      //     new User({
      //       name: "Default Recipes",
      //       image: "default image",
      //       introduce: "He is a guy who worships privacy",
      //       Recipes: [],
      //     })
      //   );
    }
  });
}

await DataStore.save(
  new Recipes({
    meauID: 1020,
    name: "Lorem ipsum dolor sit amet",
    tags: [],
    img: "Lorem ipsum dolor sit amet",
    url: "Lorem ipsum dolor sit amet",
    level: "Lorem ipsum dolor sit amet",
    peopleNum: 1020,
    taste: "Lorem ipsum dolor sit amet",
    cookTime: 1020,
    mainIngredient: [],
    accessories: [],
    measure: [],
    techniques: "Lorem ipsum dolor sit amet",
    scrapyTime: "1970-01-01T12:30:23.999Z",
    method: Method.FRY,
    userID: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
    prepareTime: "Lorem ipsum dolor sit amet",
  })
);

export { convertOne };
