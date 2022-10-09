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

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: any): void {
    this.logger.debug(
      'Message from',
      payload.author,
      'Sent to room',
      payload.chatRoom,
    );
    this.chatService.addMessage(payload.chatRoom, payload.author, payload.msg);
    this.server.to(payload.chatRoom).emit('messageReceived', payload);
  }

  @SubscribeMessage('joinRoom')
  handleJoin(client: Socket, payload: any): void {
    //need to be secured
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
