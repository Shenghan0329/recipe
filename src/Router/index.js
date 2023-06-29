import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Home from "../Screens/Home";
import List from "../Screens/List";
import Add from "../Screens/Add";
import Error from "../Screens/Error";
import Head from "../Layout/Head";
import Foot from "../Layout/Foot";

const { Content } = Layout;

const Router = () => {
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/add" element={<Add />} />
            <Route
              path="/contribute"
              component={() => {
                window.location.href = "https://example.com/1234";
                return null;
              }}
            />
            <Route path="/*" element={<Error />} />
          </Routes>
        </Content>
        <Foot />
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
