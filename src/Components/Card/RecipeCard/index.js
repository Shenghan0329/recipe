import { Card } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const RecipeCard = (item) => {
  const navigate = useNavigate();
  const defaultLink = "/";
  const onClick = (e) => {
    const link = item?.id ? "/recipes/" + item?.id : "/recipes";
    navigate(link, { state: {} });
  };
  return (
    <>
      <Card
        hoverable
        style={{
          aspectRatio: 2 / 2,
        }}
        cover={<img alt="delicious food" src={item.image} />}
        onClick={onClick}
      >
        <Meta
          title={item.name}
          description={item.description.slice(0, 100) + "..."}
        />
      </Card>
    </>
  );
};
export default RecipeCard;
