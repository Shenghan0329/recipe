import { List, Button, Spin } from "antd";
import { useState, useEffect, useRef } from "react";
import { DataStore } from "aws-amplify/lib-esm";
import { Recipes } from "../../../models";
import Loading from "../../Loading";
import filter from "../../../Helpers/filter";
import useDeviceSize from "../../Helper/screenInfo";

const f = filter;

const FlatList = ({ data, listItem, pageSize = 6, filters = {} }) => {
  // data should be in the form [{title:...},...]
  // Every listItem component should always have item as props
  const [width, height] = useDeviceSize();
  return (
    <Loading width="100%" height="300px" data={data}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Button
              type="text"
              href={"/recipes/" + item.id}
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
          pageSize:
            width < 576 ? 1 : width >= 1600 ? 8 : width < 768 ? 4 : pageSize,
        }}
      />
    </Loading>
  );
};
export default FlatList;
