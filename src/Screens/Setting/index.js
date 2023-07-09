import { useParams, useRoutes } from "react-router-dom";
import { Typography, LayoutProps, Layout, Button } from "antd";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

const { Title } = Typography;

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

const Setting = () => {
  return (
    <>
      <Title level={2}>Setting</Title>
      <Title level={4}>User Name: </Title>
      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
};

export default withAuthenticator(Setting);
