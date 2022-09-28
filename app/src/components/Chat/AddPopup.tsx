import styles from "./AddPopup.module.css";
import { AddPopup_ } from "../../interfaces";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AddPopup = (props: AddPopup_) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  let emptyname = <></>;
  let wrongPassword = <></>;
  let response: any;
  const handleCreate = () => {
    if (name !== "") {
      if (password !== "") {
        response = {
          name: name,
          password: password,
          checked: checked,
        };
      } else {
        response = {
          name: name,
          checked: checked,
          password: "jasihdfkljasdfhaskldjfhaklsdfhj",
        };
      }
      let channels = axios
        .post(
          "http://localhost:3030/chat/create-channels",
          { response },
          {
            withCredentials: true,
            headers: {
              Authorization: `bearer ${Cookies.get("jwtToken")}`,
            },
          }
        )
        .then((response) => {
          console.log("Channel Created");
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  };
  return props.trigger ? (
    <div className={styles["addpop-wrap"]}>
      <div className={styles["addpop-in"]}>
        <div className={styles["title"]}>Create Channel</div>
        <div className={styles["user-input"]}>
          <p>Channel Name:</p>
          {emptyname}
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
          {wrongPassword}
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
