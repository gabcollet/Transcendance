import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface send_ {
  user: string;
  msg: string;
  id: number;
}

interface room_ {
  id?: number;
  roomPassword?: string; //hashed ??? check /w max
  roomName?: string;
  userName: string; // probly need to change that to auth key or smth
}

// chatroom DB info
// id: number
// protected: boolean
// roomPassword: string
// roomName: string
// roomOwner: string
// members: string[] //pas certain de ca, p-e que le user id serait mieux pour ca
// visibility: boolean //private ou public
// messages: string[] //encore une fois pas certain, je peux cross check avec un autre db pour ca et avoir une covo

// Client send a message and server broadcast it
@WebSocketGateway(6005, { cors: '*:*' })
export class ChatGateway {
  logger: Logger = new Logger('ChatGateway');
  send: send_ = {
    user: '',
    msg: '',
    id: 0,
  };
  @WebSocketServer()
  server: Server;
  afterInit(server: Server) {
    this.logger.log('Chat server Init');
  }

  @SubscribeMessage('joinRoom')
  handleJoin(client: Socket, payload: room_) {
    this.server.emit('joinRoom', 'Room Joined');
  }

  @SubscribeMessage('createRoom') //p-e faire ca dans un controller avec une http request
  handleCreate(client: Socket, payload: room_) {}

  @SubscribeMessage('leaveRoom')
  handleLeave(cliant: Socket, payload: room_) {}

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: send_): void {
    this.logger.debug(payload.msg);
    this.server.emit('message', payload.msg);
  }
}
