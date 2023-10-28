import { Col, Row, Typography } from "antd";
import Image from "../../Image";
const { Title, Text } = Typography;

const StepCard = (item) => {
  return (
    <>
      {/* <Title level={3}>{item?.step}</Title> */}
      <Row style={{ width: "100%" }}>
        <Col span={8} align="left">
          <Image src={item?.picture[0]} height={200} width={"100%"} />
        </Col>
        <Col span={16} align="left">
          <div style={{ padding: "10%" }}>
            <Text strong>{item?.step + " "}</Text>
            <Text>{item?.des}</Text>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StepCard;
