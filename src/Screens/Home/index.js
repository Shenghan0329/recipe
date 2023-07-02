import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Typography } from "antd";
import { DataStore } from "aws-amplify/lib-esm";
import { Recipes } from "../../models";
import Gallery from "../../Components/Gallery";
import RecipeList from "../../Components/List/RecipeList";
// import { useDataContext } from "../../Contexts/DataContext";
import { useState, useEffect } from "react";
const { Title } = Typography;

const Home = () => {
  //   const {
  //     data,
  //     setData,
  //     easyData,
  //     setEasyData,
  //     customData,
  //     setCustomData,
  //     filterData,
  //     setFilterData,
  //     singleData,
  //     setSingleData,
  //   } = useDataContext();
  const [d, setD] = useState([]);

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
      {/* <Title level={2}>Beginners Friendly</Title>
      <RecipeList data={easyData} pageSize={6} /> */}
      {/* <Title level={2}>Meat</Title>
      <RecipeList pageSize={6} />
      <Title level={2}>Vegetables</Title>
      <RecipeList pageSize={6} />
      <Title level={2}>Soup</Title>
      <RecipeList pageSize={6} /> */}
      <Title level={2}>All Recipes</Title>

      <RecipeList data={d} pageSize={6} />
    </>
  );
};

export default Home;
