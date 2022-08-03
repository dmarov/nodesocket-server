import { IdentifiableError } from "@/errors";
import { RequestUserIdentity, Result } from "@/models/contracts";
import { DbUserIdentity } from "@/models/entities";

export interface UserIdentityPersistenceInterface {
  createIdentity(identity: RequestUserIdentity): Result<DbUserIdentity, IdentifiableError>;
  destroyIdentity(id: string): Result<DbUserIdentity, IdentifiableError>;
  getIdentities(): Result<{[key: string]: DbUserIdentity}, IdentifiableError>;
  getIdentity(id: string): Result<DbUserIdentity, IdentifiableError>;
  initIdentities(): Result<void, IdentifiableError>;
}
