import Joi from "joi";
import { inject, injectable } from "inversify";
import { Message } from "../shared-models/message";
import { TYPES } from "../../di/types";
import { Response } from "../../models/core/response";
import { ServerMessageTypes } from "../../models/core/server-message-types";
import { MessagePersistenceService } from "./message-persistence-service";

@injectable()
export class MessageHandlerService {
  private messageSchema = Joi.object({
    text: Joi.string()
      .min(3)
      .max(200)
      .required()
  });

  @inject(TYPES.MessagePersistenceService)
  private readonly messagePersistenceService: MessagePersistenceService;

  addMessage(payload: string): Response {
    const obj: unknown = JSON.parse(payload);
    const error = this.messageSchema.validate(obj).error;

    if (error) {
      return {
        type: ServerMessageTypes.AddMessageError,
        payload: JSON.stringify(error),
      };
    }

    const message = obj as Message;
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
