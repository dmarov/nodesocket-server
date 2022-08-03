import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IdentifiableError } from "@/errors";
import { Result, RequestMessage } from "@/models/contracts";
import { DbMessage } from "@/models/entities";
import { PlainDb } from "@/services";
import { MessagePersistenceInterface } from "../message-persistence";
import { DbKeys } from "@/models/entities/db-keys";

@injectable()
export class MessagePersistenceService implements MessagePersistenceInterface {

  private readonly dbKey = DbKeys.Messages;

  constructor(
    @inject(TYPES.PlainDb) private readonly plainDb: PlainDb,
    @inject(TYPES.BufferSize) private readonly bufferSize: number,
  ) { }

  addMessage(message: RequestMessage): Result<DbMessage, IdentifiableError> {
    return this.getMessages()
      .unwrap((messages) => {
        return this.appendMessage(messages, message);
      }, (error) => {
        return Result.error(error);
      });
  }

  getMessages(): Result<DbMessage[], IdentifiableError> {
    return this.plainDb.get<DbMessage[]>(this.dbKey);
  }

  initMessages(): Result<void, IdentifiableError> {
    return this.plainDb
      .add(this.dbKey, [])
      .mapSuccess(() => {});
  }

  private appendMessage(
    messages: DbMessage[],
    message: RequestMessage,
  ): Result<DbMessage, IdentifiableError> {
    const maxId = messages.reduce(
      (prev: number, cur: DbMessage) => Math.max(prev, cur.id), -1
    );

    const newMessage: DbMessage = {
      id: maxId + 1,
      text: message.text,
      utcTime: Date.now(),
    };

    messages.push(newMessage);
    messages = messages.slice(-1 * this.bufferSize);

    return this.plainDb.update(this.dbKey, messages)
      .mapSuccess(() => {
        return newMessage;
      });
  }
}
