import { createContext, useEffect } from "react";
import { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Recipes,User } from "../models";
import { useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { Predicates } from "aws-amplify";
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
  // DataStore.query(Recipes,Predicates.ALL,{
  //       page: 0,
  //       limit: 6
  //     }).then((items)=>{
  //   setData(items);
  //   console.log("Fetched "+items.length+" recipes");
  // }).catch((e)=>{console.log(e)});
  DataStore.observeQuery(
    Recipes
  ).subscribe(snapshot => {
    const { items, isSynced } = snapshot;
    // console.log(`Recipes count: ${items.length}, isSynced: ${isSynced}`);
    setData(items);
  });
  DataStore.query(Recipes,recipe=>recipe.level.contains("Novice"),{
    page:0, 
    limit:60
  }).then((items)=>{
    setEasyData(items);
  }).catch((e)=>{console.log(e)});
  DataStore.query(Recipes,(recipe) => recipe.peopleNum.eq(1),{
    page:0, 
    limit:60
  }).then((items)=>{
    setSingleData(items);
  }).catch((e)=>{console.log(e)});
  DataStore.query(Recipes,(recipe) => recipe.method.eq("BAKE"),{
    page:0, 
    limit:60
  }).then((items)=>{
    setBakeData(items);
  }).catch((e)=>{console.log(e)});
  // DataStore.observeQuery(
  //   Recipes,
  //   (recipe) => recipe.level.contains("Novice")
  // ).subscribe(snapshot => {
  //   const { items, isSynced } = snapshot;
  //   setEasyData(items);
  // });
  // DataStore.observeQuery(
  //   Recipes,
  //   (recipe) => recipe.peopleNum.eq(1)
  // ).subscribe(snapshot => {
  //   const { items, isSynced } = snapshot;
  //   setSingleData(items);
  // });
  // DataStore.observeQuery(
  //   Recipes,
  //   (recipe) => recipe.method.eq("BAKE")
  // ).subscribe(snapshot => {
  //   const { items, isSynced } = snapshot;
  //   setBakeData(items);
  // });
  
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