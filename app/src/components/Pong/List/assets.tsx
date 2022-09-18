import { drawRectangle, drawLine } from "./draw";
import { socket, pID, roomID } from "../../../Pages/PongRoom";

const board = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scoreP1: number,
  scoreP2: number
) => {
  drawRectangle(ctx, { x: 0, y: 0 }, w, h, "black");
  ctx.setLineDash([10, 10]);
  drawLine(ctx, { x: w / 2, y: 0 }, { x: w / 2, y: h }, "white", 4);
  ctx.font = "100px Times New Roman";
  ctx.fillStyle = "white";
  if (scoreP1 < 10) {
    ctx.fillText(scoreP1.toString(), w / 2 - 100, h / 6);
  } else {
    ctx.fillText(scoreP1.toString(), w / 2 - 150, h / 6);
  }
  ctx.fillText(scoreP2.toString(), w / 2 + 50, h / 6);
};

class Player {
  constructor(x: number, y: number, h: number) {
    this.y = y;
    this.x = x;
    this.isMoving = false;
    this.keyPressed = new KeyboardEvent("keydown");
    this.height = h;
  }
  y: number;
  x: number;
  isMoving: boolean;
  keyPressed: KeyboardEvent;
  height: number;

  draw = (ctx: CanvasRenderingContext2D, w: number, h: number, y: number) => {
    drawRectangle(ctx, { x: this.x, y: y }, w * 0.01, this.height, "white");
  };

  move = (h: number) => {
    if (this.isMoving) {
      if (
        (this.keyPressed.key === "ArrowUp" || this.keyPressed.key === "q") &&
        this.y > 0
      ) {
        this.y -= 14;
      } else if (
        (this.keyPressed.key === "ArrowDown" || this.keyPressed.key === "a") &&
        this.y + this.height < h
      ) {
        this.y += 14;
      }
      socket.emit("playerPosServer", {
        room: roomID,
        pos: this.y,
        pID: pID,
      });
    }
  };
}

class Ball {
  constructor(x: number, y: number, w: number, dx: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = 0;
    this.ballRadius = (w * 0.015) / 2;
  }
  x: number;
  y: number;
  dx: number;
  dy: number;
  ballRadius: number;

  draw = (ctx: CanvasRenderingContext2D) => {
    drawRectangle(
      ctx,
      { x: this.x - this.ballRadius, y: this.y - this.ballRadius },
      this.ballRadius * 2,
      this.ballRadius * 2,
      "white"
    );
  };
}

export { board, Player, Ball };
