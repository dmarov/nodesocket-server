import Joi from "joi";
import { ServerMessageTypes } from "../shared-models/server-message-types";
import { inject, injectable } from "inversify";
import { PlainDb } from "../plain-db/plain-db";
import { Message } from "../shared-models/message";
import { TYPES } from "../../di/types";

@injectable()
export class MessageHandlerService {
  private messageSchema = Joi.object({
    text: Joi.string()
      .min(3)
      .max(200)
      .required()
  });

  @inject(TYPES.PlainDb)
  private readonly plainDb: PlainDb;

  addMessage(payload: string): {type: ServerMessageTypes, payload: unknown} {
    const obj: unknown = JSON.parse(payload);
    const error = this.messageSchema.validate(obj).error;
    if (error) {
      return {
        type: ServerMessageTypes.AddMessageError,
        payload: JSON.stringify(error),
      };
    }

    const message = obj as Message;

    const messages = this.plainDb.get<Message[]>("messages");

    messages.push(message);
    const addedMessage = this.plainDb.update("messages", messages);

    return {
      type: ServerMessageTypes.AddMessageSuccess,
      payload: JSON.stringify(addedMessage),
    };
  }
}
