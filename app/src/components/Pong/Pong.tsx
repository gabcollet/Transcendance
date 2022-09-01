import useCanvas from './List/useCanvas'

const Pong = () => {

    // const { context, ...moreConfig } = options;
    const canvasRef = useCanvas(/* {context} */);

    return (
        <canvas ref={canvasRef} /* {...moreConfig} *//>
    );
};

export default Pong;