import { inject, injectable } from "inversify";
import { Socket } from "socket.io";
import { TYPES } from "@/di/types";
import { SocketHandler } from "../socket-handler";
import {
  Response,
  ServerMessageTypes,
  ClientMessageTypes
} from "@/models/api";
import {
  MessageHandlerInterface,
  SettingsInterface
} from "@/services";
import { ResponseMessage } from "@/models/contracts";

@injectable()
export class MessageSocketHandler implements SocketHandler {
  private readonly onAddMessage = (payload: unknown): void => {
    const result = this.messageHandler.addMessage(payload);

    const response = result.unwrap<Response>((message) => {
      this.socket.broadcast.emit(
        ServerMessageTypes.AddMessageSuccess,
        message
      );

      return {
        type: ServerMessageTypes.AddMessageSuccess,
        payload: message,
      };
    }, (error) => {
      return {
        type: ServerMessageTypes.AddMessageError,
        payload: error,
      };
    });

    this.socket.emit(response.type, response.payload);
  };

  constructor(
    private readonly socket: Socket,
    @inject(TYPES.MessageHandlerInterface) private readonly messageHandler: MessageHandlerInterface,
    @inject(TYPES.SettingsInterface) private readonly settingsService: SettingsInterface,
  ) {
    const settings = this.settingsService.getSettings();
    const initialMessages = this.messageHandler
      .getMessages()
      .unwrap<ResponseMessage[]>((messages) => {
        return messages;
      }, () => {
        return [];
      });

    const payload = {
      settings,
      initialMessages,
    };

    this.socket.emit(ServerMessageTypes.SetInitialData, payload);

    socket.on(ClientMessageTypes.AddMessage, this.onAddMessage);
  }
}
