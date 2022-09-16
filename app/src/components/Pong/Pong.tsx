import './Pong.css'
import { useEffect } from 'react';
import { roomID, pID, socket } from '../../Pages/PongRoom'
import useCanvas from './List/useCanvas';

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