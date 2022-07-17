import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IdentifiableError } from "../../../errors/identifiable-error";
import { Message } from "../../../models/api/message";
import { Result } from "../../../models/contracts/result";
import { DbMessage } from "../../../models/entities/db-message";
import { MessagePersistence } from "../../message-persistence/message-persistence";
import { MessageValidation } from "../../message-validation/message-validation";

@injectable()
export class MessageHandlerService {
  @inject(TYPES.MessagePersistence)
  private readonly messagePersistence: MessagePersistence;

  @inject(TYPES.MessageValidation)
  private readonly messageValidation: MessageValidation;

  addMessage(payload: string): Result<DbMessage, IdentifiableError> {
    return this.messageValidation
      .validateMessage(payload)
      .unwrap<Result<DbMessage, IdentifiableError>>((message) => {
        return this.addValidatedMessage(message);
      }, (error) => {
        return Result.error<DbMessage, IdentifiableError>(error);
      });
  }

  getMessages(): Result<DbMessage[], IdentifiableError> {
    return this.messagePersistence.getMessages();
  }

  private addValidatedMessage(message: Message) {
    return this.messagePersistence.addMessage(message)
      .unwrap((success) => {
        return Result.success<DbMessage, IdentifiableError>(success);
      }, (error) => {
        return Result.error<DbMessage, IdentifiableError>(error);
      });
  }
}
