import { Typography, Dropdown, Button, Space } from "antd";
import { useState } from "react";
import { useDataContext } from "../../Contexts/DataContext";
import RecipeList from "../../Components/List/RecipeList";
import { all } from "axios";

const { Title } = Typography;

const List = () => {
  const { data, easyData, customData, filterData, singleData, bakeData } =
    useDataContext();
  const dataTypeList = [data, easyData, customData, singleData, bakeData];
  const dataNameList = ["All", "Easy", "Custom", "For one person", "Baked"];
  const [d, setD] = useState(0);
  const items = dataTypeList.map((ele, index) => {
    return {
      key: dataNameList[index] + "-" + index,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            setD(index);
          }}
        >
          {dataNameList[index]}
        </a>
      ),
    };
  });

  // [
  //   {
  //     key: "1",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="https://www.antgroup.com"
  //       >
  //         1st menu item
  //       </a>
  //     ),
  //   },
  // ];
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>Recipes</Title>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
          arrow
        >
          <Button>Categories</Button>
        </Dropdown>
      </div>
      <RecipeList data={dataTypeList[d]} pageSize={30} />
    </>
  );
};

export default List;
