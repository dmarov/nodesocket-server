import { Socket } from "socket.io";

export interface SocketHandler {
  start(socket: Socket): void;
}
