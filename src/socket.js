import { Server } from 'socket.io';

let io;

export function init(httpServer) {
  io = new Server(httpServer);
  return io;
}

export function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}
