import { Carousel } from "antd";
import GalleryCard from "../Card/GalleryCard";
import recipes from "../../data/recipes.json";

const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#364d79",
};
const Gallery = ({ data = recipes, galleryItem = GalleryCard }) => (
  <Carousel autoplay>
    {data.map((item, index) => {
      return <div style={contentStyle}>{galleryItem(item)};</div>;
    })}
  </Carousel>
);
export default Gallery;
