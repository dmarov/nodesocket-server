import Joi from "joi";
import { injectable } from "inversify";
import { ValidationError } from "../core/errors/validation";
import { Result } from "../models/contracts/result";
import { Message } from "../models/api/message";

@injectable()
export class MessageValidationService {
  private messageSchema = Joi.object({
    text: Joi.string()
      .min(3)
      .max(200)
      .required()
  });

  validateMessage(payload: string): Result<Message, ValidationError> {
    const obj: unknown = JSON.parse(payload);
    const error = this.messageSchema.validate(obj).error;

    if (error) {
      return Result.error<Message, ValidationError>(new ValidationError(error));
    } else {
      return Result.success<Message, ValidationError>(obj as Message);
    }
  }
}
