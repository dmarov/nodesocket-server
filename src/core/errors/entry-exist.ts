import { IdentifiableError } from "./identifiable-error";
import { RamDbErrorCodes } from "./codes";

export class EntryExistError extends IdentifiableError {
  constructor() {
    super("DB entry already exists");
    this.name = "EntryExistError";
  }

  getId(): number {
    return RamDbErrorCodes.EntryExist;
  }
}
