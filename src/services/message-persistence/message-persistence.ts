import { IdentifiableError } from "@/errors";
import { RequestMessage, Result } from "@/models/contracts";
import { DbMessage } from "@/models/entities";

export interface MessagePersistenceInterface {
  addMessage(message: RequestMessage): Result<DbMessage, IdentifiableError>;
  getMessages(): Result<DbMessage[], IdentifiableError>;
  initMessages(): Result<void, IdentifiableError>;
}
