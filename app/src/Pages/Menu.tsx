import "./Menu.css";
import MenuWheel from "../components/Menu/MenuWheel";
import Cookies from "js-cookie";
import { Menu_ } from "../interfaces";

const Menu = (props: Menu_) => {
  const isLogged = Cookies.get("logged");

  return isLogged ? (
    <MenuWheel
      opening={props.opening}
      setOpening={props.setOpening}
    ></MenuWheel>
  ) : (
    <>{window.location.replace("http://localhost:3000/")}</>
  );
};

export default Menu;
