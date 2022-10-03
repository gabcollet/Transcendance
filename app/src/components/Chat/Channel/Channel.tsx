import styles from "./Channel.module.css";
import { faCircleXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Channel_ } from "../../../interfaces";
import { getChannels, removeChannel } from "../ChatUtils";
const Channel = (props: Channel_) => {
  let icon = <></>;
  if (props.joined === true) {
    icon = (
      <FontAwesomeIcon
        className={styles["leave-icon"]}
        icon={faCircleXmark}
        onClick={() => {
          removeChannel(props.id, props.setUserChannels, props.setPublic);
        }}
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
        <p>{props.title}</p>
        {icon}
      </div>
    </div>
  );
};

export default Channel;
