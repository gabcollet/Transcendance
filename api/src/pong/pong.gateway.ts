import { Logger } from '@nestjs/common';
import {
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PongService } from './pong.service';

@WebSocketGateway(6006, { cors: '*' })
export class PongGateway implements OnGatewayInit, OnGatewayDisconnect {
  constructor(private readonly pongService: PongService) {}
  private logger: Logger = new Logger('PongGateway');

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Pong gateway initialized');
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, [username, random]) {
    this.pongService.joinRoom(client, username, random);
  }

  @SubscribeMessage('playerReady')
  handleReady(
    client: Socket,
    payload: { room: string; pID: number; username: string },
  ) {
    this.pongService.playerReady(client, payload, this.server);
  }

  //This handle when a client quit or refresh the page
  handleDisconnect(client: Socket) {
    this.pongService.playerDisconnect(client, this.server);
  }
  //This handle when a client change location (aka go back one page)
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, payload: { room: string; pID: number }) {
    this.pongService.playerDisconnect(client, this.server);
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
    this.pongService.sendPlayerPos(payload, this.server);
  }

  @SubscribeMessage('infoRoom')
  handleInfoRoom(
    client: Socket,
    payload: {
      w: number;
      h: number;
      p1_h: number;
      p2_h: number;
      roomID: string;
      maxScore: number;
    },
  ) {
    this.pongService.setInfoRoom(payload);
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
    this.pongService.sendBallPos(payload, this.server);
  }

  @SubscribeMessage('spectate')
  handleSpectate(client: Socket, username: string) {
    this.pongService.joinSpectator(client, username);
  }

  @SubscribeMessage('gameEnd')
  handleEndGame(client: Socket) {
    this.pongService.endGame();
  }

  @SubscribeMessage('winner')
  handleWinner(client: Socket, [winner, roomID]) {
    this.pongService.addWinLost(client, winner, roomID);
  }
}
