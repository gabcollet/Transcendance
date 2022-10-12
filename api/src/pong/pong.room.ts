import { Ball } from './pong.ball';

export class Room {
  constructor(
    w: number,
    h: number,
    p1_h: number,
    p2_h: number,
    room: string,
    random: boolean,
    maxScore: number,
  ) {
    this.roomID = room;
    this.p1_score = 0;
    this.p2_score = 0;
    this.frameCount = 0;
    this.ready = 0;
    this.ballSpeed = 6;
    this.random = random;
    this.maxScore = maxScore;
    this.winGiven = false;
    if (Math.random() < 0.5) {
      this.ball = new Ball(
        w / 2,
        h / 2,
        -this.ballSpeed,
        (w * 0.015) / 2,
        p1_h,
        p2_h,
        h,
        w,
      );
    } else {
      this.ball = new Ball(
        w / 2,
        h / 2,
        this.ballSpeed,
        (w * 0.015) / 2,
        p1_h,
        p2_h,
        h,
        w,
      );
    }
  }
  roomID: string;
  p1_score: number;
  p1_name: string;
  p1_display_name: string;
  p2_score: number;
  p2_name: string;
  p2_display_name: string;
  frameCount: number;
  ready: number;
  ballSpeed: number;
  ball: Ball;
  random: boolean;
  maxScore: number;
  winGiven: boolean;
}
