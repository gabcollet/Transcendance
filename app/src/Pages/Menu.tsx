import MenuWheel from "../components/Menu/MenuWheel";
import { Menu_ } from "../interfaces";

const Menu = (props: Menu_): any => {
  return (
    <MenuWheel
      opening={props.opening}
      setOpening={props.setOpening}
    ></MenuWheel>
  );
};

export default Menu;
