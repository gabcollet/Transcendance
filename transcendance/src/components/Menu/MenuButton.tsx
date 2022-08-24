import "./MenuButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface _Button {
  icon: any;
}

const MenuButton = (props: _Button) => {
  console.log("TYPE IS" + typeof props.icon);
  return (
    <li>
      <a href="#">
        <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
      </a>
    </li>
  );
};

export default MenuButton;
