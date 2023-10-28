import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import "./head.css";
const { Header, Content, Footer } = Layout;

const Head = () => {
  const navigate = useNavigate();
  const navList = ["Home", "Listing", "Add Recipe", "Contribute"];
  const linkList = ["/", "/recipes", "/add", "/contribute", "/setting"];

  const setting = { key: "6", icon: <SettingOutlined /> };

  const navItems = navList.map((item, index) => {
    const key = index + 1;
    return {
      key,
      label: item,
    };
  });
  navItems.push(setting);
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
      <Menu theme="dark" mode="horizontal" items={navItems} onClick={onClick} />
    </Header>
  );
};

export default Head;
