import "./Menu.css";
import MenuWheel from "../components/Menu/MenuWheel";
import Cookies from "js-cookie";

const Menu = () => {
  const token = Cookies.get("jwtToken");
  console.log("TOKEN ID: " + token);

  return token ? (
    <MenuWheel></MenuWheel>
  ) : (
    <>{window.location.replace("http://localhost:3000/")}</>
  );
};

export default Menu;
