import { Card } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const RecipeCard = (item) => {
  //     const navigate = useNavigate();
  //   const onClick = (e) => {
  //     const link = item?.id ? "/recipes/" + item?.id : "/recipes";
  //     navigate(link, { state: {} });
  //   };
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        aspectRatio: 2 / 2,
      }}
      cover={<img alt="delicious food" src={item.img} />}
      //   onClick={onClick}
    >
      <Meta title={item.meauID + item.name} taste={item.taste} />
    </Card>
  );
};
export default RecipeCard;
