import { useRef, useEffect, useState } from "react";
import { board, Player, Ball } from "./assets";
import { socket } from "../../../Pages/PongRoom";
import { drawRectangle } from "./draw";

export let roomID: string;
export let pID: number;
let frameID: number = 0;

/* 
  Game Status :
  waiting:   0
  animation: 1
  render:    2
  endgame:   3
  */

const useCanvas = (username: string) => {
  const [room, setRoomID] = useState<string>("");
  const [pid, setpID] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const w = 800;
  const h = 600;
  const ballSpeed = 4;
  const isReady = useRef<boolean>(false);
  const P1_y = useRef<number>(h / 2 - h * 0.06);
  const P2_y = useRef<number>(h / 2 - h * 0.06);
  const ballx = useRef<number>(w / 2);
  const bally = useRef<number>(h / 2);
  const balldx = useRef<number>(ballSpeed);
  const balldy = useRef<number>(0);
  const p1_score = useRef<number>(0);
  const p2_score = useRef<number>(0);
  const maxScore = 5;
  const winner = useRef<number>(0);
  const [gameStatus, setGameStatus] = useState<number>(0);

  //------------------------- Backend //-------------------------
  useEffect(() => {
    socket.on("joinedRoom", ([room, pid]: [string, number]) => {
      pid = Number(pid);
      if (pid === 0 || pid === 1) {
        setpID(pid ? 1 : 2);
      } else if (pid === 2) {
        setpID(3);
      }
      setRoomID(room);
    });
  }, []);

  useEffect(() => {
    socket.on("playerPosClient", (input: number[]) => {
      if (input[1] === 1) {
        P1_y.current = input[0];
      } else {
        P2_y.current = input[0];
      }
    });
  }, []);
  useEffect(() => {
    socket.on("ballPosClient", (input: number[]) => {
      ballx.current = input[0];
      bally.current = input[1];
      balldx.current = input[2];
      balldy.current = input[3];
    });
  }, []);
  useEffect(() => {
    socket.on("scoreClient", (input: number[]) => {
      p1_score.current = input[0];
      p2_score.current = input[1];
    });
  }, []);
  useEffect(() => {
    socket.on("playerRdy", (input: number) => {
      input = Number(input);
      if (input === 2) {
        setGameStatus(1);
      } else {
        setGameStatus(0);
      }
    });
  }, []);
  //This handle when a client quit or refresh the page
  useEffect(() => {
    socket.on("leavedRoom", (input) => {
      winner.current = input === 1 ? 2 : 1;
      frameID = 0;
      setGameStatus(3);
    });
  }, []);
  //This handle when a client change location (aka go back one page)
  useEffect(() => {
    socket.on("leavedRoom2", (input) => {
      frameID = 0;
      winner.current = input === 1 ? 2 : 1;
      setGameStatus(3);
    });
  }, []);
  //-------------------------

  useEffect(() => {
    if (!room || !pid) {
      //This could return a loading screen
      return;
    }
    roomID = room;
    pID = pid;
    canvasRef.current!.width = w;
    canvasRef.current!.height = h;

    const ctx: CanvasRenderingContext2D | null =
      canvasRef.current!.getContext("2d");
    let animationFrameId: number;

    //------------------------- Assets //-------------------------
    let p1 = new Player(w * 0.02, P1_y.current, h * 0.1);
    let p2 = new Player(w - w * 0.03, P2_y.current, h * 0.1);
    const ball = new Ball(ballx.current, bally.current, w, ballSpeed);

    socket.emit("ballInfoServer", {
      w: w,
      h: h,
      p1_h: p1.height,
      p2_h: p2.height,
      roomID: roomID,
    });

    if (!isReady.current) {
      socket.emit("playerReady", {
        room: roomID,
        pID: pID,
        username: username
      });
    }
    isReady.current = true;
    //-------------------------l7

    const render = () => {
      ctx!.clearRect(0, 0, w, h);
      board(ctx!, w, h, p1_score.current, p2_score.current);
      p1.y = P1_y.current;
      p2.y = P2_y.current;
      p1.draw(ctx!, w, h, P1_y.current);
      p2.draw(ctx!, w, h, P2_y.current);

      ball.x = ballx.current;
      ball.y = bally.current;
      ball.dx = balldx.current;
      ball.dy = balldy.current;
      ball.draw(ctx!);

      if (pID === 1) {
        p1.move(h);
      } else {
        p2.move(h);
      }
      P1_y.current = p1.y;
      P2_y.current = p2.y;

      socket.emit("ballPosServer", {
        roomID: roomID,
        pos1: P1_y.current,
        pos2: P2_y.current,
        frameId: frameID,
      });

      //Finish the game
      if (p1_score.current === maxScore || p2_score.current === maxScore) {
        winner.current = p1_score.current === maxScore ? 1 : 2;
        setGameStatus(3);
      }

      //requestAnimationFrame will call recursively the render method
      animationFrameId = window.requestAnimationFrame(render);
      frameID++;
    };

    const renderScreen = (text: string, height: number, size: number) => {
      if (ctx) {
        ctx!.clearRect(0, 0, w, h);
        board(ctx, w, h, p1_score.current, p2_score.current);
        p1.draw(ctx, w, h, P1_y.current);
        p2.draw(ctx, w, h, P2_y.current);
        ctx.globalAlpha = 0.8;
        drawRectangle(ctx, { x: 0, y: 0 }, w, h, "black");
        ctx.globalAlpha = 1.0;
        ctx.font = `${size}px Times New Roman`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(text, w / 2, height);
        ctx.textAlign = "left";
      }
    };

    const waitScreen = () => {
      renderScreen("Waiting for another player", h / 2 + 10, 50);
    };

    const endScreen = (winner: number) => {
      renderScreen(`WINNER PLAYER ${winner}!!!`, h / 2 + 15, 60);
    };

    const animationScreen = async () => {
      renderScreen("", 0, 0);
      for (let i = 3; i > 0; i--) {
        const myPromise = new Promise(function (resolve) {
          renderScreen(i.toString(), h / 2 + 30, 100);
          setTimeout(function () {
            resolve("");
          }, 1000);
        });
        await myPromise;
      }
      setGameStatus(2);
    };

    document.addEventListener("keydown", (e) => {
      if (pID === 1) {
        p1.isMoving = true;
        p1.keyPressed = e;
      } else if (pID === 2) {
        p2.isMoving = true;
        p2.keyPressed = e;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (pID === 1 && p1.isMoving) {
        p1.isMoving = false;
      } else if (pID === 2 && p2.isMoving) {
        p2.isMoving = false;
      }
    });

    //Game Logic
    switch (gameStatus) {
      case 0:
        waitScreen();
        break;
      case 1:
        animationScreen();
        break;
      case 2:
        render();
        break;
      case 3:
        endScreen(winner.current);
        break;
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [gameStatus, room, pid]);

  return canvasRef;
};

export default useCanvas;
