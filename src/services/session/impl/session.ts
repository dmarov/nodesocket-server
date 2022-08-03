import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IdentifiableError } from "@/errors";
import { Result, ResponseUserIdentity } from "@/models/contracts";
import { PlainDb, UserIdentityPersistenceInterface } from "@/services";
import { DbKeys } from "@/models/entities/db-keys";
import { SessionInterface } from "../session";

@injectable()
export class SessionService implements SessionInterface {

  private readonly dbKey = DbKeys.Sessions;

  constructor(
    @inject(TYPES.PlainDb) private readonly plainDb: PlainDb,
    @inject(TYPES.UserIdentityPersistenceInterface) private readonly userIdentityPersistence: UserIdentityPersistenceInterface,
  ) { }

  initUserSessions(): Result<void, IdentifiableError> {
    return this.plainDb.add(this.dbKey, {})
      .mapSuccess(() => {});
  }

  getUserSession(sessionId: string): Result<string, IdentifiableError> {
    return this.plainDb.get<{[key: string]: string}>(this.dbKey)
      .mapSuccess(sessions => {
        return sessions[sessionId];
      });
  }

  createUserSession(sessionId: string): Result<string, IdentifiableError> {
    return this.userIdentityPersistence
      .createIdentity({name: "User 123"})
      .mapSuccess(identity => {
        this.plainDb.add(sessionId, identity.id);
        return identity.id;
      });
  }

  destroyUserSession(sessionId: string): Result<void, IdentifiableError> {
    return this.plainDb.get<{[key: string]: string}>(this.dbKey)
      .mapSuccess(sessions => {
        delete sessions[sessionId];
      });
  }
}
