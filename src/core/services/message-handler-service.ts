import { inject, injectable } from "inversify";
import { Message } from "../shared-models/message";
import { TYPES } from "../../di/types";
import { MessagePersistenceService } from "./message-persistence-service";
import { MessageValidationService } from "./message-validation-service";
import { Result } from "../../models/core/result";
import { IdentifiableError } from "../errors/identifiable-error";

@injectable()
export class MessageHandlerService {
  @inject(TYPES.MessagePersistenceService)
  private readonly messagePersistenceService: MessagePersistenceService;

  @inject(TYPES.MessageValidationService)
  private readonly messageValidationService: MessageValidationService;

  addMessage(payload: string): Result<Message[], IdentifiableError> {
    return this.messageValidationService
      .validateMessage(payload)
      .unwrap<Result<Message[], IdentifiableError>>((message) => {
        return this.messagePersistenceService.addMessage(message)
          .unwrap((success) => {
            return Result.success<Message[], IdentifiableError>(success);
          }, (error) => {
            return Result.error<Message[], IdentifiableError>(error);
          });
      }, (error) => {
        return Result.error<Message[], IdentifiableError>(error);
      });
  }
}
