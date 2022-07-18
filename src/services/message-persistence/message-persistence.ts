import { IdentifiableError } from "../../errors/identifiable-error";
import { ApiMessage } from "../../models/api/api-message";
import { Result } from "../../models/contracts/result";
import { DbMessage } from "../../models/entities/db-message";

@injectable()
export interface MessagePersistenceInterface {
  addMessage(message: ApiMessage): Result<DbMessage, IdentifiableError>;
  getMessages(): Result<DbMessage[], IdentifiableError>;
  initMessages(): Result<{}, IdentifiableError>;
}
