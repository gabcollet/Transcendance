import "./PongRoom.css";
import { Link } from "react-router-dom";
import { joinRoom } from "../components/Pong/List/useCanvas";

const PongRoom = () => {

  joinRoom();

  return (
    <div className="pongRoom-wrap">
      <p className = "text">Press ready to join a lobby</p>
      <p className = "text2">Q or ↑ to go up <br/> A or ↓ to go down</p>
      <Link to="/Pong">
        <button className="button-78">Ready!</button>
      </Link>
    </div>
  );
};

export default PongRoom;
