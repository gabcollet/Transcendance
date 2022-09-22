import "./Channel.css";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Channel_ {
  title: string;
  image?: any;
}
const Channel = () => {
  return (
    <div className="channel-wrapper">
      <div className="channel-box">
        <FontAwesomeIcon
          className="hash-icon"
          icon={faHashtag}
        ></FontAwesomeIcon>
        <p>TEST</p>
      </div>
    </div>
  );
};

export default Channel;
