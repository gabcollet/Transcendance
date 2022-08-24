import "./Toggle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface _Toggle {
  icon: any;
}

const Toggle = (props: _Toggle) => {
  return (
    <div>
      <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
    </div>
  );
};

export default Toggle;
