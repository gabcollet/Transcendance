import "./Pong.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../Pages/PongRoom";
import { pID, roomID } from "./List/useCanvas";
import useCanvas from "./List/useCanvas";

const Pong = () => {
  const canvasRef = useCanvas();
  const ptext = useRef<null | HTMLParagraphElement>(null);
  const playertext = useRef<null | HTMLParagraphElement>(null);

  useEffect(() => {
    socket.on("joinedRoom", function ([room, pid]: [string, number]) {
      pid = Number(pid);
      if (playertext.current && (pid === 0 || pid === 1)) {
        playertext.current.innerText = `Player ${pid ? 1 : 2}`;
      } else if (playertext.current && pid === 2) {
        playertext.current.innerText = `Mode Spectator`;
      }
      if (ptext.current) {
        ptext.current.innerText = `Room ID : ${room}`;
      }
    });
  });

  const quit = () => {
    socket.emit("leaveRoom", {
      room: roomID,
      pID: pID,
    });
  };

  return (
    <div>
      <div className="row">
        <div className="column">
          <p ref={playertext} className="pong-text">
            Loading...
          </p>
        </div>
        <div className="column2">
          <Link to="/PongRoom">
            <button className="button-78" onClick={quit}>
              Quit
            </button>
          </Link>
        </div>
      </div>
      <div className="pong-wrap">
        <canvas ref={canvasRef} />
      </div>
      <p ref={ptext} className="pong-text">
        Loading...
      </p>
    </div>
  );
};

export default Pong;
