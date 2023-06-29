import { Card } from "antd";
const { Meta } = Card;
const RecipeCard = (item) => (
  <>
    <Card
      hoverable
      style={{
        aspectRatio: 2 / 2,
      }}
      cover={<img alt="delicious food" src={item.image} />}
    >
      <Meta
        title={item.name}
        description={item.description.slice(0, 100) + "..."}
      />
    </Card>
  </>
);
export default RecipeCard;
