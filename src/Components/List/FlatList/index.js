import { List } from "antd";
import { useState, useEffect } from "react";
import filter from "../../../Helpers/filter";
const f = filter;

const FlatList = ({
  data = [],
  listItem,
  pageSize = 6,
  filters = {},
  link,
}) => {
  // data should be in the form [{title:...},...]
  // Every listItem component should always have item as props
  const [filter, setFilter] = useState({});
  const [listData, setListData] = useState(data);
  useEffect(() => {
    setFilter(filters);
    const filteredData = f(data, filters);
    setListData(filteredData);
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
