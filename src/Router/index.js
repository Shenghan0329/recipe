import Home from "../Screens/Home";
// import List from "../Screens/List";
// import Add from "../Screens/Add";
// import Recipe from "../Screens/Recipe";
// import Contribute from "../Screens/Contribute";
// import Setting from "../Screens/Setting";
// import Article from "../Screens/Article";
// import Error from "../Screens/Error";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
const List = lazy(() => import("../Screens/List"));
const Add = lazy(() => import("../Screens/Add"));
const Recipe = lazy(() => import("../Screens/Recipe"));
const Contribute = lazy(() => import("../Screens/Contribute"));
const Setting = lazy(() => import("../Screens/Setting"));
const Error = lazy(() => import("../Screens/Error"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<List />} />
      <Route path="/add" element={<Add />} />
      <Route path="/recipes/:id" element={<Recipe />} />
      <Route path="/contribute" element={<Contribute />} />
      <Route path="/setting" element={<Setting />} />
      {/* <Route path="/article" element={<Article />} /> */}
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default Router;
