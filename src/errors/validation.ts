import { IdentifiableError } from "./identifiable-error";
import { ErrorCodes } from "./codes";
import { ValidationError as JoiValidationError } from "joi";

export class ValidationError extends IdentifiableError {
  constructor(
    readonly metadata: JoiValidationError,
  ) {
    super(ErrorCodes.Validation, "validation error");
    this.name = "ValidationError";
  }
}
