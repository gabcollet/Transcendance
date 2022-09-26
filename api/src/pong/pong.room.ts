import { Ball } from "./pong.ball";

export class Room{
    constructor(w: number, h:number, p1_h: number, p2_h: number, room: string, random: boolean){ 
        this.roomID = room;
        this.p1_score = 0;
        this.p2_score = 0;
        this.frameCount = 0;
        this.ready = 0;
        this.ballSpeed = 6;
        this.random = random;
        if (Math.random() < 0.5){
            this.ball = new Ball(w/2, h/2, -this.ballSpeed, (w*.015)/2, p1_h, p2_h, h, w);
        } 
        else {
            this.ball = new Ball(w/2, h/2, this.ballSpeed, (w*.015)/2, p1_h, p2_h, h, w);
        }
    }
    roomID: string;
    p1_score: number;
    p2_score: number;
    frameCount: number;
    ready: number;
    ballSpeed: number;
    ball: Ball;
    random: boolean;
}