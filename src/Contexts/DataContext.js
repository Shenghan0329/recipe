import { createContext, useEffect } from "react";
import { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Recipes,User } from "../models";
import { useContext } from "react";
import { API } from 'aws-amplify';
import { useAuthContext } from "./AuthContext";
import * as queries from "../GraphQL/queries";
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
 const [fullLoad, setFullLoad] = useState({
  data:false,
  easyData:false,
  singleData:false,
  bakeData:false
 });
 const datas = {
  data, easyData, singleData, bakeData
 }
 const setters = {
  data:setData, 
  easyData:setEasyData, 
  singleData:setSingleData, 
  bakeData:setBakeData
 }
 const { dbUser } = useAuthContext();

//  const listen = Hub.listen("datastore", async hubData => {
//   const  { event, d } = hubData.payload;
//   if (event === "ready" && data.length===0) {
//     // do something here once the data is synced from the cloud
//     getData();
//   }
// })

function getData(d){
  queries.queryData({limit:120},["beginner"],easyData,setEasyData);
  queries.queryData({limit:120},["single"],singleData,setSingleData);
  queries.queryData({limit:120},["bake"],bakeData,setBakeData);  
 }
 useEffect(() => {
  if(data.length<10 
    || easyData.length < 10 
    || singleData.length < 3 
    || bakeData.length < 10)
  {
    console.log("a")
    queries.queryData({limit:60},[],data,setData);
    getData();
  }
    
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
 useEffect(()=>{
  Object.getOwnPropertyNames(fullLoad).forEach(prop => {
    if(fullLoad[prop] && datas[prop].length < 200){
      queries.queryAll(prop,setters[prop]);
    }
  });
 },[fullLoad])


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
       fullLoad,
       setFullLoad
     }}
   >
     {children}
   </DataContext.Provider>
 );
};


export default DataContextProvider;


export const useDataContext = () => useContext(DataContext);