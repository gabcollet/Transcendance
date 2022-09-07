import './Pong.css'
import useCanvas, { roomID, pID } from './List/useCanvas'

const Pong = () => {

    const canvasRef = useCanvas();

    return (
        <div>
            <p className = "pong-text">Player {pID}</p>
            <div className = "pong-wrap">
                <canvas ref={canvasRef}/>
            </div>
            <p className = "pong-text">Room ID : {roomID}</p>
        </div>
    );
};

export default Pong;