import styles from "./Toggle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toggle_ } from "../../interfaces";

const Toggle = (props: Toggle_) => {
  return (
    <div onClick={props.onClick} className={styles[props.className]}>
      <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
    </div>
  );
};

export default Toggle;
