import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import uuidv4 from 'uuid';

@WebSocketGateway(9006, {cors: '*'})
export class PongGateway implements OnGatewayInit/* , OnGatewayConnection, OnGatewayDisconnec */{

  private logger: Logger = new Logger('PongGateway');

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
  
  roomiD: string = '';
  isWaiting = false;
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
  }
}
