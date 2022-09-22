import "./PongRoom.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { roomID, pID } from "../components/Pong/List/useCanvas";
import io from "socket.io-client";

export const socket = io("10.13.6.4:6006");

const PongRoom = () => {
  const location = useLocation();

  useEffect(() => {
    socket.emit("leaveRoom", {
      room: roomID,
      pID: pID,
    });
  }, [location]);

  //On closing window
  useEffect(() => {
    socket.on("leavedRoom", () => {});
    if (pID !== 3) {
      socket.emit("gameEnd");
    }
  }, []);

  //On change path
  useEffect(() => {
    socket.on("leavedRoom2", () => {});
    if (pID !== 3) {
      socket.emit("gameEnd");
    }
  }, []);

  const setRdy = () => {
    socket.emit("joinRoom");
  };

  const spectate = () => {
    socket.emit("spectate");
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
          Start Game
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
