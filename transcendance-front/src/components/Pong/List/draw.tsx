type Coordinate = {x: number, y: number};

const drawRectangle = (
    ctx: CanvasRenderingContext2D, 
    pos: Coordinate,
    width: number, 
    height: number, 
    color: string) => {
   
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect(pos.x, pos.y, width, height);
}

const drawCircle = (
    ctx: CanvasRenderingContext2D,
    pos: Coordinate,
    radius: number, 
    angle: number, 
    color: string ) => { 
    
    ctx.fillStyle = color; 
    ctx.beginPath(); 
    ctx.arc(pos.x, pos.y, radius, angle, Math.PI*2, true); 
    ctx.fill(); 
}

const drawLine = (
    ctx: CanvasRenderingContext2D,
    beginPos: Coordinate,
    endPos: Coordinate,
    color: string,
    width: number) => {
    
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(beginPos.x, beginPos.y);
    ctx.lineTo(endPos.x, endPos.y);
    ctx.stroke();
}

export { drawCircle, drawRectangle, drawLine };