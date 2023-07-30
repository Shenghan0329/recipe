// import { DataStore } from "@aws-amplify/datastore";
// import { User, Recipes, Method, Measure, Ingredient } from "../models";
// import recipes from "../data/food_meau.json";
const recipes = require("../data/food_meau.json").RECORDS;
const Scraper = require("images-scraper");
const fs = require("fs");
// const { Recipes } = require("../models");

const item = {
  meauID: 2,
  name: "鱼香虾仁",
  tags: "抵抗力,减肥,骨质疏松,美容养颜,防癌、抗癌,开胃消食",
  method: "炒",
  img: "http://s1.st.meishij.net/r/141/154/4351141/a4351141_151783971393229.jpg",
  url: "http://www.meishij.net/zuofa/ningmengqifengdangao_2.html",
  level: "新手尝试",
  peopleNum: "1人份",
  taste: "酸甜味",
  prepareTime: "5分钟",
  cookTime: "<5分钟",
  mainIngredient:
    '{"mainIngredientList": [{"weight": "0.75k\\u514b", "name": "\\u867e\\u4ec1", "imgUrl": "http://images.meishij.net/p/20110915/ab18145a0d11ace74cdf43257837de2a_60x60.jpg"}, {"weight": "6\\u7c92", "name": "\\u5927\\u849c", "imgUrl": "http://images.meishij.net/p/20120221/73fb34f7b214dae7e9b7fa90f6bbec67_60x60.jpg"}, {"weight": "6\\u4e2a", "name": "\\u5e72\\u8fa3\\u6912", "imgUrl": "http://site.meishij.net/shicaiimg/170/shicai24920_60x60.jpg"}]}',
  accessories:
    '{"accessoriesList": [{"name": "\\u6599\\u9152", "weight": ""}, {"name": "\\u6d77\\u9c9c\\u9171\\u6cb9", "weight": ""}, {"name": "\\u7cd6", "weight": ""}, {"name": "\\u9999\\u918b", "weight": ""}, {"name": "\\u76d0", "weight": ""}, {"name": "\\u9e21\\u7cbe", "weight": ""}]}',
  measure:
    '{"measureList": [{"picture": ["http://s1.st.meishij.net/rs/42/74/10518542/n10518542_151789840305123.jpg"], "step": "1.", "des": "\\u5907\\u597d\\u98df\\u6750\\uff0c\\u8c03\\u597d\\u7cd6\\u918b\\u6c41\\uff1a1\\u52fa\\u6599\\u9152\\u30012\\u52fa\\u6d77\\u9c9c\\u9171\\u6cb9\\u30013\\u52fa\\u7cd6\\u30014\\u52fa\\u9999\\u918b\\u30015\\u52fa\\u6e05\\u6c34\\u30011\\u5c0f\\u52fa\\u76d0\\u3001\\u4e00\\u5c0f\\u52fa\\u9e21\\u7cbe"}, {"picture": ["http://s1.st.meishij.net/rs/42/74/10518542/n10518542_151789840601841.jpg"], "step": "2.", "des": "\\u70ed\\u6cb9\\u52a0\\u5165\\u849c\\u672b\\u7092\\u81f3\\u91d1\\u9ec4"}, {"picture": ["http://s1.st.meishij.net/rs/42/74/10518542/n10518542_151789840701513.jpg"], "step": "3.", "des": "\\u4e0b\\u5165\\u867e\\u4ec1\\u7ffb\\u7092\\u5747\\u5300"}, {"picture": ["http://s1.st.meishij.net/rs/42/74/10518542/n10518542_151789840905500.jpg"], "step": "4.", "des": "\\u7b49\\u867e\\u4ec1\\u8868\\u9762\\u521a\\u521a\\u53d8\\u7ea2\\u8272\\u7684\\u65f6\\u5019\\u52a0\\u5165\\u5e72\\u8fa3\\u6912"}, {"picture": ["http://s1.st.meishij.net/rs/42/74/10518542/n10518542_151789841039738.jpg"], "step": "5.", "des": "\\u7ffb\\u7092\\u5236\\u867e\\u4ec1\\u53d8\\u8272"}, {"picture": ["http://s1.st.meishij.net/rs/42/74/10518542/n10518542_151789841286041.jpg"], "step": "6.", "des": "\\u52a0\\u5165\\u7cd6\\u918b\\u6c41\\uff0c\\u5927\\u706b\\u6536\\u6c41~\\u51fa\\u9505\\u5f00\\u5403\\u5427~"}]}',
  techniques:
    "万能的糖醋汁！！！快拿小笔记记好啦：1勺料酒、2勺酱油（用海鲜酱油更加鲜香哦）、3勺糖、4勺醋、5勺清水",
  scrapyTime: "2018-02-26 11:20:49",
};
// const data = await DataStore.query(Recipes);
// console.log(data);

async function updateImages(items) {
  let indexes = items?.map((ele) => ele.meauID);
  let names = items?.map((ele) => ele.name);
  let images = await getImages(names);
  console.log("Result: " + images);
  for (let i = 0; i < items.length; i++) {
    // converting the JSON object to a string
    const data = JSON.stringify({ meauID: indexes[i], img: images[i] }) + ",\n";

    // writing the JSON string content to a file
    fs.appendFile("images.json", data, (error) => {
      // throwing the error
      // in case of a writing problem
      if (error) {
        // logging the error
        console.error(error);

        throw error;
      }

      console.log("data.json written correctly");
    });
    // const updatedPost = await DataStore.save(
    //   Post.copyOf(item, updated => {
    //     updated.img = image
    //   })
    // );
  }
}

const getImages = async (names) => {
  const google = new Scraper({
    puppeteer: {
      headless: true,
    },
  });
  let n = names.map(
    (ele) => ele.replace(/[!@#$%^&*()\?]/g, "") + " meishichina"
  );
  console.log(n);
  const results = await google.scrape(n, 1);
  const images = results.map((ele) => ele?.images[0]?.url);
  console.log(images);
  return images;
};

// const updateAll = async (n) => {
//   let finish = n + 10;

//   if (n >= recipes.length) {
//     return;
//   }

//   const myPromise = new Promise((resolve, reject) => {
//     (async function () {
//       for (let i = n; i < finish; i++) {
//         if (i >= recipes.length) {
//           return;
//         } else {
//           await updateImage(recipes[i]);
//         }
//       }
//       setTimeOut(resolve("foo"), 10000);
//     })();
//   });
//   myPromise.then(updateAll(finish));
// };

const updateAll = async (n) => {
  if (n >= recipes.length) return;
  console.log("===========");
  for (let i = n; i < recipes.length; i += 20) {
    if (n >= recipes.length) return;
    try {
      if (i + 20 <= recipes.length) {
        await updateImages(recipes.slice(i, i + 20));
      } else {
        await updateImages(recipes.slice(i, recipes.length));
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log("===========");
};

updateAll(0);
// export default updateAll;
