import { lazy, Suspense } from "react";
import Home from "../Screens/Home";
import List from "../Screens/List";
import Error from "../Screens/Error";
import Loading from "../Components/Loading";
import { Route, Routes } from "react-router-dom";

const Add = lazy(() => import("../Screens/Add"));
const Recipe = lazy(() => import("../Screens/Recipe"));
const Contribute = lazy(() => import("../Screens/Contribute"));
const Setting = lazy(() => import("../Screens/Setting"));

const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<List />} />
      <Route path="/add" element={<Suspense fallback={<Loading />}><Add /></Suspense>} />
      <Route path="/recipes/:id" element={<Suspense fallback={<Loading />}><Recipe /></Suspense>} />
      <Route path="/contribute" element={<Suspense fallback={<Loading />}><Contribute /></Suspense>} />
      <Route path="/setting" element={<Suspense fallback={<Loading />}><Setting /></Suspense>} />
      {/* <Route path="/article" element={<Article />} /> */}
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default Router;
