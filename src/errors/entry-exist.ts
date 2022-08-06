import { IdentifiableError } from "./identifiable-error";
import { ErrorCodes } from "./codes";

export class EntryExistError extends IdentifiableError {
  constructor() {
    super(ErrorCodes.EntryExist, "entry already exists");
    this.name = "EntryExistError";
  }
}
