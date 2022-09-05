import "./PongRoom.css";
import { Link } from "react-router-dom";

const PongRoom = (props: any) => {

  return (
    <div className="pongRoom-wrap">
      <p className="text">Join a room to play</p>
      <Link to="/Pong">
        <button className="button-78">Ready!</button>
      </Link>
    </div>
  );
};

export default PongRoom;
