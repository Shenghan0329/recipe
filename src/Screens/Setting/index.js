import { useParams, useRoutes } from "react-router-dom";
import { Typography, LayoutProps, Layout } from "antd";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const { Title } = Typography;

const Setting = () => {
  return (
    <>
      <Title level={2}>Setting</Title>
      <Title level={4}>User Name: </Title>
    </>
  );
};

export default withAuthenticator(Setting);
