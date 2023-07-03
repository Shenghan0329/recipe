import { List, Avatar } from "antd";

const IngredientListCard = (item) => {
  return (
    <List.Item.Meta
      avatar={<Avatar src={item?.imgUrl} />}
      title={item?.name}
      description={item?.weight}
    />
  );
};

export default IngredientListCard;
