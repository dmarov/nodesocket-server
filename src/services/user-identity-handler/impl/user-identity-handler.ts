import { TYPES } from "@/di/types";
import { IdentifiableError } from "@/errors";
import { Result, ResponseUserIdentity } from "@/models/contracts";
import { UserIdentityPersistenceInterface } from "@/services/user-identity-persistence";
import { UserIdentityValidationInterface } from "@/services/user-identity-validation";
import { inject, injectable } from "inversify";
import { UserIdentityHandlerInterface } from "../user-identity-handler";

@injectable()
export class UserIdentityHandlerService implements UserIdentityHandlerInterface {

  constructor(
    @inject(TYPES.UserIdentityValidationInterface) private readonly identityValidation: UserIdentityValidationInterface,
    @inject(TYPES.UserIdentityPersistenceInterface) private readonly identityPersistance: UserIdentityPersistenceInterface,
  ) { }

  addIdentity(identity: unknown): Result<ResponseUserIdentity, IdentifiableError> {
    return this.identityValidation
      .validateIdentity(identity)
      .unwrap(identity => {
        return this.identityPersistance.createIdentity(identity);
      }, error => {
        return Result.error(error);
      });
  }
}
