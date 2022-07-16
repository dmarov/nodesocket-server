import { inject, injectable } from "inversify";
import { Socket } from "socket.io";
import { TYPES } from "../di.config";
import { RamDb } from "./db/ram-db";
import { ClientMessageTypes } from "./shared-models/client-message-types";

@injectable()
export class SocketHandler {
  private readonly onDisconnect = () => {
    console.log("client disconnected");
  };

  private readonly onAddMessage = (payload: string) => {
    console.log(payload);
    this.ramDb.add("messages", []);
  };

  @inject(TYPES.RamDb) private readonly ramDb: RamDb;

  start(socket: Socket) {
    socket.on(ClientMessageTypes.Disconnect, this.onDisconnect);
    socket.on(ClientMessageTypes.AddMessage, this.onAddMessage);
  }
}
