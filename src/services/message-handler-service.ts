import { inject, injectable } from "inversify";
import { IdentifiableError } from "../core/errors/identifiable-error";
import { TYPES } from "../di/types";
import { Message } from "../models/api/message";
import { Result } from "../models/contracts/result";
import { DbMessage } from "../models/entities/db-message";
import { MessagePersistenceService } from "./message-persistence-service";
import { MessageValidationService } from "./message-validation-service";

@injectable()
export class MessageHandlerService {
  @inject(TYPES.MessagePersistenceService)
  private readonly messagePersistenceService: MessagePersistenceService;

  @inject(TYPES.MessageValidationService)
  private readonly messageValidationService: MessageValidationService;

  addMessage(payload: string): Result<DbMessage, IdentifiableError> {
    return this.messageValidationService
      .validateMessage(payload)
      .unwrap<Result<DbMessage, IdentifiableError>>((message) => {
        return this.addValidatedMessage(message);
      }, (error) => {
        return Result.error<DbMessage, IdentifiableError>(error);
      });
  }

  getMessages(): Result<DbMessage[], IdentifiableError> {
    return this.messagePersistenceService.getMessages();
  }

  private addValidatedMessage(message: Message) {
    return this.messagePersistenceService.addMessage(message)
      .unwrap((success) => {
        return Result.success<DbMessage, IdentifiableError>(success);
      }, (error) => {
        return Result.error<DbMessage, IdentifiableError>(error);
      });
  }
}