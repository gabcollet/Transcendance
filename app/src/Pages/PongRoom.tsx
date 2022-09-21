import "./PongRoom.css";
import { Link, useLocation } from "react-router-dom";
import { inGame } from "../components/Pong/List/useCanvas";
import { useEffect } from "react";
import { roomID, pID } from "../components/Pong/List/useCanvas";
import io from "socket.io-client";

export let pQuit: boolean = false;
export const socket = io("localhost:6006");

const PongRoom = () => {
  const location = useLocation();

  useEffect(() => {
    if (inGame) {
      socket.emit("leaveRoom", {
        room: roomID,
        pID: pID,
      });
    }
  }, [location]);

  //On closing window
  useEffect(() => {
    socket.on("leavedRoom", () => {
      pQuit = true;
      if (!inGame) {
        socket.emit("joinRoom");
      }
    });
  }, []);

  //On change path
  useEffect(() => {
    socket.on("leavedRoom2", (input) => {
      pQuit = true;
      if (!inGame && input !== pID) {
        socket.emit("joinRoom");
      }
    });
  }, []);

  const setRdy = () => {
    socket.emit("joinRoom");
    pQuit = false;
  };

  const spectate = () => {
    socket.emit("spectate");
  };

  return (
    <div className="pongRoom-wrap">
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
