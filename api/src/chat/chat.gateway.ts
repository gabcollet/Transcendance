import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { OneToMany } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { throws } from 'assert';

// Client send a message and server broadcast it
@WebSocketGateway(6005, { cors: '*:*' })
export class ChatGateway {
  constructor(private chatService: ChatService) {}
  private logger: Logger = new Logger('ChatController');
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: any) {
    this.logger.log(
      'Message from',
      payload.author,
      'Sent to room',
      payload.chatRoom,
    );
    const user = await this.chatService.getUser(payload.author);
    if (!user) return;
    const allowed = await this.chatService.checkRestriction(
      user.id,
      payload.chatRoom,
      'both',
    );
    if (allowed === true) return;
    this.chatService.addMessage(payload.chatRoom, payload.author, payload.msg);
    const newPayload = {
      msg: payload.msg,
      chatRoom: payload.chatRoom,
      author: payload.author,
      displayname: user.displayname,
    };
    this.server.to(payload.chatRoom).emit('messageReceived', newPayload);
  }

  @SubscribeMessage('alarm-channel')
  handleAlarmCh(client: Socket, payload: any) {
    this.logger.log('alarm-chanel', payload);
    if (!payload) return false;
    // this.server.to(Number(payload)).emit('alarm-channel');
    this.server.emit('alarm-all');
  }

  @SubscribeMessage('alarm-all')
  handleAlarmAll(client: Socket) {
    this.logger.debug('alarm-all');
    this.server.emit('alarm-all');
  }

  @SubscribeMessage('joinRoom')
  handleJoin(client: Socket, payload: any): void {
    //need to be secured
    this.logger.log('USER JOINED ROOM :', payload.chatRoom);
    client.join(payload.chatRoom);
    this.server.to(payload.chatRoom).emit('joined', payload.chatRoom);
  }
  @SubscribeMessage('leaveRoom')
  handleLeave(client: Socket, payload: any): void {
    this.logger.debug(
      'USER :' + payload.user + ' LEFT ROOM : ',
      payload.chatRoom,
    );
    this.server.to(payload.chatRoom).emit('leaved', payload.chatRoom);
    client.leave(payload.chatRoom);
  }
}
