import styles from "./Channel.module.css";
import { faCircleXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Channel_ } from "../../../interfaces";

const Channel = (props: Channel_) => {
  let icon = <></>;
  if (props.joined === true) {
    icon = (
      <FontAwesomeIcon
        className={styles["leave-icon"]}
        icon={faCircleXmark}
      ></FontAwesomeIcon>
    );
  } else {
    icon = (
      <FontAwesomeIcon
        className={styles["join-icon"]}
        icon={faCirclePlus}
      ></FontAwesomeIcon>
    );
  }
  return (
    <div className={styles["channel-wrapper"]}>
      <div className={styles["channel-box"]}>
        {/* <FontAwesomeIcon
          className={styles["hash-icon"]}
          icon={faHashtag}
        ></FontAwesomeIcon> */}
        <p>{props.title}</p>
        {icon}
      </div>
    </div>
  );
};

export default Channel;
