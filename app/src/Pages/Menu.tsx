import "./Menu.css";
import MenuWheel from "../components/Menu/MenuWheel";
import Cookies from "js-cookie";

const Menu = () => {
  const isLogged = Cookies.get("logged");

  return isLogged ? (
    <MenuWheel></MenuWheel>
  ) : (
    <>{window.location.replace("http://localhost:3000/")}</>
  );
};

export default Menu;
