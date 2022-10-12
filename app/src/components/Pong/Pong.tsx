import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../Pages/PongRoom";
import useCanvas from "../Menu/useCanvas";
import { UserImage } from "../Profile/UserImage";
import styles from "../Profile/ProfileHeader.module.css";
import pongStyles from "./Pong.module.css";

const Pong = () => {
  const canvasRef = useCanvas();
  const ptext = useRef<null | HTMLParagraphElement>(null);
  const playertext1 = useRef<null | HTMLParagraphElement>(null);
  const playertext2 = useRef<null | HTMLParagraphElement>(null);
  const isSpectator = useRef<boolean>(false);
  const [userImage1, setUserImage] = useState("");
  const [userImage2, setUserImage2] = useState("");

  useEffect(() => {
    socket.on(
      "roomInfo",
      function ([room, pid, username1, username2, display1, display2]: [
        string,
        number,
        string,
        string,
        string,
        string
      ]) {
        pid = Number(pid);
        if (pid === 3) {
          isSpectator.current = true;
        }
        if (
          !isSpectator.current &&
          playertext1.current &&
          playertext2.current &&
          username1
        ) {
          playertext1.current.innerText = `${display1.toUpperCase()} \n Player 1`;
          setUserImage(username1);
          if (pid === 2 && username2) {
            playertext2.current.innerText = `${display2.toUpperCase()} \n Player 2`;
            setUserImage2(username2);
          }
        } else if (playertext1.current) {
          playertext1.current.innerText = `Spectator`;
        }
        if (ptext.current) {
          ptext.current.innerText = `Room ID : ${room}`;
        }
      }
    );
  }, []);

  return (
    <div>
      <div className={pongStyles["container"]}>
        <div className={pongStyles["left"]}>
          <p ref={playertext1} className={pongStyles["pong-text"]}></p>
        </div>
        <UserImage username={userImage1} className={styles["profile-image2"]} />
        <div className={pongStyles["midle"]}>
          <Link to="/PongRoom">
            <button className="button-78">Quit</button>
          </Link>
        </div>
        <UserImage username={userImage2} className={styles["profile-image2"]} />
        <div className={pongStyles["right"]}>
          <p ref={playertext2} className={pongStyles["pong-text"]}></p>
        </div>
      </div>
      <div>
        <canvas ref={canvasRef} className={pongStyles["pong-wrap"]} />
      </div>
      <p ref={ptext} className={pongStyles["pong-text"]}>
        Room expired please go back
      </p>
    </div>
  );
};

export default Pong;
