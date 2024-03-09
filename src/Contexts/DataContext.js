import { createContext, useEffect } from "react";
import { useState } from "react";
import { DataStore } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { Recipes,User } from "../models";
import { useContext } from "react";
import { addData, ADD_DATA } from "../add_data";
import { useAuthContext } from "./AuthContext";

const DataContext = createContext({});

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataSize, setDataSize] = useState(-1);
  const [easyData, setEasyData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [bakeData, setBakeData] = useState([]);
  const [customData, setCustomData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  const { dbUser } = useAuthContext();
  const result = useSelector((state) => state.data);

  async function getData(){
    if (!data || data.length === 0) {
      const totalData = await DataStore.query(Recipes);
        setData(totalData);
        setDataSize(totalData.length);
        console.log("Fetched "+totalData.length+" recipes");
    }
    if (!easyData || easyData.length === 0) {
      DataStore.query(Recipes, (recipe) =>
        recipe.level.contains("Novice")
      ).then((found) => {
        setEasyData(found);
      });
    }
    if (!singleData || singleData.length === 0) {
      DataStore.query(Recipes, (recipe) => recipe.peopleNum.eq(1)).then(
        (found) => {
          setSingleData(found);
        }
      );
    }
    if (!bakeData || bakeData.length === 0) {
      DataStore.query(Recipes, (recipe) => recipe.method.eq("BAKE")).then(
        (found) => {
          setBakeData(found);
        }
      );
    }
    console.log("Data set");
  }
  useEffect(() => {
    // Store the data locally to prevent lack of data when refreshing
    console.warn("Local Data: ", result);
    if((result.data && result.data.length >= 3664)){
      setData(result.data);
      setCustomData(result.data);
      setFilterData(result.data);
      setEasyData(result.easyData);
      setSingleData(result.singleData);
      setBakeData(result.bakeData);
    }else{
      getData();
    }
  }, []);
  useEffect(() => {
    dispatch(addData({ data: data }));
    if (data?.length > 0 && result.data?.length <= data.length) {
      console.log("Stored local");
    }
    else{
      if(result.data?.length > data.length) setData(result.data);
      else getData();
    }
  }, [data]);
  useEffect(() => {
    if (easyData?.length > 0) {
      dispatch(addData({ easyData: easyData }));
    }
  }, [easyData]);
  useEffect(() => {
    if (easyData?.length > 0) {
      dispatch(addData({ singleData: singleData }));
    }
  }, [singleData]);
  useEffect(() => {
    if (bakeData?.length > 0) {
      dispatch(addData({ bakeData: bakeData }));
    }
  }, [bakeData]);
  useEffect(() => {
    if (dbUser?.id) {
      DataStore.query(Recipes, (recipe) => recipe.userID.eq(dbUser?.id)).then(
        (found) => {
          setUserData(found);
          console.log(found);
        }
      );
    }
  }, [dbUser]);

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
        bakeData,
        setBakeData,
        userData,
        dataSize,
        setDataSize,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

export const useDataContext = () => useContext(DataContext);
