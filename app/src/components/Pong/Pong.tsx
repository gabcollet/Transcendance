import './Pong.css'
import useCanvas, {roomID} from './List/useCanvas'

const Pong = () => {

    const canvasRef = useCanvas();

    return (
        <div>
            <div className = "pong-wrap">
                <canvas ref={canvasRef}/>
            </div>
            <p className = "pong-text">Room ID : {roomID}</p>
        </div>
    );
};

export default Pong;