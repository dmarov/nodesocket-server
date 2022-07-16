import { Socket } from "socket.io";
import { ClientMessageTypes } from "./client-message-types";

export class SocketHandler {
  private readonly onDisconnect = () => {
    console.log("client disconnected");
  };

  private readonly onAddMessage = () => {
    console.log("client requested add message");
  };

  constructor(
    private readonly socket: Socket,
  ) { }

  start() {
    this.socket.on(ClientMessageTypes.Disconnect, this.onDisconnect);
    this.socket.on(ClientMessageTypes.AddMessage, this.onAddMessage);
  }
}
