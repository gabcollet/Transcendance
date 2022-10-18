import styles from "./AddPopup.module.css";
import { AddPopup_ } from "../../../interfaces";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { getChannels } from "../ChatUtils";

const AddPopup = (props: AddPopup_) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState(<></>);
  let response: any;

  const handleExit = () => {
    setName("");
    setPassword("");
    setChecked(false);
    setErrorMsg(<></>);
    props.setTrigger(false);
  };
  const handleCreate = () => {
    if (name !== "") {
      if (password === "") {
        response = {
          name: name,
          checked: checked,
          protected: false,
        };
      } else {
        response = {
          name: name,
          password: password,
          checked: checked,
          protected: true,
        };
      }
      axios
        .post("http://localhost:3030/chat/create-channel", response, {
          withCredentials: true,
          headers: {
            Authorization: `bearer ${Cookies.get("jwtToken")}`,
          },
        })
        .then((response) => {
          console.log("Channel Created");
          props.setTrigger(false);
          setName("");
          setPassword("");
          setChecked(false);
          setErrorMsg(<></>);
          console.log("Getting channels...");
          getChannels(props.setUserChannels, props.setPublic);
          props.socket.emit("alarm-all");
        })
        .catch((error) => {
          if (
            error.response.status === 500 ||
            typeof error.response.data.message == "string"
          ) {
            setErrorMsg(
              <div>
                <li key="1" className={styles["msg-list"]}>
                  <p className={styles["error-msg"]}>Server Error</p>
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
  return props.trigger ? (
    <div className={styles["addpop-wrap"]}>
      <div className={styles["addpop-in"]}>
        <FontAwesomeIcon
          className={styles["exit"]}
          icon={faCircleXmark}
          onClick={handleExit}
        ></FontAwesomeIcon>
        <div className={styles["title"]}>Create Channel</div>
        <div className={styles["error-wrap"]}>{errorMsg}</div>
        <div className={styles["user-input"]}>
          <p>Channel Name:</p>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            className={styles["name"]}
          ></input>
        </div>
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
        <div className={styles["visibility"]}>
          <div className={styles["visibility-row"]}>
            <p>Private: </p>
            <input
              type="checkbox"
              className={styles["private"]}
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
            ></input>
          </div>
        </div>
        <button onClick={handleCreate} className={styles["close"]}>
          Create
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AddPopup;
