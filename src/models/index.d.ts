import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum Method {
  FRY = "FRY",
  BOIL = "BOIL",
  STEAM = "STEAM",
  BAKE = "BAKE",
  SQUEEZE = "SQUEEZE",
  SAUTE = "SAUTE",
  OTHERS = "OTHERS",
  STIR = "STIR"
}

type EagerMeasure = {
  readonly picture?: (string | null)[] | null;
  readonly step: string;
  readonly des?: string | null;
}

type LazyMeasure = {
  readonly picture?: (string | null)[] | null;
  readonly step: string;
  readonly des?: string | null;
}

export declare type Measure = LazyLoading extends LazyLoadingDisabled ? EagerMeasure : LazyMeasure

export declare const Measure: (new (init: ModelInit<Measure>) => Measure)

type EagerIngredient = {
  readonly weight?: string | null;
  readonly name: string;
  readonly imgUrl?: string | null;
}

type LazyIngredient = {
  readonly weight?: string | null;
  readonly name: string;
  readonly imgUrl?: string | null;
}

export declare type Ingredient = LazyLoading extends LazyLoadingDisabled ? EagerIngredient : LazyIngredient

export declare const Ingredient: (new (init: ModelInit<Ingredient>) => Ingredient)

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly introduce?: string | null;
  readonly Recipes?: (Recipes | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly introduce?: string | null;
  readonly Recipes: AsyncCollection<Recipes>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerRecipes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recipes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly meauID: number;
  readonly name: string;
  readonly tags?: (string | null)[] | null;
  readonly img: string;
  readonly url: string;
  readonly level?: string | null;
  readonly peopleNum?: number | null;
  readonly taste?: string | null;
  readonly cookTime?: string | null;
  readonly mainIngredient?: Ingredient[] | null;
  readonly accessories?: (Ingredient | null)[] | null;
  readonly measure?: Measure[] | null;
  readonly techniques?: string | null;
  readonly scrapyTime?: string | null;
  readonly method?: Method | keyof typeof Method | null;
  readonly userID: string;
  readonly prepareTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecipes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recipes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly meauID: number;
  readonly name: string;
  readonly tags?: (string | null)[] | null;
  readonly img: string;
  readonly url: string;
  readonly level?: string | null;
  readonly peopleNum?: number | null;
  readonly taste?: string | null;
  readonly cookTime?: string | null;
  readonly mainIngredient?: Ingredient[] | null;
  readonly accessories?: (Ingredient | null)[] | null;
  readonly measure?: Measure[] | null;
  readonly techniques?: string | null;
  readonly scrapyTime?: string | null;
  readonly method?: Method | keyof typeof Method | null;
  readonly userID: string;
  readonly prepareTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Recipes = LazyLoading extends LazyLoadingDisabled ? EagerRecipes : LazyRecipes

export declare const Recipes: (new (init: ModelInit<Recipes>) => Recipes) & {
  copyOf(source: Recipes, mutator: (draft: MutableModel<Recipes>) => MutableModel<Recipes> | void): Recipes;
}