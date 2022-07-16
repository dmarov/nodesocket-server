import { inject, injectable } from "inversify";
import { PlainDb } from "../plain-db/plain-db";
import { Message } from "../shared-models/message";
import { TYPES } from "../../di/types";
import { Result } from "../../models/core/result";
import { IdentifiableError } from "../errors/identifiable-error";

@injectable()
export class MessagePersistenceService {
  private dbKey = "messages";

  @inject(TYPES.PlainDb)
  private readonly plainDb: PlainDb;

  addMessage(message: Message): Result<Message[], IdentifiableError> {
    return this.plainDb.get<Message[]>(this.dbKey)
      .unwrap(messages => {
        messages.push(message);
        return this.updateMesages(messages);
      }, (error) => {
        return Result.error<Message[], IdentifiableError>(error);
      });
  }

  private updateMesages(messages: Message[]): Result<Message[], IdentifiableError> {
    return this.plainDb.update(this.dbKey, messages)
      .unwrap((success) => {
        return Result.success<Message[], IdentifiableError>(success);
      }, (error) => {
        return Result.error<Message[], IdentifiableError>(error);
      });
  }
}
