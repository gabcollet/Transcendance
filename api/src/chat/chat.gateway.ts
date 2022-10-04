import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

// Client send a message and server broadcast it
@WebSocketGateway(6005, { cors: '*:*' })
export class ChatGateway {
  logger: Logger = new Logger('ChatController');
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    //to change with type
    this.logger.log(payload);
    this.server.emit('message', payload);
  }

  @SubscribeMessage('joinRoom')
  handleJoin(client: Socket, payload: any): void {
    this.logger.debug(payload);
  }
}
