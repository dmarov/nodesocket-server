import { Socket } from "socket.io";

export class SocketHandler {
  constructor (
    private readonly socket: Socket,
  ) { }

  start() {
    console.log(this.socket);
  }
}
