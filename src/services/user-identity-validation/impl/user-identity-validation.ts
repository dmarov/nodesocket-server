import { IdentifiableError } from "@/errors";
import { ApiUserIdentity } from "@/models/api";
import { RequestUserIdentity, Result } from "@/models/contracts";
import { injectable } from "inversify";
import Joi from "joi";
import { UserIdentityValidationInterface } from "../user-identity-validation";

@injectable()
export class UserIdentityValidationService implements UserIdentityValidationInterface {

  private readonly usernameValidation: Joi.ObjectSchema;

  constructor(
    private readonly nameMinLength: number,
    private readonly nameMaxLength: number,
  ) {
    this.usernameValidation = Joi.object({
      name: Joi.string()
        .min(this.nameMinLength)
        .max(this.nameMaxLength)
    });
  }

  validateIdentity(identity: unknown): Result<ApiUserIdentity, IdentifiableError> {
    throw new Error("Method not implemented.");
  }
}
