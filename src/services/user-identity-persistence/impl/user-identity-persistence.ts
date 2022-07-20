import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IdentifiableError, LimitExceededError } from "@/errors";
import { RequestUserIdentity, Result } from "@/models/contracts";
import { DbUserIdentity } from "@/models/entities";
import { PlainDb } from "@/services";
import { UserIdentityPersistenceInterface } from "../user-identity-persistence";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class UserIdentityPersistenceService implements UserIdentityPersistenceInterface {
  @inject(TYPES.PlainDb)
  private readonly plainDb!: PlainDb;

  private dbKey = "user-identities";

  initIdentities(): Result<void, IdentifiableError> {
    return this.plainDb.add(this.dbKey, [])
      .mapSuccess(() => {});
  }

  createIdentity(identity: RequestUserIdentity): Result<DbUserIdentity, IdentifiableError> {
    return this.getIdentities()
      .unwrap(identities => {
        if (identities.length > 100) {
          return Result.error(new LimitExceededError());
        } else {
          return this.appendIdentity(identities, identity);
        }
      }, error => {
        return Result.error(error);
      });
  }

  getIdentities(): Result<DbUserIdentity[], IdentifiableError> {
    return this.plainDb.get<DbUserIdentity[]>(this.dbKey);
  }

  private appendIdentity(
    identities: DbUserIdentity[],
    identity: RequestUserIdentity,
  ): Result<DbUserIdentity, IdentifiableError> {
    const newIdentity: DbUserIdentity = {
      id: uuidv4(),
      name: identity.name,
    };

    identities.push(newIdentity);

    return this.plainDb.update(this.dbKey, identities)
      .mapSuccess(() => {
        return newIdentity;
      });
  }
}
