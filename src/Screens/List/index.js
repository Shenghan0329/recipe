import { Typography } from "antd";
import RecipeList from "../../Components/List/RecipeList";

const { Title } = Typography;

const List = () => {
  return (
    <>
      <Title level={2}>Meat</Title>
      <RecipeList pageSize={60} />
    </>
  );
};

export default List;
