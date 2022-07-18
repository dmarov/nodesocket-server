import { inject, injectable } from "inversify";
import { Socket } from "socket.io";
import { TYPES } from "@/di/types";
import { SocketHandler } from "../socket-handler";
import { Response } from "@/models/api/response";
import { ServerMessageTypes } from "@/models/api/server-message-types";
import { MessageHandlerInterface } from "@/services/message-handler/message-handler";
import { ClientMessageTypes } from "@/models/api/client-message-types";
import { SettingsInterface } from "@/services/settings/settings";
import { ResponseMessage } from "@/models/contracts/response-message";

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
