import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Typography } from "antd";
import { DataStore } from "aws-amplify/lib-esm";
import { Recipes } from "../../models";
import Gallery from "../../Components/Gallery";
import RecipeList from "../../Components/List/RecipeList";
import { useDataContext } from "../../Contexts/DataContext";
import { useState, useEffect } from "react";
const { Title } = Typography;

const Home = () => {
  const {
    data,
    setData,
    easyData,
    setEasyData,
    customData,
    setCustomData,
    filterData,
    setFilterData,
    singleData,
    setSingleData,
    bakeData,
    setBakeData,
  } = useDataContext();

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
      {data?.length === 0 ? null : <Gallery data={data} />}
      <Title level={2}>Beginners Friendly</Title>
      <RecipeList data={easyData} pageSize={6} />
      <Title level={2}>Enjoy Alone</Title>
      <RecipeList data={singleData} pageSize={6} />
      <Title level={2}>Baking</Title>
      <RecipeList data={bakeData} pageSize={6} />
      <Title level={2}>All Recipes</Title>
      <RecipeList data={data} pageSize={6} />
    </>
  );
};

export default Home;
