import Joi from "joi";
import { injectable } from "inversify";
import { Result } from "../../models/core/result";
import { Message } from "../shared-models/message";

@injectable()
export class MessageValidationService {
  private messageSchema = Joi.object({
    text: Joi.string()
      .min(3)
      .max(200)
      .required()
  });

  validateMessage(payload: string): Result<Message, Joi.ValidationError> {
    const obj: unknown = JSON.parse(payload);
    const error = this.messageSchema.validate(obj).error;

    if (error) {
      return Result.error<Message, Joi.ValidationError>(error);
    } else {
      return Result.success<Message, Joi.ValidationError>(obj as Message);
    }
  }
}
