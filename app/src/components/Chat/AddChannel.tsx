import "./AddChannel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
const AddChannel = () => {
  return (
    <div className="add-wrap">
      <FontAwesomeIcon className="add-icon" icon={faCirclePlus} />
      <p className="add-text">New Channel</p>
    </div>
  );
};

export default AddChannel;
