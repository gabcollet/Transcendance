import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatService } from './chat.service';

// Client send a message and server broadcast it
@WebSocketGateway(6005, { cors: '*:*' })
export class ChatGateway {
  constructor(private chatService: ChatService) {}
  private logger: Logger = new Logger('ChatController');
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.logger.debug('RECEIVED MESSAGE FROM : ');
    this.logger.debug(payload.user);
    this.logger.debug('FOR ROOM : ', payload.chatRoom);
    this.logger.debug(payload);
    this.server.to(payload.chatRoom).emit('message', payload);
  }

  @SubscribeMessage('joinRoom')
  handleJoin(client: Socket, payload: any): void {
    this.logger.log('USER JOINED ROOM :', payload.chatRoom);
    client.join(payload.chatRoom);
    client.emit('joined', payload.chatRoom);
  }

  @SubscribeMessage('leaveRoom')
  handleLeave(client: Socket, payload: any): void {
    this.logger.debug(
      'USER :' + payload.user + ' LEFT ROOM : ',
      payload.chatRoom,
    );
    client.leave(payload.chatRoom);
    this.server.emit('disconnected', 'Channel left');
  }
}
