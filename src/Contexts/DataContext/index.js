import { createContext, useEffect } from "react";
import { useState } from "react";
import { DataStore } from "aws-amplify";
import { Recipes } from "../../models";
import { useContext } from "react";

const DataContext = createContext({});
const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [easyData, setEasyData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [bakeData, setBakeData] = useState([]);
  const [customData, setCustomData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  //   useEffect(() => {
  //     // if (data.length === 0) {
  //     //   DataStore.query(Recipes).then((totalData) => {
  //     //     setData(totalData);
  //     //     setCustomData(totalData);
  //     //     setFilterData(totalData);
  //     //   });
  //     // }
  //     // if (easyData.length === 0) {
  //     //   DataStore.query(Recipes, (recipe) =>
  //     //     recipe.level.contains("Novice")
  //     //   ).then((found) => {
  //     //     setEasyData(found);
  //     //   });
  //     // }
  //   }, []);

  return (
    <DataContext.Provider
      value={{
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

export const useDataContext = () => useContext(DataContext);
