import { IdentifiableError } from "../../errors/identifiable-error";
import { RequestMessage } from "../../models/contracts/request-message";
import { Result } from "../../models/contracts/result";
import { DbMessage } from "../../models/entities/db-message";

@injectable()
export interface MessagePersistenceInterface {
  addMessage(message: RequestMessage): Result<DbMessage, IdentifiableError>;
  getMessages(): Result<DbMessage[], IdentifiableError>;
  initMessages(): Result<void, IdentifiableError>;
}
