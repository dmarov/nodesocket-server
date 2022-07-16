import { inject, injectable } from "inversify";
import { PlainDb } from "../plain-db/plain-db";
import { Message } from "../shared-models/message";
import { TYPES } from "../../di/types";
import { Result } from "../../models/core/result";
import { IdentifiableError } from "../errors/identifiable-error";
import { DbMessage } from "../entities/db-message";

@injectable()
export class MessagePersistenceService {
  private dbKey = "messages";

  @inject(TYPES.PlainDb)
  private readonly plainDb: PlainDb;

  addMessage(message: Message): Result<DbMessage, IdentifiableError> {
    return this.plainDb.get<DbMessage[]>(this.dbKey)
      .unwrap(messages => {

        const maxId = messages.reduce((prev, cur) => Math.max(prev, cur.id), -1)

        const newMessage: DbMessage = {
          id: maxId + 1,
          text: message.text,
        };

        messages.push(newMessage);

        return this.updateMesages(messages).unwrap((success) => {
          return Result<DbMessage, IdentifiableError>.success(newMessage);
        }, (error) => {
          return Result<DbMessage, IdentifiableError>.error(error);
        });
      }, (error) => {
        return Result.error<DbMessage, IdentifiableError>(error);
      });
  }

  private updateMesages(messages: DbMessage[]): Result<DbMessage[], IdentifiableError> {
    return this.plainDb.update(this.dbKey, messages)
      .unwrap((success) => {
        return Result.success<DbMessage[], IdentifiableError>(success);
      }, (error) => {
        return Result.error<DbMessage[], IdentifiableError>(error);
      });
  }
}
