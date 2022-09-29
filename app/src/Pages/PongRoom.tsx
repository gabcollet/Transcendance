import "./PongRoom.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { roomID, pID } from "../components/Pong/List/useCanvas";
import io from "socket.io-client";

export const socket = io("localhost:6006");
export let pQuit : boolean = false;

const PongRoom = (props: any) => {
  const location = useLocation();

  useEffect(() => {
    socket.emit("leaveRoom", {
      room: roomID,
      pID: pID,
    });
  }, [location]);

  useEffect(() => {
    socket.on("leavedRoom", () => {
      if (pID !== 3) {
        socket.emit("gameEnd");
      }
      pQuit = true;
    });
  }, []);

  const setRdy = () => {
    socket.emit("joinRoom", [props.username, false]);
    pQuit = false;
  };
  
  const setRandomMode = () => {
    socket.emit("joinRoom", [props.username, true]);
    pQuit = false;
  };

  const spectate = () => {
    socket.emit("spectate", props.username);
    pQuit = false;
  };

  return (
    <div className="pongRoom-wrap">
      <Link to="/Menu">
        <button className="button-78">←</button>
      </Link>
      <p className="text2">
        Q or ↑ to go up <br /> A or ↓ to go down
      </p>
      <Link to="/Pong">
        <button className="button-78" onClick={setRdy}>
          Start Normal Game
        </button> <br/>
        <button className="button-78" onClick={setRandomMode}>
          Start Random Game
        </button>
      </Link>
      <p className="text2">OR</p>
      <Link to="/Pong">
        <button className="button-78" onClick={spectate}>
          Spectate
        </button>
      </Link>
    </div>
  );
};

export default PongRoom;
