import { Carousel } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import GalleryCard from "../Card/GalleryCard";

const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#364d79",
};
const Gallery = ({ data, galleryItem = GalleryCard }) => {
  const navigate = useNavigate();
  return (
    <Loading width="100%" height="300px" data={data}>
      <Carousel autoplay>
        {data?.length > 8
          ? data?.slice(0, 8).map((item, index) => {
              return (
                <div
                  key={item.id + index}
                  style={contentStyle}
                  onClick={() => {
                    navigate("/recipes/" + item.id);
                  }}
                >
                  {galleryItem(item)}
                </div>
              );
            })
          : data?.map((item, index) => {
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
