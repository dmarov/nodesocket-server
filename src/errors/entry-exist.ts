import { IdentifiableError } from "./identifiable-error";
import { ErrorCodes } from "./codes";

export class EntryExistError extends IdentifiableError {
  constructor() {
    super(ErrorCodes.EntryExist, "DB entry already exists");
    this.name = "EntryExistError";
  }
}
