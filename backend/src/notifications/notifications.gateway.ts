import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../chat/guards/ws-jwt.guard';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'notifications' })
export default class NotificationsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Notification Client connected: ${client.id}`);
  }

  sendNotification(userId: string, data: any) {
    this.server.to(userId).emit('notification', data);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join')
  handleJoin(client: any) {
    const userId = client.user.userId;
    client.join(userId);
    return { status: 'joined', userId };
  }
}
