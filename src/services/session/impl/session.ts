import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IdentifiableError, NoEntryExistError } from "@/errors";
import { Result, SessionsMap } from "@/models/contracts";
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
    return this.plainDb.get<SessionsMap>(this.dbKey)
      .mergeError((sessions => {
        return sessions[sessionId] ?
          Result.success(sessions[sessionId]) :
          Result.error(new NoEntryExistError());
      }));
  }

  createUserSession(sessionId: string, name: string): Result<string, IdentifiableError> {
    return this.userIdentityPersistence
      .createIdentity({ name })
      .mergeError(identity => {
        return this.appendUserSession(sessionId, identity.id)
          .mapSuccess(() => identity.id);
      });
  }

  destroyUserSession(sessionId: string): Result<void, IdentifiableError> {
    return this.plainDb.get<SessionsMap>(this.dbKey)
      .mapSuccess(sessions => {
        delete sessions[sessionId];
      });
  }

  private appendUserSession(sessionId: string, userId: string): Result<void, IdentifiableError> {
    return this.plainDb.get<SessionsMap>(this.dbKey)
      .mergeError(sessions => {
        sessions[sessionId] = userId;

        return this.plainDb.update(this.dbKey, sessions)
          .mapSuccess(() => {});
      });
  }
}
