import Home from "../Screens/Home";
import List from "../Screens/List";
import Add from "../Screens/Add";
import Recipe from "../Screens/Recipe";
import Contribute from "../Screens/Contribute";
import Setting from "../Screens/Setting";
import Article from "../Screens/Article";
import Error from "../Screens/Error";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/add" element={<Add />} />
      <Route path="/recipes/:id" element={<Recipe />} />
      <Route path="/contribute" element={<Contribute />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/article" element={<Article />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default Router;
