import { useRef, useEffect } from 'react'
import { board, Player, Ball } from  './assets'
// import resizeCanvas from './sizeCanvas'
import { roomID, socket, pID } from '../../../Pages/PongRoom';
import { drawRectangle } from './draw';



/* socket.on('disconnect', function() {
    console.log('Disconnected');
}); */

const useCanvas = () => {
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const w = 800;
    const h = 600;

    //------------------------- Backend //-------------------------
    const P1_y = useRef<number>((h/2) - (h*.06));
    const P2_y = useRef<number>((h/2) - (h*.06));
    const ballx = useRef<number>(w/2);
    const bally = useRef<number>(h/2);
    const balldx = useRef<number>(0);
    const balldy = useRef<number>(0);
    const p1_score = useRef<number>(0);
    const p2_score = useRef<number>(0);
    const ready = useRef<boolean>(false);
    
    useEffect(() => {
        socket.on('msgToClient', (input: number[]) => {
            P1_y.current = input[0];
            P2_y.current = input[1];      
        });
        socket.on('ballposClient', (input: number[]) => {
            ballx.current = input[0];
            bally.current = input[1];
            balldx.current = input[2];
            balldy.current = input[3];
            p1_score.current = input[4];
            p2_score.current = input[5];
        });
    },[])
    
    //-------------------------
    
    useEffect(() => {
        canvasRef.current!.width = w;
        canvasRef.current!.height = h;
        
        const ctx : CanvasRenderingContext2D | null = canvasRef.current!.getContext('2d');
        let animationFrameId : number;
        
        socket.on('playerRdy', (input: number) => {
            if (input === 2){
                ready.current = true;
            }
            console.log(input);
            
        })
        
        //------------------------- Assets //-------------------------
        let p1 = new Player(w*0.02, P1_y.current, h*.1);
        let p2 = new Player(w - (w*0.03), P2_y.current, h*.1);
        let ball : Ball;
        if (Math.random() < 0.5){
            ball = new Ball(ballx.current, bally.current, w, -3);
        } else {
            ball = new Ball(ballx.current, bally.current, w, 3);
        }

        socket.emit('ballInfoServer', {
            x: ball.x, 
            y: ball.y,
            w: w,
            h: h, 
            dx: ball.dx, 
            p1_h: p1.height, 
            p2_h: p2.height,
            room: roomID
        });

        socket.emit('playerReady', {
            room: roomID,
            player: pID,
        });
        //-------------------------

        const render = () => {
            ctx!.clearRect(0,0,w,h);

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
            
            p1.move(h);
            p2.move(h);
            P1_y.current = p1.y;
            P2_y.current = p2.y;

            socket.emit('msgToServer', {
                room: roomID,
                pos1: P1_y.current, 
                pos2: P2_y.current,
            });
            
            socket.emit('ballposServer', {
                room: roomID,
                pos1: P1_y.current, 
                pos2: P2_y.current,
            });
            
            //requestAnimationFrame will call recursively the render method
            animationFrameId = window.requestAnimationFrame(render);
        }

        const waitScreen = () => {
            if (ctx){
                board(ctx, w, h, p1_score.current, p2_score.current);
                p1.draw(ctx, w, h, P1_y.current);
                p2.draw(ctx, w, h, P2_y.current);
                ctx.globalAlpha = 0.7;
                drawRectangle(ctx, {x:0, y:0}, w, h, 'black');
                ctx.globalAlpha = 1.0;
                ctx.font = "60px Times New Roman";
                ctx.fillStyle = 'white'
                ctx.fillText("Waiting for another Player", w/10 , h/2 + 15);
            }
        }
        
        const animationScreen = async () => {
            let text = "";
            const renderScreen = () => { 
                if (ctx){
                    ctx!.clearRect(0,0,w,h);
                    board(ctx, w, h, p1_score.current, p2_score.current);
                    p1.draw(ctx, w, h, P1_y.current);
                    p2.draw(ctx, w, h, P2_y.current);
                    ctx.globalAlpha = 0.7;
                    drawRectangle(ctx, {x:0, y:0}, w, h, 'black');
                    ctx.globalAlpha = 1.0;
                    ctx.font = "100px Times New Roman";
                    ctx.fillStyle = 'white'
                    ctx.fillText(text, w/2 - 20 , h/2 + 30);
                }
            }
            renderScreen();
            //ce code est affreux il doit y avoir une meilleur methode :'(
            const myPromise = new Promise(function(resolve) {
                text = "3";
                renderScreen();
                setTimeout(function(){
                    resolve("");}, 1000);
            })
            const myPromise2 = new Promise(async function(resolve) {
                await myPromise;
                text = "2"
                renderScreen();
                setTimeout(function(){
                    resolve("");}, 1000);
            })
            const myPromise3 = new Promise(async function(resolve) {
                await myPromise2;
                text = "1";
                renderScreen();
                setTimeout(function(){
                    resolve("");}, 1000);
            })
            await myPromise3;
        }

        document.addEventListener('keydown', (e) => {
            if (pID === 1){
                p1.isMoving = true;
                p1.keyPressed = e; 
            }
            else if (pID === 2) {
                p2.isMoving = true;
                p2.keyPressed = e;
            }
        })
       
        document.addEventListener('keyup', (e) => {
            if (pID === 1 && p1.isMoving){
                p1.isMoving = false;
            }
            else if (pID === 2 && p2.isMoving){
                p2.isMoving = false;
            }
        })
        
        // resizeCanvas(canvas);

        if (ready.current){
            const startGame = async () => {
                animationScreen().then(render)
            }
            startGame();
        }
        else {
            waitScreen();
        }

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return canvasRef;
}

export default useCanvas;