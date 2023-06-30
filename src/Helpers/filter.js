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

export default filter;
