import './Pong.css'
import useCanvas from './List/useCanvas'

const Pong = () => {

    // const { context, ...moreConfig } = options;
    const canvasRef = useCanvas(/* {context} */);

    return (
        <div className = "pong-wrap">
            <canvas ref={canvasRef} /* {...moreConfig} *//>
        </div>
    );
};

export default Pong;