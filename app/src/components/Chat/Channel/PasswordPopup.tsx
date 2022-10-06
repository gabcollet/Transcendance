import styles from "./AddPopup.module.css";
import { PasswordPopup_ } from "../../../interfaces";
import { useState } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const PasswordPopup = (props: PasswordPopup_) => {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(<></>);

  const handleExit = () => {
    setPassword("");
    setErrorMsg(<></>);
    props.setTrigger(false);
  };

  const handlePassword = () => {
    if (password !== "") {
      const passwordPkg = {
        password: password,
        channelID: props.channelID,
      };
      axios.post("http://localhost:3030/chat/join-password", passwordPkg);
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
        <div className={styles["title"]}>Enter Password</div>
        <div className={styles["error-wrap"]}>{errorMsg}</div>
        <div className={styles["user-input"]}>
          <div className={styles["user-input"]}>
            <p>Channel Password:</p>
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
    </div>
  );
  return props.trigger ? popup : <></>;
};

export default PasswordPopup;
