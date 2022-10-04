import styles from "./MenuButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuButton_ } from "../../interfaces";

const MenuButton = (props: MenuButton_) => {
  return (
    <li
      key="props.iconClassName"
      onClick={props.onClick}
      className={styles[props.className]}
    >
      <p className={styles["small-button"]}>
        <FontAwesomeIcon
          className={styles[props.iconClassName]}
          icon={props.icon}
        ></FontAwesomeIcon>
      </p>
    </li>
  );
};

export default MenuButton;
