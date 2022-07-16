import { ErrorWithCode } from "../../core/errors/error-with-code";
import { RamDbErrorCodes } from "./codes";

export class EntryExistError extends ErrorWithCode {
  constructor () {
    super("DB entry already exists");
    this.name = "EntryExistError";
  }

  getCode (): number {
    return RamDbErrorCodes.EntryExist;
  }
}
