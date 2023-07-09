import { List, Typography } from "antd";
import Loading from "../../Loading";
const { Text } = Typography;

const defaultListItem = (item) => item;
export default function TextList({
  data = [],
  header = "",
  listItem = defaultListItem,
}) {
  // if (data.length === 0) {
  //   return <Loading />;
  // }
  return (
    <List
      header={
        <Text style={{ fontSize: "1.2em", fontWeight: "600" }}>{header}</Text>
      }
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{listItem(item)}</List.Item>}
    />
  );
}
