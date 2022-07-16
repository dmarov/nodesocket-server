import { inject, injectable } from "inversify";
import { Message } from "../shared-models/message";
import { TYPES } from "../../di/types";
import { Response } from "../../models/core/response";
import { ServerMessageTypes } from "../../models/core/server-message-types";
import { MessagePersistenceService } from "./message-persistence-service";
import { MessageValidationService } from "./message-validation-service";

@injectable()
export class MessageHandlerService {
  @inject(TYPES.MessagePersistenceService)
  private readonly messagePersistenceService: MessagePersistenceService;

  @inject(TYPES.MessageValidationService)
  private readonly messageValidationService: MessageValidationService;

  addMessage(payload: string): Response {
    const result = this.messageValidationService.validateMessage(payload);

    return result.unwrap<Response>((message) => {
      return this.addValidatedMessage(message);
    }, (error) => {
      return {
        type: ServerMessageTypes.AddMessageError,
        payload: JSON.stringify(error),
      };
    });
  }

  private addValidatedMessage(message: Message): Response {
    const result = this.messagePersistenceService.addMessage(message);

    return result.unwrap<Response>((success) => {
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
  }
}
