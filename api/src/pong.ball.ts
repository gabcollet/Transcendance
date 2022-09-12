export class Ball{
    constructor(x: number, y: number, w: number, dx: number, p1_h: number, p2_h: number, room: string, h:number){
      //faudrait vraiment spliter ca en info de room et info de ball
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = 0;
      this.ballRadius = (w*.015)/2;
      this.p1_height = p1_h;
      this.p2_height = p2_h;
      this.room = room;
      this.w = w;
      this.h = h;
      this.p1_score = 0;
      this.p2_score = 0;
      this.frameCount = 0;
    }
    x: number;
    y: number;
    dx: number;
    dy: number;
    w: number;
    h: number;
    ballRadius: number;
    p1_height: number;
    p2_height: number;
    room: string;
    p1_score: number;
    p2_score: number;
    frameCount: number;
  
    update = (p1_y: number, p2_y: number) => {
      this.x += this.dx;
      this.y += this.dy;
      
      //make the ball bounce on top and bottom
      if (this.y + this.ballRadius > this.h || this.y - this.ballRadius < 0){
          this.dy *= -1;
      }
      //make the ball bounce on left paddle
      if (this.x - this.ballRadius < this.w * .025 ){
          if (this.y + this.ballRadius > p1_y && this.y - this.ballRadius < p1_y + this.p1_height){
              this.dx *= -1;
              this.dy = (this.y - this.ballRadius - (p1_y + this.p1_height/2)) / 10;
            }
          } 
      //make the ball bounce on right paddle
      else if (this.x + this.ballRadius > this.w - (this.w * .03) ){
        if (this.y + this.ballRadius > p2_y && this.y - this.ballRadius < p2_y + this.p2_height){
          this.dx *= -1;
          this.dy = (this.y - this.ballRadius - (p2_y + this.p2_height/2)) / 10;
        }
      }
    }

    retart = () => {
        let dir: boolean = false;
        if (this.dx > 0) { dir = true; }
        this.x = this.w/2;
        this.y = this.h/2;
        this.dx = 4;
        this.dy = 0;
        if (dir) { this.dx *= -1; }
    }
  }