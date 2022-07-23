import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IdentifiableError } from "@/errors";
import { Result, RequestMessage } from "@/models/contracts";
import { DbMessage } from "@/models/entities";
import { args } from "@/utils";
import { PlainDb } from "@/services";
import { MessagePersistenceInterface } from "../message-persistence";
import { DbKeys } from "@/models/entities/db-keys";

@injectable()
export class MessagePersistenceService implements MessagePersistenceInterface {

  constructor(
    @inject(TYPES.PlainDb) private readonly plainDb: PlainDb,
  ) { }

  private dbKey = DbKeys.Messages;

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
    messages = messages.slice(-1 * args.bufferSize);

    return this.plainDb.update(this.dbKey, messages)
      .mapSuccess(() => {
        return newMessage;
      });
  }
}
