import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IdentifiableError } from "@/errors";
import { ApiMessage } from "@/models/api";
import { RequestMessage, ResponseMessage, Result } from "@/models/contracts";
import {
  MessagePersistenceInterface,
  MessageValidationInterface,
  MessageHandlerInterface
} from "@/services";

@injectable()
export class MessageHandlerService implements MessageHandlerInterface {
  @inject(TYPES.MessagePersistenceInterface)
  private readonly messagePersistence!: MessagePersistenceInterface;

  @inject(TYPES.MessageValidationInterface)
  private readonly messageValidation!: MessageValidationInterface;

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
