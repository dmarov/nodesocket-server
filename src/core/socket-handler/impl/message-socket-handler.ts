import { inject, injectable } from "inversify";
import { Socket } from "socket.io";
import { TYPES } from "../../../di/types";
import { PlainDb } from "../../plain-db/plain-db";
import { ClientMessageTypes } from "../../shared-models/client-message-types";
import { SocketHandler } from "../socket-handler";
import Ajv, { JSONSchemaType } from "ajv";
import { Message } from "../../shared-models/message";
import { ServerMessageTypes } from "../../shared-models/server-message-types";
const ajv = new Ajv();

@injectable()
export class MessageSocketHandler implements SocketHandler {
  private socket: Socket;

  private messageSchema: JSONSchemaType<Message> = {
    type: "object",
    properties: {
      text: { type: "string" }
    },
    required: ["text"],
    additionalProperties: false
  };

  private validateMessage = ajv.compile(this.messageSchema);

  private readonly onDisconnect = () => {
    console.log("client disconnected");
  };

  private readonly onAddMessage = (payload: string) => {
    const obj: unknown = JSON.parse(payload);

    if (!this.validateMessage(obj)) {
      this.socket.emit(ServerMessageTypes.AddMessageError, "invalid request");
      return;
    }

    const message: Message = obj;

    const messages = this.plainDb.get<Message[]>("messages");

    messages.push(message);
    const addedMessage = this.plainDb.update("messages", messages);

    this.socket.emit(ServerMessageTypes.AddMessageSuccess, JSON.stringify(addedMessage));
  };

  @inject(TYPES.PlainDb)
  private readonly plainDb: PlainDb;

  start(socket: Socket) {
    this.socket = socket;
    socket.on(ClientMessageTypes.Disconnect, this.onDisconnect);
    socket.on(ClientMessageTypes.AddMessage, this.onAddMessage);
  }
}
