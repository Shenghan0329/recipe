import { DataStore } from "@aws-amplify/datastore";
import { User, Recipes, Method, Measure, Ingredient } from "../models";
import recipes from "./food_meau.json";
import { GoogleTranslator } from "@translate-tools/core/translators/GoogleTranslator";

const recipeList = recipes.RECORDS;
const recipe = recipeList[3445];
const cToE = async function (obj) {
  let res;
  if (typeof obj === "number") {
    res = obj;
    return res;
  }
  if (!obj) {
    return null;
  }
  if (typeof obj === "string") {
    if (obj.startsWith("http") || obj.trim() === "") {
      res = obj;
      return res;
    }
    const translator = new GoogleTranslator();
    res = await translator.translate(obj, "zh-CN", "en");
    return res;
  } else if (Array.isArray(obj)) {
    res = [];
    for (let i = 0; i < obj.length; i++) {
      let str = await cToE(obj[i]);
      res.push(str);
    }
    return res;
  } else {
    res = {};
    for (const key in obj) {
      if (key === "step") {
        res[key] = obj[key];
      } else {
        res[key] = await cToE(obj[key]);
      }
    }
    return res;
  }
};

const matchEnums = function (str) {
  switch (str) {
    case "烘焙":
      return Method.BAKE;
    case "烤":
      return Method.BAKE;
    case "炒":
      return Method.SAUTE;
    case "煮":
      return Method.BOIL;
    case "炖":
      return Method.BOIL;
    case "焖":
      return Method.BOIL;
    case "拌":
      return Method.STIR;
    case "蒸":
      return Method.STEAM;
    case "煎":
      return Method.FRY;
    case "炸":
      return Method.FRY;
    case "榨汁":
      return Method.SQUEEZE;
    default:
      return Method.OTHERS;
  }
};
const convertOne = async function () {
  let result = { ...recipe };
  const changeList = ["mainIngredient", "accessories", "measure"];
  const changeValueList = [
    "mainIngredientList",
    "accessoriesList",
    "measureList",
  ];
  for (let i = 0; i < changeList.length; i++) {
    result[changeList[i]] = JSON.parse(recipe[changeList[i]])[
      changeValueList[i]
    ];
  }
  result["peopleNum"] = parseInt(recipe.peopleNum);
  result["tags"] = result["tags"] ? result["tags"].split(",") : [];
  result = await cToE(result);
  result["mainIngredient"] = result.mainIngredient.map(
    (item) => new Ingredient(item)
  );
  result["accessories"] = result.accessories.map(
    (item) => new Ingredient(item)
  );
  result["measure"] = result.measure.map((item) => new Measure(item));
  result["method"] = matchEnums(recipe.method);
  result.scrapyTime = new Date().toISOString();
  const user = await DataStore.query(User);
  result.userID = user[0].id;
  //   await DataStore.query(Recipes).then((results) => console.log(results));
  await DataStore.save(new Recipes(result));
};

const convertDB = async function () {
  for (let i = 3326; i < recipeList.length; i++) {
    if (i % 200) {
      console.log(
        "Progress status: " + i + " recipes stored out of " + recipeList.length
      );
    }
    try {
      await convertOne(recipeList[i]);
    } catch (e) {
      console.log(e);
    }
  }
};
// console.log(convertOne(recipe));

export default async function setDefaultUser() {
  DataStore.query(User).then(async (results) => {
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

export { convertOne, cToE, convertDB };
