const filter = function (data, filters) {
  const filteredData = [];
  for (let i = 0; i < data.length; i++) {
    let valid = true;
    for (const key of Object.keys(filters)) {
      if (data[i][key] !== filters[key]) {
        valid = false;
        continue;
      }
    }
    if (valid === true) filteredData.push(data[i]);
  }
  return filteredData;
};

// function queryAll(next=null,da){
//   let ops = {limit:360};
//   if(next === "finish") return;
//   if(next!=null) ops.nextToken=next;
//   API.graphql({
//     query: queries.data(ops,[])
//   }).then((res)=>{
//     let d = res.data;
//     if(d!=null) {
//       da=[...da,...d.listRecipes.items]
//       setData([...da]);
//     }
//     let token = d?.listRecipes.nextToken;
//     if(token!=null) queryAll(token);
//     return;
//   });
// }

export default filter;
