import FlatList from "../FlatList";
import RecipeCard from "../../Card/RecipeCard";
import "./style.css";

const RecipeList = ({ data, pageSize }) => {
  return <FlatList data={data} listItem={RecipeCard} pageSize={pageSize} />;
};

export default RecipeList;
