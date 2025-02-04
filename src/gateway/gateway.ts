import { OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket): void {
        this.server.emit('room', client.id + ' joined!')
    }

    handleDisconnect(client: Socket): void {
        console.log('-----', client.id);
        this.server.emit('room', client.id + ' left!')
    }



    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() data: { auctionId: string }, @ConnectedSocket() client: Socket) {
        const { auctionId } = data;
        client.join(auctionId);
        this.server.to(auctionId).emit('userJoined', { message: `User joined auction ${auctionId}` });
    }

    // User places a bid
    @SubscribeMessage('placeBid')
    handlePlaceBid(@MessageBody() bidData: { auctionId: string, userId: string, amount: number }, @ConnectedSocket() client: Socket) {
        const { auctionId, userId, amount } = bidData;

        // Broadcast bid to the room
        this.server.to(auctionId).emit('newBid', { auctionId, userId, amount, timestamp: new Date() });
    }

    // User leaves the auction room
    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@MessageBody() data: { auctionId: string }, @ConnectedSocket() client: Socket) {
        const { auctionId } = data;
        client.leave(auctionId);
        this.server.to(auctionId).emit('userLeft', { message: `User left auction ${auctionId}` });
    }
}