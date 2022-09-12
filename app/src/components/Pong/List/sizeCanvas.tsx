const resizeCanvas = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) { return; }
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height){
        //resize canvas function to take into account the device pixel ratio
        const { devicePixelRatio: ratio=1 } = window;
        const context = canvas.getContext('2d');
        
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context?.scale(ratio, ratio);
        
        return true; //can return something else here to be used later
    }
    return false;
}

export default resizeCanvas;