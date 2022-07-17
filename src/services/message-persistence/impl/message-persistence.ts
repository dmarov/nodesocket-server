import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IdentifiableError } from "../../../errors/identifiable-error";
import { Message } from "../../../models/api/message";
import { Result } from "../../../models/contracts/result";
import { DbMessage } from "../../../models/entities/db-message";
import { PlainDb } from "../../plain-db/plain-db";

@injectable()
export class MessagePersistenceService {
  private dbKey = "messages";

  @inject(TYPES.PlainDb)
  private readonly plainDb: PlainDb;

  addMessage(message: Message): Result<DbMessage, IdentifiableError> {
    return this.plainDb.get<DbMessage[]>(this.dbKey)
      .unwrap((messages) => {
        const maxId = messages.reduce((prev: number, cur: DbMessage) => Math.max(prev, cur.id), -1);

        const newMessage: DbMessage = {
          id: maxId + 1,
          text: message.text,
          utcTime: Date.now(),
        };

        messages.push(newMessage);

        return this.updateMesages(messages).unwrap(() => {
          return Result.success(newMessage);
        }, (error) => {
          return Result.error(error);
        });
      }, (error) => {
        return Result.error(error);
      });
  }

  getMessages(): Result<DbMessage[], IdentifiableError> {
    return this.plainDb.get<DbMessage[]>(this.dbKey)
      .mapSuccess((messages) => {
        return messages.sort((a, b) => a.utcTime - b.utcTime);
      });
  }

  private updateMesages(messages: DbMessage[]): Result<DbMessage[], IdentifiableError> {
    return this.plainDb.update(this.dbKey, messages)
      .unwrap((success) => {
        return Result.success(success);
      }, (error) => {
        return Result.error(error);
      });
  }
}
