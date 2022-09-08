import "./PongRoom.css";
import { Link } from "react-router-dom";
import { } from "../components/Pong/List/useCanvas";
import { useRef, useEffect } from "react";
import io from 'socket.io-client'

export let roomID: string;
export let pID: number;
export const socket = io("localhost:9006");

const PongRoom = () => {

  const ptext = useRef<null | HTMLParagraphElement>(null);
  const playertext = useRef<null | HTMLParagraphElement>(null);
  
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
        // console.log(room);
        // console.log('Room:', ptext.current!.innerText);
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
