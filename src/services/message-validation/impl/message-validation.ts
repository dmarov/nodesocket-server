import Joi from "joi";
import { injectable } from "inversify";
import { Result } from "@/models/contracts";
import { ApiMessage } from "@/models/api";
import { ValidationError } from "@/errors";
import { MessageValidationInterface } from "../message-validation";

@injectable()
export class MessageValidationService implements MessageValidationInterface {

  constructor(
    private readonly minLength: number,
    private readonly maxLength: number,
  ) { }

  private messageSchema = Joi.object({
    text: Joi.string()
      .min(this.minLength)
      .max(this.maxLength)
      .required()
  });

  validateMessage(message: unknown): Result<ApiMessage, ValidationError> {
    const error = this.messageSchema.validate(message).error;

    if (error) {
      return Result.error(new ValidationError(error));
    } else {
      return Result.success(message as ApiMessage);
    }
  }
}
