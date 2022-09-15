import "./PongRoom.css";
import { Link, useLocation } from "react-router-dom";
import { inGame } from "../components/Pong/List/useCanvas";
import { useRef, useEffect } from "react";
import io from 'socket.io-client'

export let roomID: string;
export let pID: number;
export const socket = io("10.13.11.2:9006");

const PongRoom = () => {

  const ptext = useRef<null | HTMLParagraphElement>(null);
  const playertext = useRef<null | HTMLParagraphElement>(null);
  const location = useLocation();
    
  useEffect(() => {
    // console.log("Location changed");
    if (inGame){
      // console.log("Leaving room");
      socket.emit('leaveRoom', 
      {
        room: roomID,
        pID: pID
      })
    }
  }, [location]);
  
  useEffect(() => {
    socket.emit('joinRoom');
    socket.on('joinedRoom', function ([room, pid]){
      if (playertext.current){
        pID = pid ? 1 : 2;
        playertext.current.innerText = `Ready Player ${pID}`;
      }
      if (ptext.current){
        ptext.current.innerText = `Room ID : ${room}`;
        roomID = room;
      }
    });
  })

  return (
    <div className="pongRoom-wrap">
      <p ref={playertext} className = "text">loading...</p>
      <p className = "text2">Q or ↑ to go up <br/> A or ↓ to go down</p>
      <Link to="/Pong">
        <button className="button-78">Ready!</button>
      </Link>
      <p ref={ptext} className="text2">loading...</p>
    </div>
  );
};

export default PongRoom;
