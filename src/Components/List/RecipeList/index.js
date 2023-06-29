import recipes from "../../../data/recipes.json";
import FlatList from "../FlatList";
import RecipeCard from "../../Card/RecipeCard";

console.log(recipes);

const RecipeList = ({ pageSize, filters }) => {
  return (
    <FlatList
      data={recipes}
      listItem={RecipeCard}
      pageSize={pageSize}
      filters={filters}
    />
  );
};

export default RecipeList;
