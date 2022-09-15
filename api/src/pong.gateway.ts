import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Room } from './pong.room';


@WebSocketGateway(9006, {cors: '*'})
export class PongGateway implements OnGatewayInit{

  private logger: Logger = new Logger('PongGateway');
  private roomiD: string = '';
  private isWaiting: boolean = false;
  private rooms: [Room] = [null];
  
  //This is usefull to pass the payload to everyone
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Pong server initialized');
  }
  
/*   handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  } */

/*   handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  } */

  @SubscribeMessage('playerPosServer')
  handleMessage(client: Socket, 
    payload: {
      room: string, 
      pos: number, 
      pID: number,
    }) 
  {
    this.server.to(payload.room).emit('playerPosClient', 
      [
        payload.pos, 
        payload.pID,
      ]);
  }

  @SubscribeMessage('ballInfoServer')
  setBall(client: Socket, 
    payload: {
      w: number,
      h: number, 
      p1_h: number, 
      p2_h: number,
      roomID: string
    }) 
  {
    for (let i = 0; i < this.rooms.length; i++){
      if (this.rooms[i] && this.rooms[i].roomID == payload.roomID){
        return;
      }
    }
    this.rooms.push(new Room
      (payload.w,
        payload.h,
        payload.p1_h,
        payload.p2_h,
        payload.roomID
    ));
  }
  
  @SubscribeMessage('ballPosServer')
  handleBall(client: Socket, 
    payload: {
      roomID: string, 
      pos1: number,
      pos2: number,
      frameId: number
    })  
  {
    for (let i = 0; i < this.rooms.length; i++){
      
      // console.log(this.ball[i] && this.ball[i].frameId == payload.frameId);
      
      if (this.rooms[i] && this.rooms[i].roomID == payload.roomID && this.rooms[i].ball.frameId == payload.frameId){ 
        const room = this.rooms[i];
        const ball = room.ball;
        room.frameCount++;
        //Update ball position
        ball.update(payload.pos1, payload.pos2);
        if (ball.x < 0 || ball.x > ball.w){
          //Update player score
          if (ball.x < 0) { room.p2_score++; }
          else if (ball.x > ball.w) { room.p1_score++; }
          ball.restart();
          room.frameCount = 0;
          this.server.to(payload.roomID).emit('scoreClient', 
          [
            room.p1_score,
            room.p2_score,
          ]);
        }
        //Make the ball go fast!!
        if (room.frameCount % 300 === 0){
          ball.dx *= 1.2;
          ball.dy *= 1.2;
        }
        else {
          this.server.to(payload.roomID).emit('ballPosClient', 
          [
            ball.x,
            ball.y,
            ball.dx,
            ball.dy,
          ]);
        }
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
  
  @SubscribeMessage('playerReady')
  handleReady(client: Socket, room: string) 
  {
    for (let i = 0; i < this.rooms.length; i++){
      if (this.rooms[i] && this.rooms[i].roomID == room){
        this.rooms[i].ready++;
        this.server.to(room).emit('playerRdy', this.rooms[i].ready);
      }
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, payload: {room: string, pID: number}) {
    this.logger.warn(`${client.id} leaved room ${payload.room}`);
    for (let i = 0; i < this.rooms.length; i++){
      if (this.rooms[i] && this.rooms[i].roomID == payload.room){
        this.rooms[i].ready--;
        this.server.to(payload.room).emit('leavedRoom', payload.pID);
      }
//!Removing the room from the array cause problems
      // this.rooms.splice(i, 1);
    }
    client.leave(payload.room);
  }
}
