import styles from "./AddChannel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
const AddChannel = () => {
  return (
    <div className={styles["add-wrap"]}>
      <FontAwesomeIcon className={styles["add-icon"]} icon={faCirclePlus} />
      <p className={styles["add-text"]}>New Channel</p>
    </div>
  );
};

export default AddChannel;
