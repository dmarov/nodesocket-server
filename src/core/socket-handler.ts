import { inject, injectable } from "inversify";
import { Socket } from "socket.io";
import { TYPES } from "../types";
import { IRamDb } from "./db/ram-db";
import { ClientMessageTypes } from "./shared-models/client-message-types";

export interface ISocketHandler {

  start(socket: Socket): void;
}

@injectable()
export class SocketHandler implements ISocketHandler {
  private readonly onDisconnect = () => {
    console.log("client disconnected");
  };

  private readonly onAddMessage = (payload: string) => {
    console.log(payload);
    this.ramDb.add("messages", []);
  };

  @inject(TYPES.IRamDb)
  private readonly ramDb: IRamDb;

  start(socket: Socket) {
    socket.on(ClientMessageTypes.Disconnect, this.onDisconnect);
    socket.on(ClientMessageTypes.AddMessage, this.onAddMessage);
  }
}
