import "./Channel.css";
import {
  faHashtag,
  faCircleXmark,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Channel_ } from "../../interfaces";

const Channel = (props: Channel_) => {
  let icon = <></>;
  if (props.joined === true) {
    icon = (
      <FontAwesomeIcon
        className="leave-icon"
        icon={faCircleXmark}
      ></FontAwesomeIcon>
    );
  } else {
    icon = (
      <FontAwesomeIcon
        className="join-icon"
        icon={faCirclePlus}
      ></FontAwesomeIcon>
    );
  }
  return (
    <div className="channel-wrapper">
      <div className="channel-box">
        <FontAwesomeIcon
          className="hash-icon"
          icon={faHashtag}
        ></FontAwesomeIcon>
        <p>TEST</p>
        {icon}
      </div>
    </div>
  );
};

export default Channel;
