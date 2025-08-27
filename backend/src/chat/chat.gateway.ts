import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }, // allow your frontend URL
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // Map of userId -> socket.id
  private users: Record<string, string> = {};

  /** WebSocket server initialized */
  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  /** New client connected */
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  /** Client disconnected */
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Remove user from mapping
    for (const userId in this.users) {
      if (this.users[userId] === client.id) {
        delete this.users[userId];
        console.log(`User ${userId} removed from active users`);
        break;
      }
    }
  }

  /** User joins with their ID */
  @SubscribeMessage('join')
  handleJoin(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    this.users[userId] = client.id;
    console.log(`User ${userId} joined with socket ${client.id}`);
  }

  /** Handle sending message to a specific user */
  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() msg: any, @ConnectedSocket() client: Socket) {
    const receiverSocketId = this.users[msg.receiverId];

    if (receiverSocketId) {
      // Send message to receiver
      this.server.to(receiverSocketId).emit('receiveMessage', msg);

      // Optional: also send back to sender (confirmation)
      this.server.to(client.id).emit('receiveMessage', msg);

      console.log('Message received at backend:', msg); // backend log
      console.log(`Message sent to user ${msg.receiverId}`);
    } else {
      console.log(`User ${msg.receiverId} is not connected`);
      // Optional: notify sender that receiver is offline
      this.server.to(client.id).emit('receiveMessage', {
        senderId: 'system',
        receiverId: msg.senderId,
        text: 'User is offline',
        time: new Date().toLocaleTimeString(),
      });
    }
  }
}
