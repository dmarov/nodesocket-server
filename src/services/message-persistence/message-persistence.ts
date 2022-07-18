import { IdentifiableError } from "../../errors/identifiable-error";
import { Message } from "../../models/api/message";
import { Result } from "../../models/contracts/result";
import { DbMessage } from "../../models/entities/db-message";

@injectable()
export interface MessagePersistenceInterface {
  addMessage(message: Message): Result<DbMessage, IdentifiableError>;
  getMessages(): Result<DbMessage[], IdentifiableError>;
}
