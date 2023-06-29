import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const Head = () => {
  const navigate = useNavigate();
  const navList = ["Home", "Listing", "Articles", "Add Recipe", "Contribute"];
  const linkList = ["/", "/list", "/article", "/add", "/contribute"];
  const navItems = navList.map((item, index) => {
    const key = index + 1;
    return {
      key,
      label: item,
    };
  });
  const onClick = (e) => {
    navigate(linkList[e.key - 1], { state: {} });
  };
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={navItems}
        onClick={onClick}
      />
    </Header>
  );
};

export default Head;
