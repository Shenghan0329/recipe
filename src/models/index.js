// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Method = {
  "FRY": "FRY",
  "BOIL": "BOIL",
  "STEAM": "STEAM",
  "BAKE": "BAKE",
  "SQUEEZE": "SQUEEZE",
  "SAUTE": "SAUTE",
  "OTHERS": "OTHERS",
  "STIR": "STIR"
};

const { User, Recipes, Measure, Ingredient } = initSchema(schema);

export {
  User,
  Recipes,
  Method,
  Measure,
  Ingredient
};