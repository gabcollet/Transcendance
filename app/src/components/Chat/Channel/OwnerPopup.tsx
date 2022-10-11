import styles from "./AddPopup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { OwnerPopup_ } from "../../../interfaces";
import { removePassword, changePassword } from "../ChatUtils";

const OwnerPopup = (props: OwnerPopup_) => {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(<></>);

  const handleExit = () => {
    setPassword("");
    setErrorMsg(<></>);
    props.setTrigger(false);
  };

  const handlePassword = async () => {
    if (password !== "") {
      const done = await changePassword(props.channelID, password, setErrorMsg);
      if (done === true) {
        setPassword("");
        setErrorMsg(<></>);
        props.setTrigger(false);
      }
    }
  };

  const popup = (
    <div className={styles["addpop-wrap"]}>
      <div className={styles["addpop-in-pass"]}>
        <FontAwesomeIcon
          className={styles["exit"]}
          icon={faCircleXmark}
          onClick={handleExit}
        ></FontAwesomeIcon>
        <div className={styles["title"]}>Channel Settings</div>
        <div className={styles["error-wrap"]}>{errorMsg}</div>
        <div className={styles["remove-password-wrap"]}>
          <button
            onClick={() => {
              removePassword(props.channelID);
              setPassword("");
              setErrorMsg(<></>);
              props.setTrigger(false);
            }}
            className={styles["remove-password"]}
          >
            Remove Password
          </button>
        </div>
        <div className={styles["user-input"]}>
          <p>Change Password:</p>
          <input
            value={password}
            type="password"
            className={styles["password"]}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </div>
        <button onClick={handlePassword} className={styles["close"]}>
          Send
        </button>
      </div>
    </div>
  );

  return props.trigger ? popup : <></>;
  return <></>;
};

export default OwnerPopup;
