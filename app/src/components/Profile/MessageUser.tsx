/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Username_ } from "../../interfaces";
import styles from "./MessageUser.module.css";

export const MessageUser = (props: any) => {
  return (
    <div className={styles["button-container"]}>
      <Link
        className={styles["button-78"]}
        to="/Chat"
        state={{ otherName: props.otherUsername }}
      >
        Message
      </Link>
    </div>
  );
};
