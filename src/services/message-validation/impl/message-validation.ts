import Joi from "joi";
import { injectable } from "inversify";
import { Result } from "@/models/contracts";
import { ApiMessage } from "@/models/api";
import { ValidationError } from "@/errors";
import { MessageValidationInterface } from "../message-validation";

@injectable()
export class MessageValidationService implements MessageValidationInterface {
  private messageSchema = Joi.object({
    text: Joi.string()
      .min(3)
      .max(200)
      .required()
  });

  validateMessage(payload: string): Result<ApiMessage, ValidationError> {
    const obj: unknown = JSON.parse(payload);
    const error = this.messageSchema.validate(obj).error;

    if (error) {
      return Result.error(new ValidationError(error));
    } else {
      return Result.success(obj as ApiMessage);
    }
  }
}
