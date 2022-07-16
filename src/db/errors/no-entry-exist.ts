import { ErrorWithCode } from "../../core/errors/error-with-code";
import { RamDbErrorCodes } from "./codes";

export class NoEntryExistError extends ErrorWithCode {
  constructor() {
    super("no DB entry already exists");
    this.name = "NoEntryExistError";
  }

  getCode(): number {
    return RamDbErrorCodes.NoEntryExist;
  }
}
