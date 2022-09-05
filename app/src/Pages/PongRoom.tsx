import "./PongRoom.css";
import { Link } from "react-router-dom";
import io from 'socket.io-client';

const PongRoom = (props: any) => {
  
  const socket = io("localhost:9006");
  let roomID: string;

  const joinRoom = () => {
    socket.emit('joinRoom');
  }

  socket.on('joinedRoom', room => {
    console.log('Connected');
    roomID = room;
});

  return (
    <div className="pongRoom-wrap">
      <p className="text">Join a room to play</p>
      <Link to="/Pong">
        <button className="button-78" onClick={joinRoom}>Ready!</button>
      </Link>
    </div>
  );
};

export default PongRoom;
