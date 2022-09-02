import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway(9006, {cors:'*'})
export class PongGateway {

  @WebSocketServer()
  server: Server;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() input: number): void {
    // console.log('api input :', input);
    this.server.emit('message', input);
  }
}
