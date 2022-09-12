import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import uuidv4 from 'uuid';

class Ball{
  constructor(x: number, y: number, w: number, dx: number, p1_h: number, p2_h: number, room: string){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = 0;
    this.ballRadius = (w*.015)/2;
    this.p1_height = p1_h;
    this.p2_height = p2_h;
    this.room = room;
  }
  x: number;
  y: number;
  dx: number;
  dy: number;
  ballRadius: number;
  p1_height: number;
  p2_height: number;
  room: string;

  update = (w: number, h: number, p1_y: number, p2_y: number) => {
    this.x += this.dx;
    this.y += this.dy;

    //make the ball bounce on top and bottom
    if (this.y + this.ballRadius > h || this.y - this.ballRadius < 0){
        this.dy *= -1;
    }
    //make the ball bounce on left paddle      
    if (this.x - this.ballRadius < w * .025 ){
        if (this.y + this.ballRadius > p1_y && this.y - this.ballRadius < p1_y + this.p1_height){
            this.dx *= -1;
            this.dy = (this.y - this.ballRadius - (p1_y + this.p1_height/2)) / 10;
          }
        } 
    //make the ball bounce on right paddle
    else if (this.x + this.ballRadius > w - (w * .03) ){
      if (this.y + this.ballRadius > p2_y && this.y - this.ballRadius < p2_y + this.p2_height){
        this.dx *= -1;
        this.dy = (this.y - this.ballRadius - (p2_y + this.p2_height/2)) / 10;
      }
    }
  }
}

@WebSocketGateway(9006, {cors: '*'})
export class PongGateway implements OnGatewayInit/* , OnGatewayConnection, OnGatewayDisconnec */{
  
  private logger: Logger = new Logger('PongGateway');
  private roomiD: string = '';
  private isWaiting: boolean = false;
  private ball: [Ball] = [null];
  
  //This is usefull to pass the payload to everyone
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Pong server initialized');
  }
  
  /* handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  } */

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, 
    payload: {
      room: string, 
      pos1: number, 
      pos2: number,
    }) {
    this.server.to(payload.room).emit('msgToClient', 
      [
        payload.pos1, 
        payload.pos2,
      ]);
  }

  @SubscribeMessage('ballInfoServer')
  setBall(client: Socket, 
    payload: {
      x: number, 
      y: number,
      w: number, 
      dx: number, 
      p1_h: number, 
      p2_h: number,
      room: string
    }) {
    for (let i = 0; i < this.ball.length; i++){
      console.log("ball");
      if (this.ball[i] && this.ball[i].room == payload.room){
        // console.log("ball already there");
        return;
      }
    }
    this.ball.push(new Ball(payload.x, payload.y, payload.w, payload.dx, payload.p1_h, payload.p2_h, payload.room));
    // console.log("ball added");
  }
  
  @SubscribeMessage('ballposServer')
  handleBall(client: Socket, 
    payload: {
      room: string, 
      ballx: number,
      bally: number
    })  {
    this.server.to(payload.room).emit('ballposClient', 
      [
        payload.ballx,
        payload.bally
      ]);
  }
  
  private createRoom(): string {
    const { v4: uuidv4 } = require('uuid');

    if (!this.isWaiting){
      this.roomiD = uuidv4();
    }
    this.isWaiting = !this.isWaiting;
    return this.roomiD;
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket) {
    const room = this.createRoom();
    client.join(room);    
    this.logger.log(`${client.id} joined room ${room}`);
    client.emit('joinedRoom', [room, this.isWaiting]);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leaveRoom', room);
    //remove the ball
  }
}
