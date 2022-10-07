import { useState } from "react";
import styles from "./AddChannel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddPopup from "./AddPopup";
import PasswordPopup from "./PasswordPopup";

const AddChannel = (props: any) => {
  const [pop, setPop] = useState(false);
  const addChanel = () => {
    let state = pop === true ? false : true;
    setPop(state);
  };
  return (
    <div className={styles["add-wrap"]}>
      <p onClick={addChanel} className={styles["add-text"]}>
        New Channel
      </p>
      <FontAwesomeIcon
        onClick={addChanel}
        className={styles["add-icon"]}
        icon={faCirclePlus}
      />
      <AddPopup
        trigger={pop}
        setTrigger={setPop}
        userChannels={props.userChannels}
        setUserChannels={props.setUserChannels}
        setPublic={props.setPublic}
      ></AddPopup>
      <PasswordPopup
        trigger={props.passwordTrigger}
        setTrigger={props.setPasswordTrigger}
        channelID={props.passwordID}
        setUserChannels={props.setUserChannels}
        setPublic={props.setPublic}
      ></PasswordPopup>
    </div>
  );
};

export default AddChannel;
