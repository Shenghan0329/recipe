import Router from "./Router";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import Head from "./Layout/Head";
import Foot from "./Layout/Foot";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import setDefaultUser from "./data/conversion";
import { convertOne, cToE } from "./data/conversion";
Amplify.configure(config);

const { Content } = Layout;

setDefaultUser();
convertOne();
cToE(
  "打发蛋白时要注意，打蛋器的头不要只定在一点，手拿着打蛋器匀速画圈，这样打出的蛋白才会均匀。"
);
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
