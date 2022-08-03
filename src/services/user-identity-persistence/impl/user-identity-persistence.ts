import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IdentifiableError, LimitExceededError, NoEntryExistError } from "@/errors";
import { RequestUserIdentity, Result } from "@/models/contracts";
import { DbUserIdentity } from "@/models/entities";
import { PlainDb } from "@/services";
import { UserIdentityPersistenceInterface } from "../user-identity-persistence";
import { v4 as uuidv4 } from "uuid";
import { DbKeys } from "@/models/entities";

@injectable()
export class UserIdentityPersistenceService implements UserIdentityPersistenceInterface {

  private readonly dbKey = DbKeys.UserIdentities;

  constructor(
    @inject(TYPES.PlainDb) private readonly plainDb: PlainDb,
    @inject(TYPES.UsersLimit) private readonly usersLimit: number,
  ) { }

  initIdentities(): Result<void, IdentifiableError> {
    return this.plainDb.add(this.dbKey, {})
      .mapSuccess(() => {});
  }

  createIdentity(identity: RequestUserIdentity): Result<DbUserIdentity, IdentifiableError> {
    return this.getIdentities()
      .mapSuccess(ids => Object.values(ids))
      .unwrap(identities => {
        if (identities.length >= this.usersLimit) {
          return Result.error(new LimitExceededError());
        } else {
          return this.appendIdentity(identities, identity);
        }
      }, error => {
        return Result.error(error);
      });
  }

  getIdentities(): Result<{[key: string]: DbUserIdentity}, IdentifiableError> {
    return this.plainDb.get<{[key: string]: DbUserIdentity}>(this.dbKey)
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

  getIdentity(id: string): Result<DbUserIdentity, IdentifiableError> {
    return this.getIdentities()
      .mergeError<DbUserIdentity>(ids => {
        if (ids[id]) {
          return Result.success(ids[id]);
        } else {
          return Result.error(new NoEntryExistError());
        }
      });
  }

  destroyIdentity(id: string): Result<DbUserIdentity, IdentifiableError> {
    return this.getIdentities()
      .mergeError<DbUserIdentity>(ids => {
        if (ids[id]) {
          const result = ids[id];
          delete ids[id];
          return Result.success(result);
        } else {
          return Result.error(new NoEntryExistError());
        }
      });
  }
}
