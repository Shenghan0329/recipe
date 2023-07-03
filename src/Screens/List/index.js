import { Typography } from "antd";
import { useDataContext } from "../../Contexts/DataContext";
import RecipeList from "../../Components/List/RecipeList";

const { Title } = Typography;

const List = () => {
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
      <Title level={2}>Recipes</Title>
      <RecipeList data={data} pageSize={30} />
    </>
  );
};

export default List;
