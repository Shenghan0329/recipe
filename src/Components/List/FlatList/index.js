import { List } from "antd";
import { useState, useEffect } from "react";

const FlatList = ({ data, listItem, pageSize = 6, filters = {} }) => {
  // data should be in the form [{title:...},...]
  // Every listItem component should always have item as props
  const [filter, setFilter] = useState({});
  const [listData, setListData] = useState(data);
  useEffect(() => {
    setFilter(filters);
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
    setListData(filteredData);
    console.log(filter);
  }, []);

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={listData}
      renderItem={(item) => <List.Item>{listItem(item)}</List.Item>}
      pagination={{
        showQuickJumper: true,
        onChange: (page) => {
          console.log(page);
        },
        pageSize: pageSize,
      }}
    />
  );
};
export default FlatList;
