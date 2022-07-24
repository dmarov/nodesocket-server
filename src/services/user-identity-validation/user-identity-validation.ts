import { IdentifiableError } from "@/errors";
import { ApiUserIdentity } from "@/models/api";
import { Result } from "@/models/contracts";

export interface UserIdentityValidationInterface {
  validateIdentity(identity: unknown): Result<ApiUserIdentity, IdentifiableError>;
}
