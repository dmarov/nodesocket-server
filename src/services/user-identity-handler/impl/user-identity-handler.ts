import { IdentifiableError } from "@/errors";
import { Result, ResponseUserIdentity } from "@/models/contracts";
import { injectable } from "inversify";
import { UserIdentityHandlerInterface } from "../user-identity-handler";

@injectable()
export class UserIdentityHandlerService implements UserIdentityHandlerInterface {

  addIdentity(): Result<ResponseUserIdentity, IdentifiableError> {
    throw new Error("Method not implemented.");
  }

  getIdentities(): Result<ResponseUserIdentity[], IdentifiableError> {
    throw new Error("Method not implemented.");
  }
}
