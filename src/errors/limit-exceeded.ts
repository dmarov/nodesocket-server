import { IdentifiableError } from "./identifiable-error";
import { ErrorCodes } from "./codes";

export class LimitExceededError extends IdentifiableError {
  constructor() {
    super(ErrorCodes.LimitExceeded, "limit exceeded");
    this.name = "LimitExceededError";
  }
}
