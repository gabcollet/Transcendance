import "./MenuButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface _Button {
  icon: any;
  className: string;
}

const MenuButton = (props: _Button) => {
  console.log(props.className);
  return (
    <li className={props.className}>
      <a href="#">
        <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
      </a>
    </li>
  );
};

export default MenuButton;
