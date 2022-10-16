import styles from "./Channel/AddPopup.module.css";
import { setCustom } from "../../Pages/PongRoom";
import { Link } from "react-router-dom";

const InvitePopup = (props: {
  trigger: boolean;
  roomID: string;
  invitee: string;
  setTrigger: any;
}) => {
  const popup = (
    <div className={styles["addpop-wrap"]}>
      <div className={styles["addpop-in-pass"]}>
        <div className={styles["title"]}>Game Invite</div>
        <div className={styles["game-invite"]}>
          {props.invitee} has invited you to a pong game
        </div>
        <Link
          className={styles["accept-inv"]}
          onClick={() => {
            setCustom(props.roomID);
          }}
          to="/Pong"
        >
          Accept
        </Link>
        ;
        <button
          onClick={() => {
            props.setTrigger(false);
          }}
          className={styles["refuse-inv"]}
        >
          Refuse
        </button>
      </div>
    </div>
  );
  return props.trigger ? popup : <></>;
};

export default InvitePopup;
