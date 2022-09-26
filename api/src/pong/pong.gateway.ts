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
  private randomRoom: boolean = false;
  //Map client: room
  private m_room: Map<Socket, string> = new Map<Socket, string>();
  //Map client: pid
  private m_pid: Map<Socket, number> = new Map<Socket, number>();
  private rooms: [Room] = [null];
  private gameEnd: boolean = false;

  //This is usefull to pass the payload to everyone
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Pong server initialized');
  }

  private createRoom(spectator: boolean): string {
    const { v4: uuidv4 } = require('uuid');
    this.gameEnd = false;
    //If the spectator create the game
    if (spectator) {
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
    this.randomRoom = false;
    const room = this.createRoom(false);
    client.join(room);
    if (this.m_room.has(client)) {
      const clientRoom = this.m_room.get(client);
      if (clientRoom == room) {
        this.logger.error(`${client.id} already in room ${room}`);
        return;
      }
    }
    this.logger.log(
      `${client.id} joined room ${room} as P${this.isWaiting ? 1 : 2}`,
    );
    this.m_room.set(client, room);
    this.m_pid.set(client, this.isWaiting ? 1 : 2);
    client.emit('joinedRoom', [room, this.isWaiting]);
  }

  @SubscribeMessage('playerReady')
  handleReady(client: Socket, payload: { room: string; pID: number }) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i] && this.rooms[i].roomID == payload.room) {
        if (payload.pID === 3) {
          client.emit('playerRdy', this.rooms[i].ready);
          return;
        }
        this.rooms[i].ready++;
        this.server.to(payload.room).emit('playerRdy', this.rooms[i].ready);
      }
    }
  }

  private leavingRoom(client: Socket, room: string) {
    client.leave(room);
    this.logger.warn(`${client.id} leaved room ${room}`);
    this.m_room.delete(client);
    this.m_pid.delete(client);
  }

  //This handle when a client quit or refresh the page
  handleDisconnect(client: Socket) {
    const room = this.m_room.get(client);
    const pid = this.m_pid.get(client);

    if (pid === 3) {
      this.leavingRoom(client, room);
      return;
    }
    this.server.to(room).emit('leavedRoom', pid);
    for (let [key, value] of this.m_room.entries()) {
      if (value === room) {
        this.leavingRoom(key, room);
      }
    }
    if (this.roomiD === room && this.isWaiting) {
      this.isWaiting = false;
    }
  }
  //This handle when a client change location (aka go back one page)
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, payload: { room: string; pID: number }) {
    //if a spectator quit
    if (payload.pID === 3) {
      this.leavingRoom(client, payload.room);
      return;
    }
    this.server.to(payload.room).emit('leavedRoom2', payload.pID);
    for (let [key, value] of this.m_room.entries()) {
      if (value === payload.room) {
        this.leavingRoom(key, payload.room);
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
        this.randomRoom,
      ),
    );
    this.randomRoom = false;
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
        //For random room
        if (room.random && room.frameCount % 50 === 0) {
          const rand = Math.random();
          const rand2 = Math.random();
          
          if (Math.random() < 0.5) {
            ball.dx *= rand;            //slowdown
            ball.dy = rand2 * 10;       //go up 
          } else {
            ball.dx *= 1 + rand;        //faster
            ball.dy = -(rand2 * 10);    //go down
          }
          if (Math.random() < 0.1) {
            ball.dx *= -1;              //switch side
          }
          if (ball.dx < 1 && ball.dx > 0){ //if too slow go faster
            ball.dx += 4;               
          } else if (ball.dx > -1 && ball.dx < 0) {
            ball.dx -= 4;
          }
        }
        //Make the ball go fast!!
        else if (room.frameCount % 300 === 0) {
          ball.dx *= 1.2;
          ball.dy *= 1.2;
        }
        this.server
          .to(payload.roomID)
          .emit('ballPosClient', [ball.x, ball.y, ball.dx, ball.dy]);
      }
    }
  }

  @SubscribeMessage('spectate')
  handleSpectate(client: Socket) {
    let room = this.roomiD;
    if (!room || this.gameEnd) {
      room = this.createRoom(true);
    }
    client.join(room);
    this.logger.verbose(`${client.id} joined room ${room} as Spectator`);
    this.m_room.set(client, room);
    this.m_pid.set(client, 3);
    client.emit('joinedRoom', [room, 2]);
  }

  @SubscribeMessage('gameEnd')
  handleEndGame(client: Socket) {
    this.gameEnd = true;
  }

  @SubscribeMessage('randomRoom')
  handleRandom(client: Socket) {
    this.randomRoom = true;
    const room = this.createRoom(false);
    client.join(room);
    if (this.m_room.has(client)) {
      const clientRoom = this.m_room.get(client);
      if (clientRoom == room) {
        this.logger.error(`${client.id} already in room ${room}`);
        return;
      }
    }
    this.logger.log(
      `${client.id} joined room ${room} as P${this.isWaiting ? 1 : 2}`,
    );
    this.m_room.set(client, room);
    this.m_pid.set(client, this.isWaiting ? 1 : 2);
    client.emit('joinedRoom', [room, this.isWaiting]);
  }
}
