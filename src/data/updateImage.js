import { DataStore } from "@aws-amplify/datastore";
import { User, Recipes, Method, Measure, Ingredient } from "../models";
import images from "./images.json";

const updateOne = async (image) => {
  const meauID = image.meauID;
  const newImage = image.img;
  const original = await DataStore.query(Recipes, (r) => r.meauID.eq(meauID));
  console.log(original[0]);
  const updated = await DataStore.save(
    Recipes.copyOf(original[0], (updated) => {
      updated.img = newImage;
    })
  );
};

const updateAll = async () => {
  for (let i = 999; i < images.length; i++) {
    if (!images[i].img) continue;
    await updateOne(images[i]);
    console.log(i + " updated");
  }
};

export default updateAll;
