import styles from "./Channel.module.css";
import { faCircleXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Channel_ } from "../../../interfaces";
import { getChannels, joinChannel, removeChannel } from "../ChatUtils";
const Channel = (props: Channel_) => {
  let icon = <></>;
  let channelClick = () => {};
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
		onClick={() => {
			joinChannel(props.id, props.setUserChannels, props.setPublic)
		}}
      ></FontAwesomeIcon>
    );
  }
  return (
    <div className={styles["channel-wrapper"]}>
      <div onClick={channelClick} className={styles["channel-box"]}>
        <p>{props.title}</p>
        {icon}
      </div>
    </div>
  );
};

export default Channel;
