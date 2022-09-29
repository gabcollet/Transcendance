import MenuWheel from "../components/Menu/MenuWheel";
import Cookies from "js-cookie";
import { Menu_ } from "../interfaces";
import { socket } from "./PongRoom";

const Menu = (props: Menu_): any => {
  const isLogged = Cookies.get("logged");
  // socket.emit('online');

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
