import { Carousel } from "antd";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import Image from "../Image";
import GalleryCard from "../Card/GalleryCard";

const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#364d79",
};
const Gallery = ({ data, galleryItem = GalleryCard }) => {
  return (
    <Loading width="100%" height="300px" data={data}>
      <Carousel autoplay>
        {data?.map((item, index) => {
          return (
            <div key={item.id + index} style={contentStyle}>
              {galleryItem(item)}
            </div>
          );
        })}
      </Carousel>
    </Loading>
  );
};
export default Gallery;
