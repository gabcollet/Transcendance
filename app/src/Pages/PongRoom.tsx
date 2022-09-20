import "./PongRoom.css";
import { Link, useLocation } from "react-router-dom";
import { inGame } from "../components/Pong/List/useCanvas";
import { useRef, useEffect } from "react";
import io from "socket.io-client";

export let roomID: string;
export let pID: number;
export let pQuit : boolean = false;
export const socket = io("localhost:6006");

const PongRoom = () => {
  const ptext = useRef<null | HTMLParagraphElement>(null);
  const playertext = useRef<null | HTMLParagraphElement>(null);
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
      if (!inGame){
        socket.emit("joinRoom");
        // console.log('leavedroom');
      }
    });
  }, []);

  //On change path
  useEffect(() => {
    socket.on("leavedRoom2", (input) => {
      // socket.emit('leaveRoom2', roomID);
      pQuit = true;
      if ((!inGame) && input !== pID){
        socket.emit("joinRoom");
        // console.log('leavedroom2');
      }
    });
  }, []);

  useEffect(() => {
    socket.emit("joinRoom");
    // console.log('joinroom');
    
    socket.on("joinedRoom", function ([room, pid]) {
      if (playertext.current) {
        pID = pid ? 1 : 2;
        playertext.current.innerText = `Ready Player ${pID}`;
      }
      if (ptext.current) {
        ptext.current.innerText = `Room ID : ${room}`;
        roomID = room;
      }
    });
  });

  const setRdy = () => {
    socket.emit("playerReady", roomID);
    pQuit = false;
  };

  return (
    <div className="pongRoom-wrap">
      <p ref={playertext} className="text">
        loading...
      </p>
      <p className="text2">
        Q or ↑ to go up <br /> A or ↓ to go down
      </p>
      <Link to="/Pong">
        <button className="button-78" onClick={setRdy}>
          Ready!
        </button>
      </Link>
      <p ref={ptext} className="text2">
        loading...
      </p>
    </div>
  );
};

export default PongRoom;
