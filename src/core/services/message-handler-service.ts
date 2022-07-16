import { inject, injectable } from "inversify";
import { Message } from "../shared-models/message";
import { TYPES } from "../../di/types";
import { MessagePersistenceService } from "./message-persistence-service";
import { MessageValidationService } from "./message-validation-service";
import { Result } from "../../models/core/result";
import Joi from "joi";

@injectable()
export class MessageHandlerService {
  @inject(TYPES.MessagePersistenceService)
  private readonly messagePersistenceService: MessagePersistenceService;

  @inject(TYPES.MessageValidationService)
  private readonly messageValidationService: MessageValidationService;

  addMessage(payload: string): Result<Message[], Joi.ValidationError | Error> {
    const result = this.messageValidationService.validateMessage(payload);

    return result.unwrap<Result<Message[], Joi.ValidationError | Error>>((message) => {
      return this.messagePersistenceService.addMessage(message)
        .unwrap((success) => {
          return Result.success<Message[], Joi.ValidationError | Error>(success);
        }, (error) => {
          return Result.error<Message[], Joi.ValidationError | Error>(error);
        });
    }, (error) => {
      return Result.error<Message[], Joi.ValidationError | Error>(error);
    });
  }
}
