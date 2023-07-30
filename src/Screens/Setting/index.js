import { useParams, useRoutes } from "react-router-dom";
import { Typography, LayoutProps, Layout, Button } from "antd";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useAuthContext } from "../../Contexts/AuthContext";
import React from "react";
import "@aws-amplify/ui-react/styles.css";
import Profile from "../ProfileScreen";

const { Title } = Typography;

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

const Setting = () => {
  const { dbUser } = useAuthContext();
  console.log(dbUser);
  return (
    <>
      {dbUser ? (
        <React.Fragment>
          <Title level={2}>Setting</Title>
          <Title level={4}>User Name: {dbUser?.name}</Title>
          <Button onClick={signOut}>Sign Out</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Profile />
        </React.Fragment>
      )}
    </>
  );
};

export default withAuthenticator(Setting);
