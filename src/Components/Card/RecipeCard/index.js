import { Card } from "antd";
import Image from "../../Image";
import "./style.css";
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
        aspectRatio: 1 / 1,
      }}
      cover={<Image width="100%" aspectRatio="4/3" src={item?.img} />}
      //   onClick={onClick}
    >
      <Meta title={item.meauID + " " + item.name} taste={item.taste} />
    </Card>
  );
};
export default RecipeCard;
