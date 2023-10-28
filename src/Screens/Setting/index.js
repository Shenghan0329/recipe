import { Typography, LayoutProps, Layout, Button } from "antd";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useDataContext } from "../../Contexts/DataContext";
import React from "react";
import "@aws-amplify/ui-react/styles.css";
import Profile from "../ProfileScreen";
import Image from "../../Components/Image";
import Loading from "../../Components/Loading";
import RecipeList from "../../Components/List/RecipeList";
import { getUrl } from "../../Helpers/store";

const { Title, Text } = Typography;

const Setting = () => {
  const { dbUser, authUser, setReset, setAuthUser, setDbUser } =
    useAuthContext();
  const { userData } = useDataContext();
  const [toEdit, setToEdit] = useState(false);
  const navigation = useNavigate();

  const edit = () => {
    setToEdit(true);
  };
  const back = () => {
    setToEdit(false);
  };
  async function signOut() {
    try {
      navigation("/");
      Auth.signOut().then(() => {
        setAuthUser(null);
        setDbUser(null);
      });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  useEffect(() => setReset(true), []);
  return (
    <>
      {!authUser ? (
        <React.Fragment>
          <Title level={2}>Setting</Title>
          <Loading />
        </React.Fragment>
      ) : dbUser && !toEdit ? (
        <React.Fragment>
          <Title level={2}>Setting</Title>
          {dbUser?.image && <Image src={dbUser?.image} />}
          <Title level={4}>User Name: {dbUser?.name}</Title>
          {dbUser?.introduce && (
            <div>
              <Title level={4}>My Profile</Title>
              <Text>{dbUser?.introduce}</Text>
            </div>
          )}
          {userData.length > 0 && (
            <React.Fragment>
              <RecipeList data={userData} pageSize={4} />
            </React.Fragment>
          )}
          <Button onClick={signOut}>Sign Out</Button>
          <Button onClick={edit}>Edit</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Profile
            afterSubmit={() => {
              setToEdit(false);
            }}
          />
          <Button onClick={back}>Back</Button>
        </React.Fragment>
      )}
    </>
  );
};

export default withAuthenticator(Setting);
