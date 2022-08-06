import { IdentifiableError } from "@/errors";
import { Result } from "@/models/contracts";

export interface SessionInterface {
  initUserSessions(): Result<void, IdentifiableError>;
  createUserSession(sessionId: string, name: string): Result<string, IdentifiableError>;
  getUserSession(sessionId: string): Result<string, IdentifiableError>;
  destroyUserSession(sessionId: string): Result<void, IdentifiableError>;
}
