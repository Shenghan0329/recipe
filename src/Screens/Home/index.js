import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Typography } from "antd";
import Gallery from "../../Components/Gallery";
import RecipeList from "../../Components/List/RecipeList";
const { Title } = Typography;

const Home = () => {
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Title level={2}>Today's Favourites</Title>
      <Gallery />
      <Title level={2}>Beginners Friendly</Title>
      <RecipeList pageSize={6} filters={{ difficulty: 0 }} />
      <Title level={2}>Meat</Title>
      <RecipeList pageSize={6} />
      <Title level={2}>Vegetables</Title>
      <RecipeList pageSize={6} />
      <Title level={2}>Soup</Title>
      <RecipeList pageSize={6} />
    </>
  );
};

export default Home;
