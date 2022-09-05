import { useRef, useEffect, useState } from 'react'
import { board, Player, Ball } from  './assets'
import resizeCanvas from './sizeCanvas'
import io, { Socket } from 'socket.io-client'

const useCanvas = (options={}) => {
    //------------------------- Backend //-------------------------
    // const [socket, setSocket] = useState<Socket>();
    let P1_y: number;
    const socket = io("localhost:9006");
    
    // useEffect(() => {
    //     const newSocket = io("localhost:9006");
    //     setSocket(newSocket);
    // },[setSocket])
    
/*     const send = (value: number) => {
        socket?.emit("message", value);
    } */
    const messageListener = (input: number) => {
        console.log('App input :', input);
        P1_y = input;
    }
    
    useEffect(() => {
        socket?.on("message", messageListener);
        return () => {
            socket?.off("message", messageListener);
        }
    }, [messageListener])
    //-------------------------
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas : HTMLCanvasElement | null = canvasRef.current;
        const w = canvas!.width = 800;
        const h = canvas!.height = 600;
        const ctx : CanvasRenderingContext2D | null = canvas!.getContext('2d');
        let animationFrameId : number;
        let frameCount: number = 0;
        
        P1_y = (h/2) - (h*.06);
        let p1 = new Player(w*0.02, P1_y, h*.1);
        let p2 = new Player(w - (w*0.03), (h/2) - (h*.06), h*.1);
        let ball : Ball;
        if (Math.random() < 0.5){
            ball = new Ball(w/2, h/2, w, -4);
        } else {
            ball = new Ball(w/2, h/2, w, 4);
        }

        const render = () => {
            frameCount++;
            ctx!.clearRect(0,0,w,h);

            board(ctx!, w, h, p1.score, p2.score);
            p1.draw(ctx!, w, h, P1_y);
            // p2.draw(ctx!, w, h);
            // ball.draw(ctx!);
            
            // p1.move(h);
            // p2.move(h);
            // ball.update(w, h, p1, p2);

            if (frameCount % 300 == 0){
                ball.dx *= 1.2;
                ball.dy *= 1.2;
            }
            if (ball.x < 0 || ball.x > w){
                if (ball.x < 0) { p2.score++; }
                else if (ball.x > w) { p1.score++; }
                ball.retart(w, h);
                frameCount = 0;
            }
            
            //requestAnimationFrame will call recursively the render method
            animationFrameId = window.requestAnimationFrame(render);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown'){
                p2.isMoving = true;
                p2.keyPressed = e; 
            }
            if (e.key === 'q') {
                // p1.isMoving = true;
                // p1.keyPressed = e;
                p1.y -= 24;
            } else if (e.key === 'a'){
                p1.y += 24;
            }
            socket.emit('message', p1.y);
        })
       
        document.addEventListener('keyup', (e) => {
            if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && p2.isMoving){
                p2.isMoving = false;
            }
            else if ((e.key === 'q' || e.key === 'a') && p1.isMoving){
                p1.isMoving = false;
            }
        })
        
        resizeCanvas(canvas);
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return canvasRef;
}

export default useCanvas;