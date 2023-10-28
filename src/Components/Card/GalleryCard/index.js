import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import Image from "../../Image";

const GalleryCard = (item) => {
  // const navigate = useNavigate();
  // const onClick = (e) => {
  //   const link = item?.id ? "/recipes/" + item?.id : "/recipes";
  //   navigate(link, { state: {} });
  // };
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        height: "300px",
      }}
      cover={<Image width="100%" height="300px" src={item?.img} />}
      // onClick={onClick}
    ></Card>
  );
};

export default GalleryCard;
