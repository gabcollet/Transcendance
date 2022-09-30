import { useState } from "react";
import styles from "./AddChannel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddPopup from "./AddPopup";

const AddChannel = () => {
  const [pop, setPop] = useState(false);
  const addChanel = () => {
    let state = pop === true ? false : true;
    setPop(state);
  };
  const createChannel = () => {};
  return (
    <div className={styles["add-wrap"]}>
      <p onClick={addChanel} className={styles["add-text"]}>
        New Channel
      </p>
      <FontAwesomeIcon className={styles["add-icon"]} icon={faCirclePlus} />
      <AddPopup trigger={pop} setTrigger={setPop}></AddPopup>
    </div>
  );
};

export default AddChannel;
