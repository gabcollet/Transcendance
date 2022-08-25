import "./MenuButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface _Button {
  icon: any;
  className: string;
  iconClassName: string;
  //   i: number;
}

const MenuButton = (props: _Button) => {
  return (
    <li className={props.className}>
      <a href="#">
        <FontAwesomeIcon
          className={props.iconClassName}
          icon={props.icon}
        ></FontAwesomeIcon>
      </a>
    </li>
  );
};

export default MenuButton;
