import Router from "./Router";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import Head from "./Layout/Head";
import Home from "./Screens/Home";
import Foot from "./Layout/Foot";
import DataContextProvider from "./Contexts/DataContext";

Amplify.configure(config);

const { Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <Layout className="layout">
          <Head />
          <Content
            style={{
              padding: "0 50px",
              width: "70%",
            }}
          >
            <Router />
          </Content>
          <Foot />
        </Layout>
      </DataContextProvider>
    </BrowserRouter>
  );
};
export default App;
