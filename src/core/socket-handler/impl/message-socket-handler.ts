import { inject, injectable } from "inversify";
import { Socket } from "socket.io";
import { TYPES } from "../../../di/types";
import { PlainDb } from "../../plain-db/plain-db";
import { ClientMessageTypes } from "../../shared-models/client-message-types";
import { SocketHandler } from "../socket-handler";

@injectable()
export class MessageSocketHandler implements SocketHandler {
  private readonly onDisconnect = () => {
    console.log("client disconnected");
  };

  private readonly onAddMessage = () => {
    console.log("ADD REQUEST");
    this.plainDb.get("messages");
  };

  @inject(TYPES.PlainDb)
  private readonly plainDb: PlainDb;

  start(socket: Socket) {
    socket.on(ClientMessageTypes.Disconnect, this.onDisconnect);
    socket.on(ClientMessageTypes.AddMessage, this.onAddMessage);
  }
}
