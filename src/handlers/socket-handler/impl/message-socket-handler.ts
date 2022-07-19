import { inject, injectable } from "inversify";
import { Socket } from "socket.io";
import { TYPES } from "@/di";
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
  private readonly onAddMessage = (payload: string): void => {
    const result = this.messageHandler.addMessage(payload);

    const response = result.unwrap<Response>((message) => {
      this.socket.broadcast.emit(
        ServerMessageTypes.AddMessageSuccess,
        JSON.stringify(message)
      );

      return {
        type: ServerMessageTypes.AddMessageSuccess,
        payload: JSON.stringify(message),
      };
    }, (error) => {
      return {
        type: ServerMessageTypes.AddMessageError,
        payload: JSON.stringify(error),
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

    this.socket.emit(ServerMessageTypes.SetInitialData, JSON.stringify(payload));

    socket.on(ClientMessageTypes.AddMessage, this.onAddMessage);
  }
}
