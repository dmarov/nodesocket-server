import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IdentifiableError } from "../../../errors/identifiable-error";
import { Message } from "../../../models/api/message";
import { Result } from "../../../models/contracts/result";
import { DbMessage } from "../../../models/entities/db-message";
import { MessagePersistenceInterface } from "../../message-persistence/message-persistence";
import { MessageValidationInterface } from "../../message-validation/message-validation";
import { MessageHandlerInterface } from "../message-handler";

@injectable()
export class MessageHandlerService implements MessageHandlerInterface {
  @inject(TYPES.MessagePersistenceInterface)
  private readonly messagePersistence: MessagePersistenceInterface;

  @inject(TYPES.MessageValidationInterface)
  private readonly messageValidation: MessageValidationInterface;

  addMessage(payload: string): Result<DbMessage, IdentifiableError> {
    return this.messageValidation
      .validateMessage(payload)
      .unwrap((message) => {
        return this.addValidatedMessage(message);
      }, (error) => {
        return Result.error<DbMessage, IdentifiableError>(error);
      });
  }

  getMessages(): Result<DbMessage[], IdentifiableError> {
    return this.messagePersistence.getMessages();
  }

  private addValidatedMessage(message: Message): Result<DbMessage, IdentifiableError> {
    return this.messagePersistence.addMessage(message)
      .unwrap((success) => {
        return Result.success<DbMessage, IdentifiableError>(success);
      }, (error) => {
        return Result.error<DbMessage, IdentifiableError>(error);
      });
  }
}
