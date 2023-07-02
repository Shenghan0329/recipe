import { List, Button } from "antd";
import { useState, useEffect, useRef } from "react";
import { DataStore } from "aws-amplify/lib-esm";
import { Recipes } from "../../../models";
import filter from "../../../Helpers/filter";
const f = filter;

const FlatList = ({ data = [], listItem, pageSize = 6, filters = {} }) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    DataStore.query(Recipes).then((results) => setListData(results));
  }, []);
  // data should be in the form [{title:...},...]
  // Every listItem component should always have item as props

  console.log(listData, data);
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
      renderItem={(item) => (
        <List.Item>
          <Button
            type="text"
            href={"recipes/" + item.id}
            style={{
              width: "100%",
              height: "auto",
              padding: 0,
              margin: 0,
            }}
          >
            {listItem(item)}
          </Button>
        </List.Item>
      )}
      pagination={{
        showQuickJumper: true,
        onChange: (page) => {
          // console.log(page);
        },
        pageSize: pageSize,
      }}
    />
  );
};
export default FlatList;
