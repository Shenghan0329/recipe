import { Card } from "antd";

const GalleryCard = (item) => {
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        height: "300px",
      }}
      cover={<img alt="delicious food" src={item.image} />}
    ></Card>
  );
};

export default GalleryCard;
