import "./Toggle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toggle_ } from "../../interfaces";

const Toggle = (props: Toggle_) => {
  return (
    <div onClick={props.onClick} className={props.className}>
      <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
    </div>
  );
};

export default Toggle;
