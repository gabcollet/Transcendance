import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

// Client send a message and server broadcast it
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('message') //event
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message); //send back to client the message received
  }
}
