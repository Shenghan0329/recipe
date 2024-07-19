import { API } from "aws-amplify";
import filters from "./filters";
import { DataStore } from "@aws-amplify/datastore";
import { Recipes } from "../models";

// filter set
const data = (option,filter=[]) => {
    // Parse options
    let ops = JSON.stringify(option).replace(/[{}]+/g, '')
        .replace("\"limit\"","limit")
        .replace("\"nextToken\"","nextToken");

    // Parse filters
    let fils = "";
    if(filter.length > 0){
        fils+=", filter: {";
        filter.forEach((ele)=>{
            if(!filters[ele]) return -1;
            fils+=filters[ele];
            fils+=","
        });
        fils+="}"
    }

    return `query MyQuery {
        listRecipes(${ops}${fils}) {
          items {
            id
            cookTime
            accessories {
              imgUrl
              name
              weight
            }
            createdAt
            img
            level
            mainIngredient {
              imgUrl
              name
              weight
            }
            measure {
              des
              picture
              step
            }
            meauID
            method
            name
            peopleNum
            prepareTime
            scrapyTime
            tags
            taste
            techniques
            updatedAt
            url
            userID
          }
          nextToken
        }
      }`
} 

const queryData = (ops,filter,da,func) => {
    API.graphql({
        query: data(ops,filter)
      }).then((res)=>{
        let d = res.data;
        if(d!=null) {
          da=[...da,...d.listRecipes.items]
          func([...da]);
        }
      });
}

const queryAll = (filter,func) => {
    console.log(filters.func[filter]);
    DataStore.observeQuery(
        Recipes,
        filters.func[filter]
    ).subscribe(snapshot => {
        const { items, isSynced } = snapshot;
        func(items);
    });
}

export {data, queryData,queryAll};