import { Carousel } from "antd";
import { useEffect } from "react";
import GalleryCard from "../Card/GalleryCard";

const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#364d79",
};
const Gallery = ({ data, galleryItem = GalleryCard }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Carousel autoplay>
      {data?.length > 8
        ? data?.slice(0, 8).map((item, index) => {
            return <div style={contentStyle}>{galleryItem(item)};</div>;
          })
        : data?.map((item, index) => {
            return <div style={contentStyle}>{galleryItem(item)};</div>;
          })}
    </Carousel>
  );
};
export default Gallery;
