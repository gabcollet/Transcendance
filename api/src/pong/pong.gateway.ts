import { Logger } from '@nestjs/common';
import {
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Room } from './pong.room';

@WebSocketGateway(6006, { cors: '*' })
export class PongGateway implements OnGatewayInit, OnGatewayDisconnect {
  private logger: Logger = new Logger('PongGateway');
  private roomiD: string = '';
  private isWaiting: boolean = false;
  private madeBySpectator: boolean = false;
  private id: Map<Socket, string> = new Map<Socket, string>();
  private rooms: [Room] = [null];

  //This is usefull to pass the payload to everyone
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Pong server initialized');
  }

  /*   handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  } */

  private createRoom(spectator: boolean): string {
    const { v4: uuidv4 } = require('uuid');
    //If the spectator create the game
    if (spectator){
      this.roomiD = uuidv4();
      this.madeBySpectator = true;
      return this.roomiD;
    // Else if it's a player who create it
    } else if (!this.isWaiting && !this.madeBySpectator) {
      this.roomiD = uuidv4();
    }
    this.madeBySpectator = false;
    this.isWaiting = !this.isWaiting;
    return this.roomiD;
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket) {
    const room = this.createRoom(false);
    client.join(room);
    if (this.id.has(client)) {
      const clientRoom = this.id.get(client);
      if (clientRoom == room) {
        this.logger.error(`${client.id} already in room ${room}`);
        return;
      }
    }
    this.logger.log(
      `${client.id} joined room ${room} as P${this.isWaiting ? 1 : 2}`,
    );
    this.id.set(client, room);
    client.emit('joinedRoom', [room, this.isWaiting]);
  }

  @SubscribeMessage('playerReady')
  handleReady(client: Socket, payload: {room: string; pID: number}) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i] && this.rooms[i].roomID == payload.room) {
        if (payload.pID === 3){
          client.emit('playerRdy', this.rooms[i].ready)
          return;
        }
        
        this.rooms[i].ready++;
        this.server.to(payload.room).emit('playerRdy', this.rooms[i].ready);
      }
    }
  }

  handleDisconnect(client: Socket) {
    const room = this.id.get(client);
    this.server.to(room).emit('leavedRoom');
    for (let [key, value] of this.id.entries()) {
      if (value === room) {
        key.leave(room);
        this.logger.warn(`${key.id} leaved room ${room}`);
        this.id.delete(key);
      }
    }
    if (this.roomiD === room && this.isWaiting) {
      this.isWaiting = false;
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, payload: { room: string; pID: number }) {
    this.server.to(payload.room).emit('leavedRoom2', payload.pID);
    for (let [key, value] of this.id.entries()) {
      if (value === payload.room) {
        key.leave(payload.room);
        this.logger.warn(`${key.id} leaved room ${payload.room}`);
        this.id.delete(key);
      }
    }
    if (this.roomiD === payload.room && this.isWaiting) {
      this.isWaiting = false;
    }
  }

  @SubscribeMessage('playerPosServer')
  handleMessage(
    client: Socket,
    payload: {
      room: string;
      pos: number;
      pID: number;
    },
  ) {
    this.server
      .to(payload.room)
      .emit('playerPosClient', [payload.pos, payload.pID]);
  }

  @SubscribeMessage('ballInfoServer')
  setBall(
    client: Socket,
    payload: {
      w: number;
      h: number;
      p1_h: number;
      p2_h: number;
      roomID: string;
    },
  ) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i] && this.rooms[i].roomID == payload.roomID) {
        return;
      }
    }
    this.rooms.push(
      new Room(
        payload.w,
        payload.h,
        payload.p1_h,
        payload.p2_h,
        payload.roomID,
      ),
    );
  }

  @SubscribeMessage('ballPosServer')
  handleBall(
    client: Socket,
    payload: {
      roomID: string;
      pos1: number;
      pos2: number;
      frameId: number;
    },
  ) {
    for (let i = 0; i < this.rooms.length; i++) {
      // console.log(this.ball[i] && this.ball[i].frameId == payload.frameId);

      if (
        this.rooms[i] &&
        this.rooms[i].roomID == payload.roomID &&
        this.rooms[i].ball.frameId == payload.frameId
      ) {
        const room = this.rooms[i];
        const ball = room.ball;
        room.frameCount++;
        //Update ball position
        ball.update(payload.pos1, payload.pos2);
        if (ball.x < 0 || ball.x > ball.w) {
          //Update player score
          if (ball.x < 0) {
            room.p2_score++;
          } else if (ball.x > ball.w) {
            room.p1_score++;
          }
          ball.restart();
          room.frameCount = 0;
          this.server
            .to(payload.roomID)
            .emit('scoreClient', [room.p1_score, room.p2_score]);
        }
        //Make the ball go fast!!
        if (room.frameCount % 300 === 0) {
          ball.dx *= 1.2;
          ball.dy *= 1.2;
        } else {
          this.server
            .to(payload.roomID)
            .emit('ballPosClient', [ball.x, ball.y, ball.dx, ball.dy]);
        }
      }
    }
  }
 
  @SubscribeMessage('spectate')
  handleSpectate(client: Socket) {
    let room = this.roomiD;
    if (!room){
      //ou si la game est terminer
      room = this.createRoom(true);
    }
    client.join(room);
    this.logger.verbose(
      `${client.id} joined room ${room} as Spectator`,
    );
    this.id.set(client, room);
    client.emit('joinedRoom', [room, 2]);
  }
}
