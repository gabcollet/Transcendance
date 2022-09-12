import { useRef, useEffect } from 'react'
import { board, Player, Ball } from  './assets'
// import resizeCanvas from './sizeCanvas'
import { roomID, socket, pID } from '../../../Pages/PongRoom';



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
    
    useEffect(() => {
        socket.on('msgToClient', (input: number[]) => {
            P1_y.current = input[0];
            P2_y.current = input[1]; 
            /* ballx.current = input[2];
            bally.current = input[3];  */       
        });
    },[])
   
    useEffect(() => {
        socket.on('ballposClient', (input: number[]) => {
            ballx.current = input[0];
            bally.current = input[1];     
        });
    },[])
    //-------------------------
    
    useEffect(() => {
        canvasRef.current!.width = w;
        canvasRef.current!.height = h;
        
        const ctx : CanvasRenderingContext2D | null = canvasRef.current!.getContext('2d');
        let animationFrameId : number;
        let frameCount: number = 0;
        
        //------------------------- Assets //-------------------------
        let p1 = new Player(w*0.02, P1_y.current, h*.1);
        let p2 = new Player(w - (w*0.03), P2_y.current, h*.1);
        let ball : Ball;
        if (Math.random() < 0.5){
            ball = new Ball(ballx.current, bally.current, w, -4);
        } else {
            ball = new Ball(ballx.current, bally.current, w, 4);
        }
        
        socket.emit('ballInfoServer', {
            x: ball.x, 
            y: ball.y,
            w: w, 
            dx: ball.dx, 
            p1_h: p1.height, 
            p2_h: p2.height,
            room: roomID
        });
        console.log("test");
        
        //-------------------------


        const render = () => {
            frameCount++;
            ctx!.clearRect(0,0,w,h);

            board(ctx!, w, h, p1.score, p2.score, roomID);
            p1.y = P1_y.current;
            p2.y = P2_y.current;
            p1.draw(ctx!, w, h, P1_y.current);
            p2.draw(ctx!, w, h, P2_y.current);
            
            ball.x = ballx.current;
            ball.y = bally.current;
            ball.draw(ctx!);
            
            if (pID === 1){
                p1.move(h);
                P1_y.current = p1.y;
            }
            else if (pID === 2){
                p2.move(h);
                P2_y.current = p2.y;
            }

            ball.update(w, h, p1, p2);
            ballx.current = ball.x;
            bally.current = ball.y;

            if (frameCount % 300 === 0){
                ball.dx *= 1.2;
                ball.dy *= 1.2;
            }

            if (ball.x < 0 || ball.x > w){
                if (ball.x < 0) { p2.score++; }
                else if (ball.x > w) { p1.score++; }
                ball.retart(w, h);
                ballx.current = ball.x;
                bally.current = ball.y;
                frameCount = 0;
            }
            
            socket.emit('msgToServer', {
                room: roomID,
                pos1: P1_y.current, 
                pos2: P2_y.current,
            });
            
            socket.emit('ballposServer', {
                room: roomID,
                ballx: ballx.current,
                bally: bally.current,
            });
            
            //requestAnimationFrame will call recursively the render method
            animationFrameId = window.requestAnimationFrame(render);
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

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return canvasRef;
}

export default useCanvas;