import Joi from "joi";
import { inject, injectable } from "inversify";
import { Result } from "@/models/contracts";
import { ApiMessage } from "@/models/api";
import { ValidationError } from "@/errors";
import { MessageValidationInterface } from "../message-validation";
import { TYPES } from "@/di/types";

@injectable()
export class MessageValidationService implements MessageValidationInterface {

  private readonly messageSchema: Joi.ObjectSchema;

  constructor(
    @inject(TYPES.MessageMinLength) private readonly minLength: number,
    @inject(TYPES.MessageMaxLength) private readonly maxLength: number,
  ) {
    this.messageSchema = Joi.object({
      text: Joi.string()
        .min(this.minLength)
        .max(this.maxLength)
        .required()
    });
  }

  validateMessage(message: unknown): Result<ApiMessage, ValidationError> {
    const error = this.messageSchema.validate(message).error;

    if (error) {
      return Result.error(new ValidationError(error));
    } else {
      return Result.success(message as ApiMessage);
    }
  }
}
