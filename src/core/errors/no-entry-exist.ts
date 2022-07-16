import { IdentifiableError } from "./identifiable-error";
import { RamDbErrorCodes } from "./codes";

export class NoEntryExistError extends IdentifiableError {
  constructor() {
    super("no DB entry already exists");
    this.name = "NoEntryExistError";
  }

  getId(): number {
    return RamDbErrorCodes.NoEntryExist;
  }
}
