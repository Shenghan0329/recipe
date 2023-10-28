import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Contribute() {
  const navigate = useNavigate();
  useEffect(() => {
    window.open("https://github.com/Shenghan0329/recipe/tree/master");
    navigate(-1);
  });
}
