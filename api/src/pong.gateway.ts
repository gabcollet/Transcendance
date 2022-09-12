import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Ball } from './pong.ball'

@WebSocketGateway(9006, {cors: '*'})
export class PongGateway implements OnGatewayInit/* , OnGatewayConnection, OnGatewayDisconnec */{
  
  private logger: Logger = new Logger('PongGateway');
  private roomiD: string = '';
  private isWaiting: boolean = false;
  private ball: [Ball] = [null]; //ca devrait etre un array de room contenant une ball a la place
  
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
    }) 
  {
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
      h: number, 
      dx: number, 
      p1_h: number, 
      p2_h: number,
      room: string
    }) 
  {
    for (let i = 0; i < this.ball.length; i++){
      if (this.ball[i] && this.ball[i].room == payload.room){
        return;
      }
    }
    this.ball.push(new Ball
      (payload.x,
       payload.y, 
       payload.w, 
       payload.dx, 
       payload.p1_h, 
       payload.p2_h, 
       payload.room, 
       payload.h));
  }
  
  @SubscribeMessage('ballposServer')
  handleBall(client: Socket, 
    payload: {
      room: string, 
      pos1: number,
      pos2: number,
    })  
  {
    for (let i = 0; i < this.ball.length; i++){
      if (this.ball[i] && this.ball[i].room == payload.room){
        const ball = this.ball[i];
        ball.frameCount++;
        ball.update(payload.pos1, payload.pos2);
        if (ball.x < 0 || ball.x > ball.w){
          if (ball.x < 0) { ball.p2_score++; }
          else if (ball.x > ball.w) { ball.p1_score++; }
          ball.retart();
          ball.frameCount = 0;
        }
        if (ball.frameCount % 300 === 0){
          ball.dx *= 1.2;
          ball.dy *= 1.2;
        }
        this.server.to(payload.room).emit('ballposClient', 
          [
            ball.x,
            ball.y,
            ball.dx,
            ball.dy,
            ball.p1_score,
            ball.p2_score
          ]);
      }
    }
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
    //remove the room 
  }
}
