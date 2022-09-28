import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Room } from './pong.room';
import { Server } from 'socket.io';
import { Ball } from './pong.ball';
import { PrismaService } from '../prisma/prisma.service';
import { log } from 'console';

@Injectable()
export class PongService {
  private logger: Logger = new Logger('PongService');
  private gameEnd: boolean = false;
  private roomiD: string = '';
  private madeBySpectator: boolean = false;
  private isWaiting: boolean = false;
  private randomRoom: boolean = false;
  private m_room: Map<Socket, string> = new Map<Socket, string>();
  private m_pid: Map<Socket, number> = new Map<Socket, number>();
  private m_roomUser: Map<string, string> = new Map<string, string>();
  private rooms: [Room] = [null];

  constructor(
    private prisma: PrismaService,
  ) {}

  createRoom(spectator: boolean): string {
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

  joining(client: Socket, room: string, username: string, pID: number) {
    client.join(room);
    //Check if username already in room
    if (this.m_roomUser.has(room)) {
      const clientRoom = this.m_roomUser.get(room);
      if (clientRoom == username) {
        this.logger.error(`${username} already in room ${room}`);
        client.emit('roomInfo', ['You can\'t play against yourself 😢', null, null, null]);
        return;
      }
    }
    this.m_room.set(client, room);
    this.m_pid.set(client, pID);
    this.m_roomUser.set(room, username);
    if (pID !== 3) {
      this.logger.log(`${username} joined room ${room} as P${pID}`);
    } else {
      this.logger.log(`${username} joined room ${room} as Spectator`);
    }
    client.emit('joinedRoom', [room, pID]);
    client.emit('roomInfo', [room, pID, username, null]);
  }

  joinRoom(client: Socket, username: string, random: boolean) {
    this.randomRoom = random;
    const room = this.createRoom(false);
    this.joining(client, room, username, this.isWaiting ? 1 : 2);
    this.toggleGameStatus(client, "in game");
  }

  joinSpectator(client: Socket, username: string) {
    let room = this.roomiD;
    if (!room || this.gameEnd) {
      room = this.createRoom(true);
    }
    this.joining(client, room, username, 3);
    this.toggleGameStatus(client, "spectating");
  }

  playerReady(
    client: Socket,
    payload: { room: string; pID: number; username: string },
    server: Server,
  ) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i] && this.rooms[i].roomID == payload.room) {
        const room = this.rooms[i];
        if (payload.pID === 3) {
          client.emit('playerRdy', room.ready);
          return;
        } else if (payload.pID === 1) {
          room.p1_name = payload.username;
        } else {
          room.p2_name = payload.username;
        }
        room.ready++;
        server.to(payload.room).emit('playerRdy', room.ready);
        server
          .to(payload.room)
          .emit('roomInfo', [
            room.roomID,
            payload.pID,
            room.p1_name,
            room.p2_name,
          ]);
      }
    }
  }

  leavingRoom(client: Socket, room: string) {
    client.leave(room);
    const username = this.m_roomUser.get(room);
    const pid = this.m_pid.get(client);
    if (pid === 1 || pid === 2){
      this.logger.warn(`${username} leaved room ${room} as P${pid}`);
    } else if (pid === 3) {
      this.logger.warn(`${username} leaved room ${room} as Spectator`);
    }
    this.m_room.delete(client);
    this.m_pid.delete(client);
    this.m_roomUser.delete(room);
  }

  playerDisconnect(client: Socket, server: Server, status: string) {
    const room = this.m_room.get(client);
    const pid = this.m_pid.get(client);
    this.toggleGameStatus(client, status);
    if (pid === 3) {
      this.leavingRoom(client, room);
      return;
    }
    server.to(room).emit('leavedRoom', pid);
    for (let [key, value] of this.m_room.entries()) {
      if (value === room) {
        this.leavingRoom(key, room);
      }
    }
    if (this.roomiD === room && this.isWaiting) {
      this.isWaiting = false;
    }
  }

  setInfoRoom(payload: {
    w: number;
    h: number;
    p1_h: number;
    p2_h: number;
    roomID: string;
    maxScore: number;
  }) {
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
        payload.maxScore
      ),
    );
    this.randomRoom = false;
  }

  sendPlayerPos(
    payload: {
      room: string;
      pos: number;
      pID: number;
    },
    server: Server,
  ) {
    server.to(payload.room).emit('playerPosClient', [payload.pos, payload.pID]);
  }

  ballRandomness(ball: Ball) {
    const rand = Math.random();
    const rand2 = Math.random();

    if (Math.random() < 0.5) {
      ball.dx *= rand; //slowdown
      ball.dy = rand2 * 10; //go up
    } else {
      ball.dx *= 1 + rand; //faster
      ball.dy = -(rand2 * 10); //go down
    }
    if (Math.random() < 0.1) {
      ball.dx *= -1; //switch side
    }
    if (ball.dx < 1 && ball.dx > 0) {
      //if too slow go faster
      ball.dx += 4;
    } else if (ball.dx > -1 && ball.dx < 0) {
      ball.dx -= 4;
    }
  }

  sendBallPos(
    payload: {
      roomID: string;
      pos1: number;
      pos2: number;
      frameId: number;
    },
    server: Server,
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
        ball.update(payload.pos1, payload.pos2);
        if (ball.x < 0 || ball.x > ball.w) {
          if (ball.x < 0) {
            room.p2_score++;
          } else if (ball.x > ball.w) {
            room.p1_score++;
          }
          ball.restart();
          room.frameCount = 0;
          server
            .to(payload.roomID)
            .emit('scoreClient', [room.p1_score, room.p2_score]);
        }
        if (room.random && room.frameCount % 50 === 0) {
          this.ballRandomness(ball);
        }
        //Make the ball go fast!!
        else if (room.frameCount % 300 === 0) {
          ball.dx *= 1.2;
          ball.dy *= 1.2;
        }
        server
          .to(payload.roomID)
          .emit('ballPosClient', [ball.x, ball.y, ball.dx, ball.dy]);
      }
    }
  }

  endGame() {
    this.gameEnd = true;
  }

  addWinLost(client: Socket, winner: number, roomID: string) {
    // this.logger.debug("in addWinLost")
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i] && this.rooms[i].roomID == roomID) {
        this.logger.debug("found room")
        const room = this.rooms[i];
        if (winner === 1) {
          this.addWin(room.p1_name);
          this.addLost(room.p2_name);
        } else if (winner === 2) {
          this.addWin(room.p2_name);
          this.addLost(room.p1_name);
        }
      }
    }
  }

  async addWin(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username
      }
    })
    await this.prisma.user.update({
      where: {
        username: username
      },
      data: {
        wins: user.wins + 1
      }
    })
    this.logger.verbose(`${username} now have ${user.wins + 1} wins. GG!`)
  }
  
  async addLost(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username
      }
    })
    await this.prisma.user.update({
      where: {
        username: username
      },
      data: {
        losses: user.losses + 1
      }
    })
    this.logger.verbose(`${username} now have ${user.losses + 1} losses. Sorry...`)
  }

  async toggleGameStatus(client: Socket, status: string) {
    const roomID = this.m_room.get(client);
    const username = this.m_roomUser.get(roomID);
    if (username) {
      await this.prisma.user.update({
        where: {
          username: username
        },
        data: {
          status: status
        }
      })
    }
    this.logger.verbose(`${username} is now ${status}.`)
  }
}