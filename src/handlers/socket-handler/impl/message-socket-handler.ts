import { inject, injectable } from "inversify";
import { Socket } from "socket.io";
import { TYPES } from "../../../di/types";
import { SocketHandler } from "../socket-handler";
import { Response } from "../../../models/api/response";
import { ServerMessageTypes } from "../../../models/api/server-message-types";
import { MessageHandlerInterface } from "../../../services/message-handler/message-handler";
import { ClientMessageTypes } from "../../../models/api/client-message-types";

@injectable()
export class MessageSocketHandler implements SocketHandler {
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

    this.messageHandler
      .getMessages()
      .mapSuccess<void>((messages) => {
        this.socket.broadcast.emit(
          ServerMessageTypes.UpdateAllMessages,
          JSON.stringify(messages)
        );
      });
  };

  constructor(
    private readonly socket: Socket,
    @inject(TYPES.MessageHandlerInterface) private readonly messageHandler: MessageHandlerInterface,
  ) {
    this.messageHandler.getMessages().mapSuccess((messages) => {
      this.socket.emit(ServerMessageTypes.UpdateAllMessages, JSON.stringify(messages));
    });

    socket.on(ClientMessageTypes.AddMessage, this.onAddMessage);
  }
}
