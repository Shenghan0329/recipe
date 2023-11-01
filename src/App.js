import Router from "./Router";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import Head from "./Layout/Head";
import Home from "./Screens/Home";
import Foot from "./Layout/Foot";
import DataContextProvider from "./Contexts/DataContext";
import updateAll from "./data/updateImage";
import AuthContextProvider from "./Contexts/AuthContext";
import useDeviceSize from "./Components/Helper/screenInfo";

Amplify.configure(config);

// updateAll();
const { Content } = Layout;

const App = () => {
  const [width, height] = useDeviceSize();
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <DataContextProvider>
          <Layout className="layout">
            <Head />
            <Content
              style={{
                padding: "0 50px",
                width: width > 1200 ? "70%" : "100%",
              }}
            >
              <Router />
            </Content>
            <Foot />
          </Layout>
        </DataContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
