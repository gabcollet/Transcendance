import "./Pong.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../Pages/PongRoom";
import useCanvas from "../Menu/useCanvas";
import { UserImage } from "../Profile/UserImage";
import styles from "../Profile/ProfileHeader.module.css";


const Pong = () => {
  const canvasRef = useCanvas();
  const ptext = useRef<null | HTMLParagraphElement>(null);
  const playertext1 = useRef<null | HTMLParagraphElement>(null);
  const playertext2 = useRef<null | HTMLParagraphElement>(null);
  const isSpectator = useRef<boolean>(false);
  const [userImage1, setUserImage] = useState("");
  const [userImage2, setUserImage2] = useState("");

  useEffect(() => {
    socket.on("roomInfo", function ([room, pid, username1, username2]: [string, number, string, string]) {
      pid = Number(pid);
      if (pid === 3){
        isSpectator.current = true;
      }
      if (!isSpectator.current && playertext1.current && playertext2.current && username1){
        playertext1.current.innerText = `${username1.toUpperCase()} \n Player 1`;
          setUserImage(username1);
        if (pid === 2 && username2) {
          playertext2.current.innerText = `${username2.toUpperCase()} \n Player 2`;
          setUserImage2(username2);
        }
      }
      else if (playertext1.current) {
        playertext1.current.innerText = `Mode Spectator`;
      }
      if (ptext.current) {
        ptext.current.innerText = `Room ID : ${room}`;
      }
    });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="column">
          <p ref={playertext1} className="pong-text"></p>
        </div>
        <div className="column">
          <UserImage
            username={userImage1}
            className={styles["profile-image2"]}
          />
        </div>
        <div className="column2">
          <Link to="/PongRoom">
            <button className="button-78">Quit</button>
          </Link>
        </div>
        <div className="column3">
          <p ref={playertext2} className="pong-text"></p>
        </div>
        <div className="column3">
          <UserImage
            username={userImage2}
            className={styles["profile-image2"]}
          />
        </div>
      </div>
      <div>
        <canvas ref={canvasRef} className="pong-wrap" />
      </div>
      <p ref={ptext} className="pong-text">
        Loading...
      </p>
    </div>
  );
};

export default Pong;
