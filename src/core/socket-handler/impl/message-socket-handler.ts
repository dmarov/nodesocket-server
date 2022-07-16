import { inject, injectable } from "inversify";
import { Socket } from "socket.io";
import { TYPES } from "../../../di/types";
import { SocketHandler } from "../socket-handler";
import { MessageHandlerService } from "../../services/message-handler-service";
import { ClientMessageTypes } from "../../../models/core/client-message-types";
import { ServerMessageTypes } from "../../../models/core/server-message-types";
import { Response } from "../../../models/core/response";

@injectable()
export class MessageSocketHandler implements SocketHandler {
  private socket: Socket;

  private readonly onDisconnect = () => {
    console.log("client disconnected");
  };

  private readonly onAddMessage = (payload: string): void => {
    const result = this.messageHandlerService.addMessage(payload);

    const response = result.unwrap<Response>((success) => {
      return {
        type: ServerMessageTypes.AddMessageSuccess,
        payload: JSON.stringify(success),
      }
    }, (error) => {
      return {
        type: ServerMessageTypes.AddMessageError,
        payload: JSON.stringify(error),
      }
    });

    this.socket.emit(response.type, response.payload);
  };

  @inject(TYPES.MessageHandlerService)
  private readonly messageHandlerService: MessageHandlerService;

  start(socket: Socket) {
    this.socket = socket;
    socket.on(ClientMessageTypes.Disconnect, this.onDisconnect);
    socket.on(ClientMessageTypes.AddMessage, this.onAddMessage);
  }
}
