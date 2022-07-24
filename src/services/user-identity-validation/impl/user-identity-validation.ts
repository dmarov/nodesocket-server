import { IdentifiableError, ValidationError } from "@/errors";
import { ApiUserIdentity } from "@/models/api";
import { Result } from "@/models/contracts";
import { injectable } from "inversify";
import Joi from "joi";
import { UserIdentityValidationInterface } from "../user-identity-validation";

@injectable()
export class UserIdentityValidationService implements UserIdentityValidationInterface {

  private readonly usernameSchema: Joi.ObjectSchema;

  constructor(
    private readonly nameMinLength: number,
    private readonly nameMaxLength: number,
  ) {
    this.usernameSchema = Joi.object({
      name: Joi.string()
        .min(this.nameMinLength)
        .max(this.nameMaxLength)
    });
  }

  validateIdentity(identity: unknown): Result<ApiUserIdentity, IdentifiableError> {
    const error = this.usernameSchema.validate(identity).error;

    if (error) {
      return Result.error(new ValidationError(error));
    } else {
      return Result.success(identity as ApiUserIdentity);
    }
  }
}
