import { inject, injectable } from "inversify";
import { PlainDb } from "../plain-db/plain-db";
import { Message } from "../shared-models/message";
import { TYPES } from "../../di/types";
import { Result } from "../../models/core/result";

@injectable()
export class MessagePersistenceService {
  private dbKey = "messages";

  @inject(TYPES.PlainDb)
  private readonly plainDb: PlainDb;

  addMessage(message: Message): Result<Message, Error> {
    const messages = this.plainDb.get<Message[]>(this.dbKey);
    messages.push(message);
    this.plainDb.update(this.dbKey, messages);

    return Result.success<Message, Error>(message);
  }
}
