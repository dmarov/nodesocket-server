import { inject, injectable } from "inversify";
import { Socket } from "socket.io";
import { TYPES } from "../../../di/types";
import { SocketHandler } from "../socket-handler";
import { Response } from "../../../models/api/response";
import { ServerMessageTypes } from "../../../models/api/server-message-types";
import { MessageHandler } from "../../../services/message-handler/message-handler";
import { ClientMessageTypes } from "../../../models/api/client-message-types";

@injectable()
export class MessageSocketHandler implements SocketHandler {
  private socket: Socket;

  private readonly onAddMessage = (payload: string): void => {
    const result = this.messageHandler.addMessage(payload);

    const response = result.unwrap<Response>((success) => {
      return {
        type: ServerMessageTypes.AddMessageSuccess,
        payload: JSON.stringify(success),
      };
    }, (error) => {
      return {
        type: ServerMessageTypes.AddMessageError,
        payload: JSON.stringify(error),
      };
    });

    this.socket.emit(response.type, response.payload);

    this.messageHandler.getMessages().mapSuccess<null>((messages) => {
      this.socket.broadcast.emit(ServerMessageTypes.UpdateAllMessages, JSON.stringify(messages));
      return null;
    });
  };

  @inject(TYPES.MessageHandler)
  private readonly messageHandler: MessageHandler;

  start(socket: Socket) {
    this.socket = socket;

    this.messageHandler.getMessages().mapSuccess((messages) => {
      this.socket.emit(ServerMessageTypes.UpdateAllMessages, JSON.stringify(messages));
      return null;
    });

    socket.on(ClientMessageTypes.AddMessage, this.onAddMessage);
  }
}
