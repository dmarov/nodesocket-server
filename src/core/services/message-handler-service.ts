import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { MessagePersistenceService } from "./message-persistence-service";
import { MessageValidationService } from "./message-validation-service";
import { Result } from "../../models/core/result";
import { IdentifiableError } from "../errors/identifiable-error";
import { DbMessage } from "../entities/db-message";

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
        return this.messagePersistenceService.addMessage(message)
          .unwrap((success) => {
            return Result.success<DbMessage, IdentifiableError>(success);
          }, (error) => {
            return Result.error<DbMessage, IdentifiableError>(error);
          });
      }, (error) => {
        return Result.error<DbMessage, IdentifiableError>(error);
      });
  }
}
