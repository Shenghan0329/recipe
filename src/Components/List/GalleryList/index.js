import recipes from "../../../data/recipes.json";
import FlatList from "../FlatList";
import GalleryCard from "../../Card/GalleryCard";

const GalleryList = ({ pageSize, filters }) => {
  return (
    <FlatList
      data={recipes}
      listItem={GalleryCard}
      pageSize={pageSize}
      filters={filters}
    />
  );
};

export default GalleryList;
