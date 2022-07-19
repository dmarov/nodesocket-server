import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IdentifiableError } from "@/errors/identifiable-error";
import { ApiMessage } from "@/models/api/api-message";
import { RequestMessage } from "@/models/contracts/request-message";
import { ResponseMessage } from "@/models/contracts/response-message";
import { Result } from "@/models/contracts/result";
import { MessagePersistenceInterface } from "@/services/message-persistence/message-persistence";
import { MessageValidationInterface } from "@/services/message-validation/message-validation";
import { MessageHandlerInterface } from "../message-handler";

@injectable()
export class MessageHandlerService implements MessageHandlerInterface {
  @inject(TYPES.MessagePersistenceInterface)
  private readonly messagePersistence: MessagePersistenceInterface;

  @inject(TYPES.MessageValidationInterface)
  private readonly messageValidation: MessageValidationInterface;

  addMessage(payload: string): Result<ResponseMessage, IdentifiableError> {
    return this.messageValidation
      .validateMessage(payload)
      .unwrap((message: ApiMessage) => {
        return this.addValidatedMessage(message);
      }, (error) => {
        return Result.error<ResponseMessage, IdentifiableError>(error);
      });
  }

  getMessages(): Result<ResponseMessage[], IdentifiableError> {
    return this.messagePersistence
      .getMessages();
  }

  private addValidatedMessage(message: RequestMessage): Result<ResponseMessage, IdentifiableError> {
    return this.messagePersistence.addMessage(message);
  }
}
