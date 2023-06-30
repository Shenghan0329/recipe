import { useParams, useRoutes } from "react-router-dom";
import { Typography, LayoutProps, Layout } from "antd";
import Image from "../../Components/Image";
import filter from "../../Helpers/filter";
import recipes from "../../data/recipes.json";

const { Title } = Typography;
const { Content } = Layout;
const f = filter;
const Recipe = () => {
  const { id } = useParams();
  const recipe = f(recipes, { id })[0];
  return (
    <>
      <Title level={2}>{recipe?.name}</Title>
      <Image
        width={400}
        height={200}
        src={recipe?.image}
        margins={[30, 30, 0, 0]}
      />
    </>
  );
};

export default Recipe;
