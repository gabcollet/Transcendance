import { drawRectangle, drawLine } from './draw'

const board = (ctx : CanvasRenderingContext2D, 
            w: number, 
            h: number, 
            scoreP1: number, 
            scoreP2: number,
            roomID: string) => {
    drawRectangle(ctx, {x:0, y:0}, w, h, 'black');
    ctx.setLineDash([10, 10]);
    drawLine(ctx, {x: w/2, y:0}, {x: w/2, y: h}, 'white', 4);
    ctx.font = "100px Times New Roman";
    ctx.fillStyle = 'white'
    if (scoreP1 < 10){
        ctx.fillText(scoreP1.toString(), w/2 - 100, h/6);
    } else {
        ctx.fillText(scoreP1.toString(), w/2 - 150, h/6);
    }
    ctx.fillText(scoreP2.toString(), w/2 + 50, h/6);
    // ctx.font = "10px Times New Roman";
    // ctx.fillText(roomID, 10, h-10);
}

class Player{
    constructor(x: number, y:number, h:number) {
        this.y = y;
        this.x = x;
        this.isMoving = false;
        this.keyPressed = new KeyboardEvent('keydown'); 
        this.height = h;
        this.score = 0;
    }
    y: number;
    x: number;
    isMoving: boolean;
    keyPressed: KeyboardEvent;
    height: number;
    score: number;

    draw = (ctx: CanvasRenderingContext2D, w: number, h: number, y:number) => {
        drawRectangle(ctx, {x: this.x, y: y}, w*.01, this.height, 'white');
    }

    move = (h: number) => {
        if (this.isMoving){
            if ((this.keyPressed.key === 'ArrowUp' 
                    || this.keyPressed.key === 'q')
                    && this.y > 0){
                this.y -= 14;
            } else if ((this.keyPressed.key === 'ArrowDown'
                        || this.keyPressed.key === 'a')
                        && this.y + this.height < h){
                this.y += 14;
            }
        }
    }
}

class Ball{
    constructor(x: number, y: number, w: number, dx: number){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = 0;
        this.ballRadius = (w*.015)/2;
    }
    x: number;
    y: number;
    dx: number;
    dy: number;
    ballRadius: number;

    draw = (ctx: CanvasRenderingContext2D) => {
        drawRectangle(ctx, {x: this.x-(this.ballRadius), y: this.y-(this.ballRadius)}, this.ballRadius*2, this.ballRadius*2, 'white');
    }

    update = (w: number, h: number, p1: Player, p2: Player) => {
        this.x += this.dx;
        this.y += this.dy;

        //make the ball bounce on top and bottom
        if (this.y + this.ballRadius > h || this.y - this.ballRadius < 0){
            this.dy *= -1;
        }
        //make the ball bounce on left paddle      
        if (this.x - this.ballRadius < w * .025 ){
            if (this.y + this.ballRadius > p1.y && this.y - this.ballRadius < p1.y + p1.height){
                this.dx *= -1;
                this.dy = (this.y - this.ballRadius - (p1.y + p1.height/2)) / 10;
            }
        } 
        //make the ball bounce on right paddle
        else if (this.x + this.ballRadius > w - (w * .03) ){
            if (this.y + this.ballRadius > p2.y && this.y - this.ballRadius < p2.y + p2.height){
                this.dx *= -1;
                this.dy = (this.y - this.ballRadius - (p2.y + p2.height/2)) / 10;
            }
        }
    }

    retart = (w : number, h: number) => {
        let dir: boolean = false;
        if (this.dx > 0) { dir = true; }
        this.x = w/2;
        this.y = h/2;
        this.dx = 4;
        if (dir) { this.dx *= -1; }
    }
}

export { board, Player, Ball };