import { IdentifiableError } from "./identifiable-error";
import { ErrorCodes } from "./codes";

export class NoEntryExistError extends IdentifiableError {
  constructor() {
    super(ErrorCodes.NoEntryExist, "no DB entry already exists");
    this.name = "NoEntryExistError";
  }
}
