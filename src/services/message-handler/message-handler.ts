import { IdentifiableError } from "../../errors/identifiable-error";
import { Result } from "../../models/contracts/result";
import { DbMessage } from "../../models/entities/db-message";

export interface MessageHandlerInterface {
  addMessage(payload: string): Result<DbMessage, IdentifiableError>;
  getMessages(): Result<DbMessage[], IdentifiableError>;
}
