import styles from "./AddPopup.module.css";
import { PasswordPopup_ } from "../../../interfaces";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { getChannels } from "../ChatUtils";

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
      axios
        .get("http://localhost:3030/chat/join-password", {
          params: {
            id: props.channelID,
            password: password,
          },
          withCredentials: true,
          headers: {
            Authorization: `bearer ${Cookies.get("jwtToken")}`,
          },
        })
        .then((response) => {
          setPassword("");
          setErrorMsg(<></>);
          props.setTrigger(false);
          getChannels(props.setUserChannels, props.setPublic);
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          if (typeof error.response.data.message == "string") {
            setErrorMsg(
              <div>
                <li key="1" className={styles["msg-list"]}>
                  <p className={styles["error-msg"]}>
                    {error.response.data.message}
                  </p>
                </li>
              </div>
            );
          } else {
            const listMessage = error.response.data.message.map(
              (message: string) => (
                <li key="2" className={styles["msg-list"]}>
                  <p className={styles["error-msg"]}>{message}</p>
                </li>
              )
            );
            setErrorMsg(<div>{listMessage}</div>);
          }
        });
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
