import { IdentifiableError } from "@/errors";
import { Result } from "@/models/contracts";
import { ResponseUserIdentity } from "@/models/contracts";

export interface UserIdentityHandlerInterface {
  addIdentity(user: unknown): Result<ResponseUserIdentity, IdentifiableError>;
}
