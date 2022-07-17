import { IdentifiableError } from "./identifiable-error";
import { ErrorCodes } from "./codes";

export class EntryExistError extends IdentifiableError {
  constructor() {
    super("DB entry already exists");
    this.name = "EntryExistError";
  }

  getId(): number {
    return ErrorCodes.EntryExist;
  }
}
