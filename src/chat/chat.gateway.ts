import { Server, Socket } from 'socket.io';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string; message: string }) {
    this.wss.emit('chatToClient', message);
  }
}
