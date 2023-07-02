import Router from "./Router";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import Head from "./Layout/Head";
import Home from "./Screens/Home";
import Foot from "./Layout/Foot";
// import DataContextProvider from "./Contexts/DataContext";

Amplify.configure(config);

const { Content } = Layout;

// const str = await cToE({
//   A: [{ a: "早" }, { b: "晚" }],
//   B: [{ c: "早" }, { d: "晚" }],
// });
// console.log(str);

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
          {/* <Router /> */}
          <Home />
        </Content>
        <Foot />
      </Layout>
    </BrowserRouter>
  );
};
export default App;
