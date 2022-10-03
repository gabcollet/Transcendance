import "./PongRoom.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { pID } from "../components/Menu/useCanvas";
import io from "socket.io-client";

export const socket = io("localhost:6006");
export let pQuit : boolean = false;

const PongRoom = () => {
  const location = useLocation();

  useEffect(() => {
    socket.emit("leaveRoom");
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
    socket.emit("joinRoom", false);
    pQuit = false;
  };
  
  const setRandomMode = () => {
    socket.emit("joinRoom", true);
    pQuit = false;
  };

  const spectate = () => {
    socket.emit("spectate");
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
