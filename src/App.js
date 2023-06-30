import Router from "./Router";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import Head from "./Layout/Head";
import Foot from "./Layout/Foot";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import setDefaultUser from "./data/conversion";
import { convertOne } from "./data/conversion";
Amplify.configure(config);

const { Content } = Layout;

setDefaultUser();
convertOne();
const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};
export default App;
