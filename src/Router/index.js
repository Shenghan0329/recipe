import Home from "../Screens/Home";
// import List from "../Screens/List";
// import Add from "../Screens/Add";
// import Recipe from "../Screens/Recipe";
import Contribute from "../Screens/Contribute";
// import Setting from "../Screens/Setting";
// import Article from "../Screens/Article";
import Error from "../Screens/Error";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
const List = lazy(() => import("../Screens/List"));
const Add = lazy(() => import("../Screens/Add"));
const Recipe = lazy(() => import("../Screens/Recipe"));
const Setting = lazy(() => import("../Screens/Setting"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Suspense><List /></Suspense>}/>
      <Route path="/add" element={<Suspense><Add /></Suspense>} />
      <Route path="/recipes/:id" element={<Suspense><Recipe /></Suspense>} />
      <Route path="/contribute" element={<Contribute />} />
      <Route path="/setting" element={<Suspense><Setting /></Suspense>} />
      {/* <Route path="/article" element={<Article />} /> */}
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default Router;
