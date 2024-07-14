import { createContext, useEffect } from "react";
import { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Recipes,User } from "../models";
import { useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { getFileFromUrl } from "../Helpers/store";

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
 const { dbUser } = useAuthContext();


function getData(d){
  DataStore.observeQuery(
    Recipes
  ).subscribe(snapshot => {
    const { items, isSynced } = snapshot;
    console.log(`Recipes count: ${items.length}, isSynced: ${isSynced}`);
    setData(items);
    // if(items.length>0) {
    //   let f = getFileFromUrl(items[0]?.img);
    // }
  });
  DataStore.observeQuery(
    Recipes,
    (recipe) => recipe.level.contains("Novice")
  ).subscribe(snapshot => {
    const { items, isSynced } = snapshot;
    setEasyData(items);
  });
  DataStore.observeQuery(
    Recipes,
    (recipe) => recipe.peopleNum.eq(1)
  ).subscribe(snapshot => {
    const { items, isSynced } = snapshot;
    setSingleData(items);
  });
  DataStore.observeQuery(
    Recipes,
    (recipe) => recipe.method.eq("BAKE")
  ).subscribe(snapshot => {
    const { items, isSynced } = snapshot;
    setBakeData(items);
  });
  
 }
 useEffect(() => {
    getData();
 }, []);
 useEffect(() => {
   if (dbUser?.id) {
     DataStore.query(Recipes, (recipe) => recipe.userID.eq(dbUser?.id)).then(
       (found) => {
         setUserData(found);
         // console.log(found);
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