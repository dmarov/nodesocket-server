import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IdentifiableError } from "@/errors";
import { ApiMessage } from "@/models/api";
import { ResponseMessage, Result } from "@/models/contracts";
import {
  MessagePersistenceInterface,
  MessageValidationInterface,
  MessageHandlerInterface
} from "@/services";

@injectable()
export class MessageHandlerService implements MessageHandlerInterface {

  constructor(
    @inject(TYPES.MessagePersistenceInterface) private readonly messagePersistence: MessagePersistenceInterface,
    @inject(TYPES.MessageValidationInterface) private readonly messageValidation: MessageValidationInterface,
  ) { }

  addMessage(message: unknown): Result<ResponseMessage, IdentifiableError> {
    return this.messageValidation
      .validateMessage(message)
      .unwrap((message: ApiMessage) => {
        return this.messagePersistence.addMessage(message);
      }, (error) => {
        return Result.error<ResponseMessage, IdentifiableError>(error);
      });
  }

  getMessages(): Result<ResponseMessage[], IdentifiableError> {
    return this.messagePersistence
      .getMessages();
  }
}
